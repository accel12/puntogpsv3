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
  CardMedia,
  TableFooter,
  Link,
  Tooltip,
  Button,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import CloseIcon from "@mui/icons-material/Close";
import ReplayIcon from "@mui/icons-material/Replay";
import PublishIcon from "@mui/icons-material/Publish";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PendingIcon from "@mui/icons-material/Pending";
import Marker from "../../resources/images/marker.png";
import WhatsappIcon from "../../resources/images/wzzicon.png";
import ShareIcon from "../../resources/images/shareIcon.png";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import { useTranslation } from "./LocalizationProvider";
import RemoveDialog from "./RemoveDialog";
import PositionValue from "./PositionValue";
import { useDeviceReadonly } from "../util/permissions";
import usePositionAttributes from "../attributes/usePositionAttributes";
import { devicesActions } from "../../store";
import { useCatch, useCatchCallback } from "../../reactHelper";
import { useAttributePreference } from "../util/preferences";
import useSettingsStyles from "../../settings/common/useSettingsStyles";

const useStyles = makeStyles((theme) => ({
  card: {
    pointerEvents: "auto",
    width: theme.dimensions.popupMaxWidth,
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
    position: "fixed",
    zIndex: 5,
    left: "70%",
    bottom: "500px",
    // [theme.breakpoints.up("md")]: {
    //   left: `calc(50% + ${desktopPadding} / 2)`,
    //   bottom: 500,
    // },
    // [theme.breakpoints.down("md")]: {
    //   left: "50%",
    //   bottom: 500,
    // },
    transform: "translateX(-50%)",
  }),
}));

const StatusDesktopCardModalApagarMotor = ({
  deviceId,
  position,
  valorOpcion,
  onClose,
  disableActions,
  desktopPadding = 0,
}) => {
  const classes = useStyles({ desktopPadding });
  const classes2 = useSettingsStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const t = useTranslation();
  const selectedDeviceId = useSelector((state) => state.devices.selectedId);
  const deviceReadonly = useDeviceReadonly();

  const shareDisabled = useSelector(
    (state) => state.session.server.attributes.disableShare
  );
  const user = useSelector((state) => state.session.user);
  const device = useSelector((state) => state.devices.items[deviceId]);

  const deviceImage = device?.attributes?.deviceImage;

  const positionAttributes = usePositionAttributes(t);
  const positionItems = useAttributePreference(
    "positionItems",
    "fixTime,address,speed,totalDistance"
  );

  const navigationAppLink = useAttributePreference("navigationAppLink");
  const navigationAppTitle = useAttributePreference("navigationAppTitle");

  const [anchorEl, setAnchorEl] = useState(null);

  const [removing, setRemoving] = useState(false);

  const handleSend = useCatch(async () => {
    const responseEngine = await fetch(
      `/api/commands/send?deviceId=${selectedDeviceId}`
    );
    console.log(responseEngine);
    const lista = await responseEngine.json();
    console.log(lista);
    const engineResume = lista.find((item) => item.type === "engineStop");
    let command;
    if (engineResume.id) {
      const response = await fetch(`/api/commands/${engineResume.id}`);
      console.log(response);
      if (response.ok) {
        console.log(response);
        command = await response.json();
      } else {
        throw Error(await response.text());
      }
    } else {
      command = item;
    }

    command.deviceId = parseInt(selectedDeviceId, 10);

    const response = await fetch("/api/commands/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(command),
    });

    if (response.ok) {
      // navigate(-1);
      alert("Motor apagado");
      onClose();
    } else {
      throw Error(await response.text());
    }
  });
  return (
    <>
      <>
        <div className={classes.root}>
          {device && (
            <Draggable handle={`.${classes.media}, .${classes.header}`}>
              <Card
                elevation={3}
                className={classes.card}
                style={{ width: "400px" }}
              >
                <div className={classes.header}>
                  <Typography variant="body2" color="textSecondary">
                    {device.name}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={onClose}
                    onTouchStart={onClose}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </div>
                {position && (
                  <CardContent className={classes.content}>
                    <div>
                      <Typography>Desea apagar el motor</Typography>
                      <div className={classes2.buttons}>
                        <Button
                          type="button"
                          color="primary"
                          variant="outlined"
                          onClick={onClose}
                        >
                          {t("sharedCancel")}
                        </Button>
                        <Button
                          type="button"
                          color="primary"
                          variant="contained"
                          onClick={handleSend}
                        >
                          Aceptar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            </Draggable>
          )}
        </div>
      </>
    </>
  );
};

export default StatusDesktopCardModalApagarMotor;
