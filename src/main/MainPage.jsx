import { Card, Paper, useMediaQuery } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import Topbar from "./Topbar";
import SideBar from "./SideBar";
import BottomBar from "./BottomBar";
import MainMap from "./MainMap";
import useFilter from "./useFilter";
import usePersistedState from "../common/util/usePersistedState";
import StatusCard from "../common/components/StatusCard";
import StatusDesktopCard from "../common/components/StatusDesktopCard";
import EventsDrawer from "./EventsDrawer";
import { devicesActions } from "../store";
import StatusDesktopCardModal from "../common/components/StatusDesktopCardModal";
import StatusDesktopCardModalConfiguraciones from "../common/components/StatusDesktopCardModalConfiguraciones";
import StatusDesktopCardModalApagarMotor from "../common/components/StatusDesktopCardModalApagarMotor";
import { makeStyles } from "@mui/styles";
import MainToolbar from "./MainToolbar";
import DeviceList from "./DeviceList";

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
      top: 0,
      height: `calc(100% - ${theme.spacing(3)})`,
      width: theme.dimensions.drawerWidthDesktop,
      margin: theme.spacing(1.5),
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

const MainPage = () => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [valorOpcion, setValorOpcion] = useState(0);
  const [seleccion, setSeleccion] = useState(0);
  const [opcionActiva, setOpcionActiva] = useState(false);
  const [filteredPositions, setFilteredPositions] = useState([]);
  const positions = useSelector((state) => state.session.positions);
  const selectedDeviceId = useSelector((state) => state.devices.selectedId);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [ModalActivo, setModalActivo] = useState(false);
  const [filter, setFilter] = usePersistedState("filter", {
    statuses: [],
    groups: [],
  });
  const [filterSort, setFilterSort] = usePersistedState("filterSort", "");
  const [filterMap, setFilterMap] = usePersistedState("filterMap", false);
  const selectedPosition = filteredPositions.find(
    (position) => selectedDeviceId && position.deviceId === selectedDeviceId
  );
  const [opcionApagarMotorActiva, setOpcionApagarMotorActiva] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [devicesOpen, setDevicesOpen] = useState(desktop);
  const [ocultar, setOcultar] = useState(false);
  const onEventsClick = useCallback(() => setEventsOpen(true), [setEventsOpen]);
  const anchoSidebar = ocultar ? "56px" : "386px";
  const classes = useStyles();
  useFilter(
    keyword,
    filter,
    filterSort,
    filterMap,
    positions,
    setFilteredDevices,
    setFilteredPositions
  );
  useEffect(() => {
    if (selectedDeviceId && seleccion !== 1) {
      setSeleccion(1);
    }
    setOcultar(false);
  }, [selectedDeviceId]);

  if (desktop) {
    return (
      <div
        className="h-screen flex flex-col w-screen"
        style={{ minHeight: "520px" }}
      >
        <Topbar />
        <div className="flex w-screen" style={{ minHeight: "470px" }}>
          <SideBar
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
            setModalActivo={setModalActivo}
            setOpcionApagarMotorActiva={setOpcionApagarMotorActiva}
            setOcultar={setOcultar}
            ocultar={ocultar}
            anchoSidebar={anchoSidebar}
            setSeleccion={setSeleccion}
            seleccion={seleccion}
          />
          <div
            className="flex flex-col flex-1"
            style={{
              width: `calc(100vw - ${anchoSidebar})`,
            }}
          >
            <Card
              style={{
                height: selectedDeviceId ? "75%" : "100%",
                minHeight: selectedDeviceId ? "calc(75% - 200px)" : "100%",
              }}
            >
              <MainMap
                filteredPositions={filteredPositions}
                selectedPosition={selectedPosition}
                onEventsClick={onEventsClick}
              />
            </Card>
            {selectedDeviceId && (
              <BottomBar
                deviceId={selectedDeviceId}
                position={selectedPosition}
              />
            )}
          </div>
        </div>
        {selectedDeviceId && (
          <StatusDesktopCard
            deviceId={selectedDeviceId}
            position={selectedPosition}
            onClose={() => dispatch(devicesActions.selectId(null))}
            desktopPadding={theme.dimensions.drawerWidthDesktop}
            setOpcionActiva={setOpcionActiva}
            setValorOpcion={setValorOpcion}
          />
        )}
        {selectedDeviceId && ModalActivo && (
          <StatusDesktopCardModal
            deviceId={selectedDeviceId}
            position={selectedPosition}
            ModalActivo={ModalActivo}
            setModalActivo={setModalActivo}
            onClose={() => setModalActivo(false)}
            desktopPadding={theme.dimensions.drawerWidthDesktop}
          />
        )}

        {selectedDeviceId && opcionActiva && (
          <StatusDesktopCardModalConfiguraciones
            deviceId={selectedDeviceId}
            position={selectedPosition}
            valorOpcion={valorOpcion}
            onClose={() => setOpcionActiva(false)}
            desktopPadding={theme.dimensions.drawerWidthDesktop}
          />
        )}
        {selectedDeviceId && opcionApagarMotorActiva && (
          <StatusDesktopCardModalApagarMotor
            deviceId={selectedDeviceId}
            position={selectedPosition}
            valorOpcion={valorOpcion}
            onClose={() => setOpcionApagarMotorActiva(false)}
            desktopPadding={theme.dimensions.drawerWidthDesktop}
          />
        )}
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        {desktop && (
          <MainMap
            filteredPositions={filteredPositions}
            selectedPosition={selectedPosition}
            onEventsClick={onEventsClick}
          />
        )}
        <div className={classes.sidebar}>
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
            {!desktop && (
              <div className={classes.contentMap}>
                <MainMap
                  filteredPositions={filteredPositions}
                  selectedPosition={selectedPosition}
                  onEventsClick={onEventsClick}
                />
              </div>
            )}
            <Paper
              square
              className={classes.contentList}
              style={devicesOpen ? {} : { visibility: "hidden" }}
            >
              <DeviceList devices={filteredDevices} />
            </Paper>
          </div>
          {desktop && (
            <div className={classes.footer}>
              <BottomMenu />
            </div>
          )}
        </div>
        <EventsDrawer open={eventsOpen} onClose={() => setEventsOpen(false)} />
        {selectedDeviceId && (
          <StatusCard
            deviceId={selectedDeviceId}
            position={selectedPosition}
            onClose={() => dispatch(devicesActions.selectId(null))}
            desktopPadding={theme.dimensions.drawerWidthDesktop}
          />
        )}
      </div>
    );
  }
};

export default MainPage;
