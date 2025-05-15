import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import {
  formatDistance,
  formatVolume,
  formatTime,
  formatNumericHours,
} from "../../common/util/formatter";
import { useTranslation } from "../../common/components/LocalizationProvider";
import { useSelector } from "react-redux";

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

const useStyles = makeStyles((theme) => ({
  card: {
    pointerEvents: "auto",
  },
  media: {},
  mediaButton: {},
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(1, 1, 0, 2),
    backgroundColor: "#333333",
  },
  content: {
    backgroundColor: "#333333",
  },
  delete: {
    color: theme.palette.error.main,
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
      color: "textSecondary",
    },
  },
  cell: {
    borderBottom: "none",
  },
  actions: {
    justifyContent: "space-between",
    backgroundColor: "#333333",
  },
  root: () => ({}),
}));

const Ubicacion = ({ id, position }) => {
  const device = useSelector((state) => state.devices.items[id]);
  const t = useTranslation();
  const [items, setItems] = useState(null);
  const classes = useStyles();
  const getFormattedDate = (offsetHours, isStartOfDay) => {
    const today = new Date();
    today.setUTCHours(today.getUTCHours() + offsetHours); // Ajustar la hora al desfase necesario

    if (isStartOfDay) {
      // Establece la hora al inicio del día (00:00:00)
      today.setUTCHours(0, 0, 0, 0);
    } else {
      // Establece la hora al final del día (23:59:59)
      today.setUTCHours(23, 59, 59, 999);
    }

    const isoDate = today.toISOString(); // Obtiene la fecha en formato ISO completo
    return encodeURIComponent(isoDate); // Codificar los caracteres especiales como ":"
  };
  useEffect(() => {
    console.log(id);
    console.log(position);
  }, []);

  const obtenerInfo = async () => {
    obtenerDireccion(position.latitude, position.longitude).then((x) => {
      const dateString = device.lastUpdate;
      const date = new Date(dateString);

      const day = String(date.getUTCDate()).padStart(2, "0");
      const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Los meses en JavaScript son 0-indexados
      const year = date.getUTCFullYear();
      setItems({
        direccion: x,
        device: device.name,
        fecha: `${day}/${month}/${year}`,
      });
    });
  };
  useEffect(() => {
    obtenerInfo();
  }, [position]);

  if (items === null) {
    return (
      <Typography variant="body1" color="textSecondary">
        Cargando...
      </Typography>
    );
  }

  return (
    <div style={{ maxHeight: "100%", overflowY: "auto" }}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={classes.cell}>
              <Typography
                variant="body2"
                color="textPrimary"
                fontWeight={600}
                sx={{
                  opacity: 0.8,
                }}
              >
                Dispositivo
              </Typography>
            </TableCell>
            <TableCell className={classes.cell}>
              <Typography variant="body2" color="textSecondary">
                {items.device}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.cell}>
              <Typography
                variant="body2"
                color="textPrimary"
                fontWeight={600}
                sx={{
                  opacity: 0.8,
                }}
              >
                Dirección
              </Typography>
            </TableCell>
            <TableCell className={classes.cell}>
              <Typography variant="body2" color="textSecondary">
                {items.direccion}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.cell}>
              <Typography
                variant="body2"
                color="textPrimary"
                fontWeight={600}
                sx={{
                  opacity: 0.8,
                }}
              >
                Fecha
              </Typography>
            </TableCell>
            <TableCell className={classes.cell}>
              <Typography variant="body2" color="textSecondary">
                {items.fecha}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Ubicacion;
