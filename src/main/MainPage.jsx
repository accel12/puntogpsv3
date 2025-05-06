import { Card, useMediaQuery } from "@mui/material";
import React, { useCallback, useState } from "react";
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
import { devicesActions } from "../store";

const MainPage = () => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
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
  useFilter(
    keyword,
    filter,
    filterSort,
    filterMap,
    positions,
    setFilteredDevices,
    setFilteredPositions
  );

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
          />
        )}
      </div>
    );
  } else {
    return <div>MobilePage</div>;
  }
};

export default MainPage;
