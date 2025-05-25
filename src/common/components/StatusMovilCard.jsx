import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import Draggable from "react-draggable";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Menu,
  MenuItem,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import CloseIcon from "@mui/icons-material/Close";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import FeedIcon from "@mui/icons-material/Feed";
import ShareIcon from "@mui/icons-material/Share";
import { useTranslation } from "./LocalizationProvider";
import RemoveDialog from "./RemoveDialog";
import PositionValue from "./PositionValue";
import usePositionAttributes from "../attributes/usePositionAttributes";
import { devicesActions } from "../../store";
import { useCatch, useCatchCallback, useEffectAsync } from "../../reactHelper";
import { useAttributePreference } from "../util/preferences";
import dayjs from "dayjs";
import {
  formatNumericHours,
  formatStatus,
  getStatusColor,
} from "../util/formatter";
import { convertToEmbedUrl } from "../util/streetview";

const useStyles = makeStyles((theme) => ({
  card: {
    pointerEvents: "auto",
    // width: theme.dimensions.popupMaxWidth,
  },
  media: {
    height: theme.dimensions.popupImageHeight,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  mediaButton: {
    color: theme.palette.primary.contrastText,
    mixBlendMode: "difference",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(1, 1, 0, 2),
    backgroundColor: "#DAD9DD",
  },
  content: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    maxHeight: theme.dimensions.cardContentMaxHeight,
    overflow: "auto",
  },
  icon: {
    width: "25px",
    height: "25px",
    filter: "brightness(0) invert(1)",
  },
  table: {
    "& .MuiTableCell-sizeSmall": {
      paddingLeft: 0,
      paddingRight: 0,
    },
    "& .MuiTableCell-sizeSmall:first-child": {
      paddingRight: theme.spacing(1),
    },
  },
  cell: {
    borderBottom: "none",
  },
  actions: {
    justifyContent: "space-between",
  },
  root: ({ desktopPadding }) => ({
    pointerEvents: "none",
  }),
}));
const useStyles2 = makeStyles((theme) => ({
  icon: {
    width: "40px",
    height: "40px",
    // filter: "brightness(0) invert(1)",
  },
  batteryText: {
    fontSize: "0.75rem",
    fontWeight: "normal",
    lineHeight: "0.875rem",
  },
  success: {
    color: theme.palette.success.main,
  },
  warning: {
    color: theme.palette.warning.main,
  },
  error: {
    color: theme.palette.error.main,
  },
  neutral: {
    color: theme.palette.neutral.main,
  },
}));
const obtenerDireccion = async (lat, lng) => {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al obtener la dirección");
    }
    const data = await response.json();
    const direccion = data.display_name;
    return direccion;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
const StatusRow = ({ name, content }) => {
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell className={classes.cell}>
        <Typography variant="body2">{name}</Typography>
      </TableCell>
      <TableCell className={classes.cell}>
        <Typography variant="body2" color="textSecondary">
          {content}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

const obtenerInfoEncendido = async (id) => {
  const startDate = dayjs().startOf("day").toISOString();
  const endDate = dayjs().endOf("day").toISOString();

  const armarQuery = `deviceId=${id}&from=${startDate}&to=${endDate}`;
  const response = await fetch(`/api/reports/trips?${armarQuery}`, {
    headers: { Accept: "application/json" },
  });
  console.log(armarQuery);
  if (response.ok) {
    return await response.json();
  } else {
    throw Error(await response.text());
    return [];
  }
};

const obtenerInfoParada = async (id) => {
  const startDate = dayjs().startOf("day").toISOString();
  const endDate = dayjs().endOf("day").toISOString();

  const armarQuery = `deviceId=${id}&from=${startDate}&to=${endDate}`;
  const response = await fetch(`/api/reports/stops?${armarQuery}`, {
    headers: { Accept: "application/json" },
  });
  console.log(armarQuery);
  if (response.ok) {
    return await response.json();
  } else {
    throw Error(await response.text());
    return [];
  }
};

const StatusMovilCard = ({
  deviceId,
  position,
  onClose,
  setOpcionActiva,
  setValorOpcion,
  desktopPadding = 0,
  setModalActivo,
  filteredDevices,
  setOpcionApagarMotorActiva,
}) => {
  const classes = useStyles({ desktopPadding });
  const classes2 = useStyles2();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [direccion, setDireccion] = useState("");
  const [vistaMapa, setVistaMapa] = useState(false);
  const [botonApagar, setBotonApagar] = useState(false);
  const [data, setData] = useState(null);
  const t = useTranslation();

  const obtenerData = async () => {
    const getDataParada = await obtenerInfoParada(deviceId);
    const getDataEncendido = await obtenerInfoEncendido(deviceId);
    const getInfoParada =
      getDataParada.length == 0
        ? "Niguno"
        : formatNumericHours(
            getDataParada[getDataParada.length - 1].duration,
            t
          );
    const getInfoEncendido =
      getDataEncendido.length == 0
        ? "Niguno"
        : formatNumericHours(
            getDataEncendido[getDataEncendido.length - 1].duration,
            t
          );
    setData({
      parada: getInfoParada,
      encendido: getInfoEncendido,
    });
  };

  useEffect(() => {
    if (position !== undefined) {
      obtenerData();
      obtenerDireccion(position.latitude, position.longitude).then((x) => {
        setDireccion(x);
      });
    }
  }, [position]);

  const shareDisabled = useSelector(
    (state) => state.session.server.attributes.disableShare
  );
  const user = useSelector((state) => state.session.user);
  const device = useSelector((state) => state.devices.items[deviceId]);

  const secondaryText = (item) => {
    let status;
    if (item.status === "online" || !item.lastUpdate) {
      status = formatStatus(item.status, t);
    } else {
      status = dayjs(item.lastUpdate).fromNow();
    }
    console.log(item.status);
    return (
      <>
        {item.status === "unknown" ? (
          <span className={classes2}>{status}</span>
        ) : (
          <span className={classes2[getStatusColor(item.status)]}>
            {status}
          </span>
        )}
      </>
    );
  };

  const positionAttributes = usePositionAttributes(t);
  const positionItems = useAttributePreference(
    "positionItems",
    "fixTime,address,speed,totalDistance"
  );

  const navigationAppLink = useAttributePreference("navigationAppLink");
  const navigationAppTitle = useAttributePreference("navigationAppTitle");

  const [anchorEl, setAnchorEl] = useState(null);

  const [removing, setRemoving] = useState(false);

  const item = filteredDevices.find((item) => item.id === deviceId);

  const handleRemove = useCatch(async (removed) => {
    if (removed) {
      const response = await fetch("/api/devices");
      if (response.ok) {
        dispatch(devicesActions.refresh(await response.json()));
      } else {
        throw Error(await response.text());
      }
    }
    setRemoving(false);
  });

  useEffectAsync(async () => {
    const endpoints = `/api/commands/send?deviceId=${item.id}`;
    if (endpoints) {
      const response = await fetch(endpoints);
      if (response.ok) {
        const data = await response.json(); // Esperar la resolución de response.json
        setBotonApagar(data.some((item) => item.type === "engineStop"));
      } else {
        throw Error(await response.text());
      }
    }
  }, []);

  const handleGeofence = useCatchCallback(async () => {
    const newItem = {
      name: t("sharedGeofence"),
      area: `CIRCLE (${position.latitude} ${position.longitude}, 50)`,
    };
    const response = await fetch("/api/geofences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });
    if (response.ok) {
      const item = await response.json();
      const permissionResponse = await fetch("/api/permissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deviceId: position.deviceId,
          geofenceId: item.id,
        }),
      });
      if (!permissionResponse.ok) {
        throw Error(await permissionResponse.text());
      }
      navigate(`/settings/geofence/${item.id}`);
    } else {
      throw Error(await response.text());
    }
  }, [navigate, position]);

  return (
    <div
      className={classes.root}
      style={{ height: "40vh", maxHeight: "400px", backgroundColor: "#FFFFFF" }}
    >
      <div style={{ height: "100%" }}>
        {device && (
          <Card
            elevation={3}
            className={classes.card}
            style={{
              height: "100%",
              borderTopLeftRadius: "17px",
              borderTopRightRadius: "17px",
            }}
          >
            <div
              className={classes.header}
              style={{ backgroundColor: "#DAD9DD" }}
            >
              <div>
                <Typography
                  variant="body2"
                  color="#004AAD"
                  fontWeight={600}
                  fontSize={14}
                >
                  {device.name}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={800}
                  color={"#004AAD"}
                  className="opacity-60"
                  fontSize={14}
                >
                  {secondaryText(device)}
                </Typography>
              </div>
              <div>
                {botonApagar ? (
                  <Tooltip title="Apagar motor">
                    <IconButton
                      size="small"
                      onClick={() => {
                        setOpcionApagarMotorActiva(true);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        id="Layer_1"
                        viewBox="0 0 50 50"
                        width="23px"
                        height="23px"
                        xmlSpace="preserve"
                        enableBackground="new 0 0 50 50"
                        fill="red"
                      >
                        <rect fill="none" width="50" height="50" />
                        <polyline
                          fill="none"
                          points="30,14 30,10 35,10 35,6 21,6 21,10 26,10 26,14"
                          stroke="red"
                          strokeLinejoin="round"
                          strokeMiterlimit="10"
                          strokeWidth="2"
                        />
                        <polyline
                          fill="none"
                          points="9,27 5,27 5,21 1,21 1,37 5,37 5,31 9,31"
                          stroke="red"
                          strokeLinejoin="round"
                          strokeMiterlimit="10"
                          strokeWidth="2"
                        />
                        <path
                          d="M45,20v5h-3v-8.157C42,15.826,41.189,15,40.191,15H19.99c-0.479,0-0.941,0.195-1.28,0.542L14,21h-3c-1,0-2,1-2,2v12c0,1.018,1.002,2,2,2h3l4.712,5.461C19.051,42.806,19.511,43,19.99,43h12.855c0.479,0,0.939-0.194,1.278-0.539l7.346-7.482c0.341-0.346,0.53-0.814,0.53-1.303V31h3v5h4V20H45z"
                          fill="none"
                          stroke="red"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit="10"
                          strokeWidth="2.0077"
                        />
                        <polygon
                          points="32,28 24,39 27,30 22,30 27,20 32,20 27,28"
                          stroke="red"
                          fill="red"
                        />
                      </svg>
                      {/* <ErrorIcon fontSize="small" className={classes.error} /> */}
                    </IconButton>
                  </Tooltip>
                ) : null}
                <Tooltip title="Compartir">
                  <IconButton
                    size="small"
                    onClick={() => {
                      setModalActivo(true);
                    }}
                  >
                    <ShareIcon size="small" sx={{ color: "#1A237E" }} />
                  </IconButton>
                </Tooltip>
                {vistaMapa ? (
                  <IconButton
                    size="small"
                    onTouchStart={() => {
                      setVistaMapa(false);
                    }}
                    onClick={() => {
                      setVistaMapa(false);
                    }}
                  >
                    <FeedIcon fontSize="small" />
                  </IconButton>
                ) : (
                  <IconButton
                    size="small"
                    onTouchStart={() => {
                      setVistaMapa(true);
                    }}
                    onClick={() => {
                      setVistaMapa(true);
                    }}
                  >
                    <CameraAltIcon fontSize="small" />
                  </IconButton>
                )}

                <IconButton
                  size="small"
                  onClick={onClose}
                  onTouchStart={onClose}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </div>
            </div>
            {position && (
              <CardContent
                className={classes.content}
                style={{ height: "100%", overflow: "auto" }}
              >
                {vistaMapa ? (
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <iframe
                      src={convertToEmbedUrl(
                        `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${position.latitude}%2C${position.longitude}&heading=${position.course}`
                      )}
                      width="100%"
                      height="85%"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Google Maps Street View"
                    ></iframe>
                  </div>
                ) : (
                  <Table size="small" classes={{ root: classes.table }}>
                    <TableBody>
                      {positionItems
                        .split(",")
                        .filter(
                          (key) =>
                            position.hasOwnProperty(key) ||
                            position.attributes.hasOwnProperty(key)
                        )
                        .map((key) => {
                          return key === "address" ? ( // Verifica si la clave es "address"
                            <TableRow>
                              <TableCell className={classes.cell}>
                                <Typography variant="body2">
                                  {positionAttributes[key]?.name}
                                </Typography>
                              </TableCell>
                              <TableCell className={classes.cell}>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  {direccion}
                                </Typography>
                              </TableCell>
                            </TableRow>
                          ) : (
                            <StatusRow
                              key={key}
                              name={positionAttributes[key]?.name || key}
                              content={
                                <PositionValue
                                  position={position}
                                  property={
                                    position.hasOwnProperty(key) ? key : null
                                  }
                                  attribute={
                                    !position.hasOwnProperty(key) ? key : null
                                  }
                                />
                              }
                            />
                          );
                        })}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            )}
          </Card>
        )}
      </div>
      {position && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={handleGeofence}>
            {t("sharedCreateGeofence")}
          </MenuItem>
          <MenuItem
            component="a"
            target="_blank"
            href={`https://www.google.com/maps/search/?api=1&query=${position.latitude}%2C${position.longitude}`}
          >
            {t("linkGoogleMaps")}
          </MenuItem>
          <MenuItem
            component="a"
            target="_blank"
            href={`http://maps.apple.com/?ll=${position.latitude},${position.longitude}`}
          >
            {t("linkAppleMaps")}
          </MenuItem>
          <MenuItem
            component="a"
            target="_blank"
            href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${position.latitude}%2C${position.longitude}&heading=${position.course}`}
          >
            {t("linkStreetView")}
          </MenuItem>
          {navigationAppTitle && (
            <MenuItem
              component="a"
              target="_blank"
              href={navigationAppLink
                .replace("{latitude}", position.latitude)
                .replace("{longitude}", position.longitude)}
            >
              {navigationAppTitle}
            </MenuItem>
          )}
          {!shareDisabled && !user.temporary && (
            <MenuItem
              onClick={() => navigate(`/settings/device/${deviceId}/share`)}
            >
              <Typography color="secondary">{t("deviceShare")}</Typography>
            </MenuItem>
          )}
        </Menu>
      )}
      <RemoveDialog
        open={removing}
        endpoint="devices"
        itemId={deviceId}
        onResult={(removed) => handleRemove(removed)}
      />
    </div>
  );
};

export default StatusMovilCard;
