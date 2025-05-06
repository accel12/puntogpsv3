import { Button, Card, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HandymanIcon from "@mui/icons-material/Handyman";
import BarChartIcon from "@mui/icons-material/BarChart";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useSelector } from "react-redux";
import UserDesktopPage from "../settings/UserDesktopPage";
import VehiculosCustom from "./VehiculosCustom";
import SettingsMenu from "../settings/components/SettingsMenu";
import ReportsMenu from "../reports/components/ReportsMenu";
import CommandsDesktopPage from "../settings/CommandsDesktopPage";
import NotificationsDesktopPage from "../settings/NotificationsDesktopPage";

const SideBar = ({
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
  ocultar,
  setOcultar,
  anchoSidebar,
}) => {
  const devices = useSelector((state) => state.devices.items);
  const [seleccion, setSeleccion] = useState(0);
  const [estados, setEstados] = useState({ total: 0, online: 0, offline: 0 });

  const handleLogout = async () => {
    const notificationToken = window.localStorage.getItem("notificationToken");
    if (notificationToken && !user.readonly) {
      window.localStorage.removeItem("notificationToken");
      const tokens = user.attributes.notificationTokens?.split(",") || [];
      if (tokens.includes(notificationToken)) {
        const updatedUser = {
          ...user,
          attributes: {
            ...user.attributes,
            notificationTokens:
              tokens.length > 1
                ? tokens.filter((it) => it !== notificationToken).join(",")
                : undefined,
          },
        };
        await fetch(`/api/users/${user.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        });
      }
    }

    await fetch("/api/session", { method: "DELETE" });
    nativePostMessage("logout");
    navigate("/login");
    dispatch(sessionActions.updateUser(null));
  };

  const renderizarPanel = () => {
    if (seleccion == 0)
      return (
        <div>
          <UserDesktopPage />
        </div>
      );
    if (seleccion == 1)
      return (
        <Card style={{ height: "100%", marginInline: 23, marginBlock: 16 }}>
          <VehiculosCustom
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
          />
        </Card>
      );
    if (seleccion == 2) {
      return (
        <Card style={{ marginInline: 23, marginBlock: 16 }}>
          <div style={{ paddingInline: "10px", paddingTop: "5px" }}>
            <Typography variant="h6">Ajustes</Typography>
            <SettingsMenu />
          </div>
        </Card>
      );
    }
    if (seleccion == 3) {
      return (
        <Card style={{ marginInline: 23, marginBlock: 16 }}>
          <div style={{ paddingInline: "10px", paddingTop: "5px" }}>
            <Typography variant="h6">Reportes</Typography>
            <ReportsMenu />
          </div>
        </Card>
      );
    }
    if (seleccion == 4) {
      return (
        <div>
          <CommandsDesktopPage />
        </div>
      );
    }
    if (seleccion == 5) {
      return (
        <div style={{ height: "100%", marginLeft: 23 }}>
          <NotificationsDesktopPage />
        </div>
      );
    }
  };

  useEffect(() => {
    if (Object.values(devices).length !== 0) {
      console.log(Object.values(devices));
      const online = Object.values(devices).filter(
        (x) => x.status == "online"
      ).length;
      const offline = Object.values(devices).filter(
        (x) => x.status == "offline"
      ).length;
      setEstados({
        total: Object.values(devices).length,
        online: online,
        offline: offline,
      });
    }
  }, [devices]);
  return (
    <div
      className="flex"
      style={{
        height: "calc(100vh - 50px)",
        width: anchoSidebar,
        minHeight: "470px",
      }}
    >
      <div className="flex">
        <div
          className="flex flex-col bg-[#004AAD] relative"
          style={{ width: "56px" }}
        >
          <div className=" flex-1 flex justify-center my-4">
            <div className="flex gap-2 flex-col text-[#E1E3E9]">
              <div
                style={
                  seleccion == 0
                    ? {
                        border: "2px solid #638FCD",
                        backgroundColor: "#E1E3E9",
                        color: "#004AAD",
                        cursor: "pointer",
                      }
                    : { cursor: "pointer" }
                }
                className="rounded-full"
                onClick={() => {
                  setSeleccion(0);
                }}
              >
                <PersonIcon fontSize="large" sx={{ margin: "2px" }} />
              </div>
              <div
                style={
                  seleccion == 1
                    ? {
                        border: "2px solid #638FCD",
                        backgroundColor: "#E1E3E9",
                        color: "#004AAD",
                        cursor: "pointer",
                      }
                    : { cursor: "pointer" }
                }
                className="rounded-full"
                onClick={() => {
                  setSeleccion(1);
                }}
              >
                <DirectionsCarIcon fontSize="large" sx={{ margin: "2px" }} />
              </div>

              <div
                style={
                  seleccion == 2
                    ? {
                        border: "2px solid #638FCD",
                        backgroundColor: "#E1E3E9",
                        color: "#004AAD",
                        cursor: "pointer",
                      }
                    : { cursor: "pointer" }
                }
                className="rounded-full"
                onClick={() => {
                  setSeleccion(2);
                }}
              >
                <HandymanIcon fontSize="large" sx={{ margin: "2px" }} />
              </div>

              <div
                style={
                  seleccion == 3
                    ? {
                        border: "2px solid #638FCD",
                        backgroundColor: "#E1E3E9",
                        color: "#004AAD",
                        cursor: "pointer",
                      }
                    : { cursor: "pointer" }
                }
                className="rounded-full"
                onClick={() => {
                  setSeleccion(3);
                }}
              >
                <BarChartIcon fontSize="large" sx={{ margin: "2px" }} />
              </div>

              <div
                style={
                  seleccion == 4
                    ? {
                        border: "2px solid #638FCD",
                        backgroundColor: "#E1E3E9",
                        color: "#004AAD",
                        cursor: "pointer",
                      }
                    : {
                        cursor: "pointer",
                      }
                }
                className="rounded-full"
                onClick={() => {
                  setSeleccion(4);
                }}
              >
                <CloudSyncIcon fontSize="large" sx={{ margin: "2px" }} />
              </div>

              <div
                style={
                  seleccion == 5
                    ? {
                        border: "2px solid #638FCD",
                        backgroundColor: "#E1E3E9",
                        color: "#004AAD",
                        cursor: "pointer",
                      }
                    : { cursor: "pointer" }
                }
                className="rounded-full"
                onClick={() => {
                  setSeleccion(5);
                }}
              >
                <NotificationsActiveIcon
                  fontSize="large"
                  sx={{ margin: "2px" }}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
            }}
            className=" gap-2"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#FFFFFF",
                border: "2px solid #638FCD",
                borderRadius: 8,
                paddingBlock: 2,
                paddingInline: 3,
                gap: 4,
                color: "#F8F7FC",
              }}
            >
              <Tooltip
                title="Total de Dispositivos"
                arrow
                placement="right-start"
              >
                <div
                  style={{
                    backgroundColor: "#0070C0",
                    borderRadius: 8,
                    paddingBlock: 3,
                    paddingInline: 12,
                    cursor: "pointer",
                  }}
                >
                  <Typography>{estados.total}</Typography>
                </div>
              </Tooltip>
              <Tooltip
                title="Total de Dispositivos Online"
                arrow
                placement="right-start"
              >
                <div
                  style={{
                    backgroundColor: "#4EA72E",
                    borderRadius: 8,
                    paddingBlock: 3,
                    paddingInline: 12,
                    cursor: "pointer",
                  }}
                >
                  <Typography>{estados.online}</Typography>
                </div>
              </Tooltip>

              <Tooltip
                title="Total de Dispositivos Offline"
                arrow
                placement="right-start"
              >
                <div
                  style={{
                    backgroundColor: "#FF0000",
                    borderRadius: 8,
                    paddingBlock: 3,
                    paddingInline: 12,
                    cursor: "pointer",
                  }}
                >
                  <Typography>{estados.offline}</Typography>
                </div>
              </Tooltip>
            </div>
            <Tooltip title="Cerrar Sesión" arrow placement="right-start">
              <div
                sx={{
                  backgroundColor: "#FF1F1F",
                  width: 40,
                  height: 40,
                  cursor: "pointer",
                }}
                onClick={handleLogout}
              >
                <PowerSettingsNewIcon
                  sx={{
                    color: "#FFFFFF",
                    fontSize: 40,
                    cursor: "pointer",
                    backgroundColor: "#FF1F1F",
                  }}
                  className="rounded-full"
                />
              </div>
            </Tooltip>
          </div>

          <div className="absolute right-[-8px] top-[-7px] z-50">
            <div
              onClick={() => {
                setOcultar(!ocultar);
              }}
              className="rounded-full bg-white h-[16px] w-[16px] text-[#004AAD] flex items-center justify-center border-[1px] border-[#638FCD] cursor-pointer"
            >
              {ocultar ? (
                <KeyboardDoubleArrowRightIcon sx={{ fontSize: 14 }} />
              ) : (
                <KeyboardDoubleArrowLeftIcon sx={{ fontSize: 14 }} />
              )}
            </div>
          </div>
        </div>
        <Card
          elevation={2}
          sx={{
            borderRadius: 0,
            overflow: "auto",
            backgroundColor: "#F8F7FC",
            width: ocultar ? 0 : "330px",
            transition: "width 0.2s ease-in-out",
          }}
        >
          {renderizarPanel()}
        </Card>
      </div>
    </div>
  );
};

export default SideBar;
