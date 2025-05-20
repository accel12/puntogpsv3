import { MinimizeTwoTone } from "@mui/icons-material";
import { Card, CardContent, IconButton, Typography } from "@mui/material";
import React from "react";
import { convertToEmbedUrl } from "../common/util/streetview";
import Informacion from "./NuevosRecursos/Informacion";
import InformacionEncendido from "./NuevosRecursos/InformacionEncendido";
import Ubicacion from "./NuevosRecursos/Ubicacion";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

const BottomBar = ({ position, deviceId }) => {
  return (
    <div
      className="flex p-2 gap-2 overflow-auto"
      style={{ height: "25%", minHeight: "200px" }}
    >
      <Card
        sx={{
          minWidth: "275px",
          maxWidth: "25%",
          padding: 0,
          height: "100%",
          backgroundColor: "#F8F7FC",
        }}
        elevation={3}
      >
        <CardContent sx={{ padding: 0 }}>
          <Typography
            component={"div"}
            fontWeight={600}
            fontSize={14}
            className="text-[#004AAD] bg-[#DAD9DD] p-2"
          >
            Vista de calle
          </Typography>
          <div className="bg-[#F8F7FC] m-2">
            {position !== undefined ? (
              <iframe
                src={convertToEmbedUrl(
                  `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${position.latitude}%2C${position.longitude}&heading=${position.course}`
                )}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Street View"
              ></iframe>
            ) : (
              <div>
                <Typography
                  component={"div"}
                  fontWeight={600}
                  fontSize={14}
                  sx={{ opacity: 0.5 }}
                >
                  No se encontró la posición
                </Typography>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <Card
        sx={{
          minWidth: "275px",
          maxWidth: "25%",
          padding: 0,
          height: "100%",
          backgroundColor: "#F8F7FC",
        }}
        elevation={3}
      >
        <CardContent sx={{ padding: 0, height: "100%" }}>
          <Typography
            component={"div"}
            fontWeight={600}
            fontSize={14}
            className="text-[#004AAD] bg-[#DAD9DD] p-2"
          >
            Ubicación
          </Typography>
          <Ubicacion id={deviceId} position={position} />
        </CardContent>
      </Card>
      <Card
        sx={{
          minWidth: "275px",
          maxWidth: "25%",
          padding: 0,
          height: "100%",
          backgroundColor: "#F8F7FC",
        }}
        elevation={3}
      >
        <CardContent sx={{ padding: 0, height: "100%" }}>
          <Typography
            component={"div"}
            fontWeight={600}
            fontSize={14}
            className="text-[#004AAD] bg-[#DAD9DD] p-2"
          >
            Información de parada
          </Typography>
          <Informacion id={deviceId} />
        </CardContent>
      </Card>
      <Card
        sx={{
          minWidth: "275px",
          maxWidth: "25%",
          padding: 0,
          height: "100%",
          backgroundColor: "#F8F7FC",
        }}
        elevation={3}
      >
        <CardContent sx={{ padding: 0, height: "100%" }}>
          <Typography
            component={"div"}
            fontWeight={600}
            fontSize={14}
            className="text-[#004AAD] bg-[#DAD9DD] p-2"
          >
            Información de encendido
          </Typography>
          <InformacionEncendido id={deviceId} />
        </CardContent>
      </Card>
    </div>
  );
};

export default BottomBar;
