import { IconButton, Paper, Slider, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useTranslation } from "../../LocalizationProvider";
import { useSelector } from "react-redux";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FastForwardIcon from "@mui/icons-material/FastForward";
import { formatTime } from "../../../../common/util/formatter";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    zIndex: 3,
    left: 0,
    top: 0,
    margin: theme.spacing(1.5),
    width: theme.dimensions.drawerWidthDesktop,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      margin: 0,
    },
  },
  title: {
    flexGrow: 1,
  },
  slider: {
    width: "100%",
  },
  controls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formControlLabel: {
    height: "100%",
    width: "100%",
    paddingRight: theme.spacing(1),
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(1),
    },
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(1),
    },
  },
}));

const RepeticionRuta = () => {
  const defaultDeviceId = useSelector((state) => state.devices.selectedId);
  const [positions, setPositions] = useState([]);
  const [index, setIndex] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [expanded, setExpanded] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState(defaultDeviceId);
  const t = useTranslation();
  const classes = useStyles();
  const deviceName = useSelector((state) => {
    if (selectedDeviceId) {
      const device = state.devices.items[selectedDeviceId];
      if (device) {
        return device.name;
      }
    }
    return null;
  });
  const handleDownload = () => {
    const query = new URLSearchParams({ deviceId: selectedDeviceId, from, to });
    window.location.assign(`/api/positions/kml?${query.toString()}`);
  };
  return (
    <div className={classes.sidebar}>
      {/* <Paper elevation={3} square>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {t("reportReplay")}
          </Typography>
        </Toolbar>
      </Paper>
      <Paper className={classes.content} square>
        <>
          <Typography variant="subtitle1" align="center">
            {deviceName}
          </Typography>
          <Slider
            className={classes.slider}
            max={positions.length - 1}
            step={null}
            marks={positions.map((_, index) => ({ value: index }))}
            value={index}
            onChange={(_, index) => setIndex(index)}
          />
          <div className={classes.controls}>
            {`${index + 1}/${positions.length}`}
            <IconButton
              onClick={() => setIndex((index) => index - 1)}
              disabled={playing || index <= 0}
            >
              <FastRewindIcon />
            </IconButton>
            <IconButton
              onClick={() => setPlaying(!playing)}
              disabled={index >= positions.length - 1}
            >
              {playing ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            <IconButton
              onClick={() => setIndex((index) => index + 1)}
              disabled={playing || index >= positions.length - 1}
            >
              <FastForwardIcon />
            </IconButton>
            {formatTime(positions[index].fixTime, "seconds")}
          </div>
        </>
      </Paper> */}
    </div>
  );
};

export default RepeticionRuta;
