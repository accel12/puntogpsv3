import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import Draggable from "react-draggable";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "./LocalizationProvider";
import Llave from "./ConfiguracionesFlotantes/Llave";
import Candado from "./ConfiguracionesFlotantes/Candado";

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

const StatusDesktopCardModalConfiguraciones = ({
  deviceId,
  position,
  valorOpcion,
  onClose,
  disableActions,
  desktopPadding = 0,
}) => {
  const classes = useStyles({ desktopPadding });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const t = useTranslation();

  const device = useSelector((state) => state.devices.items[deviceId]);

  const Renderizar = () => {
    if (valorOpcion == 0) {
      return <div>0</div>;
    }
    if (valorOpcion == 1) {
      return (
        <div>
          <Candado onClose={onClose} />
        </div>
      );
    }
    if (valorOpcion == 3) {
      return (
        <div>
          <Llave onClose={onClose} />
        </div>
      );
    }
  };

  return (
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
                  {Renderizar()}
                </CardContent>
              )}
            </Card>
          </Draggable>
        )}
      </div>
    </>
  );
};

export default StatusDesktopCardModalConfiguraciones;
