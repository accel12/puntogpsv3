import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import makeStyles from "@mui/styles/makeStyles";
import {
  IconButton,
  Tooltip,
  Avatar,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import Battery60Icon from "@mui/icons-material/Battery60";
import BatteryCharging60Icon from "@mui/icons-material/BatteryCharging60";
import Battery20Icon from "@mui/icons-material/Battery20";
import BatteryCharging20Icon from "@mui/icons-material/BatteryCharging20";
import ErrorIcon from "@mui/icons-material/Error";
import dayjs from "dayjs";
import ShareIcon from "@mui/icons-material/Share";
import relativeTime from "dayjs/plugin/relativeTime";
import { devicesActions } from "../store";
import Engine from "../resources/images/data/engine.svg";
import {
  formatAlarm,
  formatBoolean,
  formatPercentage,
  formatStatus,
  getStatusColor,
} from "../common/util/formatter";
import { useTranslation } from "../common/components/LocalizationProvider";
import { mapIconKey, mapIcons } from "../map/core/preloadImages";
import { useAdministrator } from "../common/util/permissions";
import EngineIcon from "../resources/images/data/engine.svg?react";
import { useAttributePreference } from "../common/util/preferences";
import { useEffectAsync } from "../reactHelper";

dayjs.extend(relativeTime);

const useStyles = makeStyles((theme) => ({
  icon: {
    width: "25px",
    height: "25px",
    filter: "brightness(0) invert(1)",
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

const DeviceDesktopRow = ({ data, index, style }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [botonApagar, setBotonApagar] = useState(false);
  const t = useTranslation();

  const admin = useAdministrator();

  const item = data.devices[index];

  const position = useSelector((state) => state.session.positions[item.id]);

  const devicePrimary = useAttributePreference("devicePrimary", "name");
  const deviceSecondary = useAttributePreference("deviceSecondary", "");

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

  const secondaryText = () => {
    let status;
    if (item.status === "online" || !item.lastUpdate) {
      status = formatStatus(item.status, t);
    } else {
      status = dayjs(item.lastUpdate).fromNow();
    }
    return (
      <>
        {deviceSecondary &&
          item[deviceSecondary] &&
          `${item[deviceSecondary]} • `}
        <span className={classes[getStatusColor(item.status)]}>{status}</span>
      </>
    );
  };

  return (
    <div style={style}>
      <ListItemButton
        key={item.id}
        onClick={() => dispatch(devicesActions.selectId(item.id))}
        disabled={!admin && item.disabled}
      >
        <ListItemAvatar>
          <Avatar>
            <img
              className={classes.icon}
              src={mapIcons[mapIconKey(item.category)]}
              alt=""
            />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={item[devicePrimary]}
          primaryTypographyProps={{ noWrap: true }}
          secondary={secondaryText()}
          secondaryTypographyProps={{ noWrap: true }}
        />
        {position && (
          <>
            <Tooltip title="Compartir">
              <IconButton
                size="small"
                onClick={() => {
                  data.setModalActivo(true);
                }}
              >
                <ShareIcon size="small" sx={{ color: "#1A237E" }} />
              </IconButton>
            </Tooltip>
            {botonApagar ? (
              <Tooltip title="Apagar motor">
                <IconButton
                  size="small"
                  onClick={() => {
                    data.setOpcionApagarMotorActiva(true);
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

            {position.attributes.hasOwnProperty("alarm") && (
              <Tooltip
                title={`${t("eventAlarm")}: ${formatAlarm(
                  position.attributes.alarm,
                  t
                )}`}
              >
                <IconButton size="small">
                  <ErrorIcon fontSize="small" className={classes.error} />
                </IconButton>
              </Tooltip>
            )}
            {position.attributes.hasOwnProperty("ignition") && (
              <Tooltip
                title={`${t("positionIgnition")}: ${formatBoolean(
                  position.attributes.ignition,
                  t
                )}`}
              >
                <IconButton size="small">
                  {position.attributes.ignition ? (
                    <EngineIcon
                      width={20}
                      height={20}
                      className={classes.success}
                    />
                  ) : (
                    <EngineIcon
                      width={20}
                      height={20}
                      className={classes.neutral}
                    />
                  )}
                </IconButton>
              </Tooltip>
            )}
            {position.attributes.hasOwnProperty("batteryLevel") && (
              <Tooltip
                title={`${t("positionBatteryLevel")}: ${formatPercentage(
                  position.attributes.batteryLevel
                )}`}
              >
                <IconButton size="small">
                  {(position.attributes.batteryLevel > 70 &&
                    (position.attributes.charge ? (
                      <BatteryChargingFullIcon
                        fontSize="small"
                        className={classes.success}
                      />
                    ) : (
                      <BatteryFullIcon
                        fontSize="small"
                        className={classes.success}
                      />
                    ))) ||
                    (position.attributes.batteryLevel > 30 &&
                      (position.attributes.charge ? (
                        <BatteryCharging60Icon
                          fontSize="small"
                          className={classes.warning}
                        />
                      ) : (
                        <Battery60Icon
                          fontSize="small"
                          className={classes.warning}
                        />
                      ))) ||
                    (position.attributes.charge ? (
                      <BatteryCharging20Icon
                        fontSize="small"
                        className={classes.error}
                      />
                    ) : (
                      <Battery20Icon
                        fontSize="small"
                        className={classes.error}
                      />
                    ))}
                </IconButton>
              </Tooltip>
            )}
          </>
        )}
      </ListItemButton>
    </div>
  );
};

export default DeviceDesktopRow;
