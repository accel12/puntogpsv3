import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Paper, Typography } from "@mui/material";
import DeviceDesktopList from "./DeviceDesktopList";
import MainToolbar from "./MainToolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  sidebar: {
    pointerEvents: "none",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      position: "fixed",
      left: 0,
      top: 70,
      height: `calc(100% - 55px)`,
      // width: theme.dimensions.drawerWidthDesktop,
      width: 500,
      zIndex: 3,
    },
    [theme.breakpoints.down("md")]: {
      height: "100%",
      width: "100%",
    },
  },
  header: {
    pointerEvents: "auto",
    zIndex: 6,
  },
  footer: {
    pointerEvents: "auto",
    zIndex: 5,
  },
  middle: {
    flex: 1,
    display: "grid",
    height: "calc(100% - 64px)",
  },
  contentMap: {
    pointerEvents: "auto",
    gridArea: "1 / 1",
  },
  contentList: {
    pointerEvents: "auto",
    gridArea: "1 / 1",
    zIndex: 4,
  },
}));

const VehiculosCustom = ({
  filteredDevices,
  devicesOpen,
  setDevicesOpen,
  keyword,
  setKeyword,
  filter,
  setFilter,
  filterSort,
  setFilterSort,
  filterMap,
  setFilterMap,
  setModalActivo,
  setOpcionApagarMotorActiva,
}) => {
  const classes = useStyles();

  return (
    <>
      <Paper square elevation={3} className={classes.header}>
        <MainToolbar
          filteredDevices={filteredDevices}
          devicesOpen={devicesOpen}
          setDevicesOpen={setDevicesOpen}
          keyword={keyword}
          setKeyword={setKeyword}
          filter={filter}
          setFilter={setFilter}
          filterSort={filterSort}
          setFilterSort={setFilterSort}
          filterMap={filterMap}
          setFilterMap={setFilterMap}
        />
      </Paper>
      <div className={classes.middle}>
        <Paper
          square
          className={classes.contentList}
          style={devicesOpen ? {} : { visibility: "hidden" }}
        >
          <DeviceDesktopList
            devices={filteredDevices}
            setModalActivo={setModalActivo}
            setOpcionApagarMotorActiva={setOpcionApagarMotorActiva}
          />
        </Paper>
      </div>
    </>
  );
};

export default VehiculosCustom;
