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
import dayjs from "dayjs";

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

const Informacion = ({ id }) => {
  const t = useTranslation();
  const [items, setItems] = useState(null);
  const classes = useStyles();

  const obtenerInfo = async () => {
    const startDate = dayjs().startOf("day").toISOString();
    const endDate = dayjs().endOf("day").toISOString();

    const armarQuery = `deviceId=${id}&from=${startDate}&to=${endDate}`;
    console.log(armarQuery);
    const response = await fetch(`/api/reports/stops?${armarQuery}`, {
      headers: { Accept: "application/json" },
    });
    if (response.ok) {
      setItems(await response.json());
    } else {
      throw Error(await response.text());
    }
  };
  useEffect(() => {
    obtenerInfo();
  }, []);
  if (items == null) {
    return <div>Cargando...</div>;
  }
  if (items.length == 0) {
    return (
      <Typography variant="body1" color="textSecondary">
        No hay Informacion reciente
      </Typography>
    );
  } else {
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
                  Fecha Inicio
                </Typography>
              </TableCell>
              <TableCell className={classes.cell}>
                <Typography variant="body2" color="textSecondary">
                  {formatTime(items[items.length - 1].startTime, "minutes")}
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
                  Fecha Fin
                </Typography>
              </TableCell>
              <TableCell className={classes.cell}>
                <Typography variant="body2" color="textSecondary">
                  {formatTime(items[items.length - 1].endTime, "minutes")}
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
                  Duración
                </Typography>
              </TableCell>
              <TableCell className={classes.cell}>
                <Typography variant="body2" color="textSecondary">
                  {formatNumericHours(items[items.length - 1].duration, t)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
};

export default Informacion;
