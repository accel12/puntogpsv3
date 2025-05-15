import { Button, IconButton, Snackbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import useSettingsStyles from "../../../settings/common/useSettingsStyles";
import { useTranslation } from "../LocalizationProvider";
import { useCatch } from "../../../reactHelper";

const Llave = ({ onClose }) => {
  const t = useTranslation();
  const classes = useSettingsStyles();
  const selectedDeviceId = useSelector((state) => state.devices.selectedId);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  const handleSend = useCatch(async () => {
    //
    const responseEngine = await fetch(
      `/api/commands/send?deviceId=${selectedDeviceId}`
    );
    console.log(responseEngine);
    const lista = await responseEngine.json();
    console.log(lista);
    const engineResume = lista.find((item) => item.type === "engineResume");
    let command;
    if (engineResume.id) {
      const response = await fetch(`/api/commands/${engineResume.id}`);
      console.log(response);
      if (response.ok) {
        console.log(response);
        command = await response.json();
      } else {
        throw Error(await response.text());
      }
    } else {
      command = item;
    }

    command.deviceId = parseInt(selectedDeviceId, 10);

    const response = await fetch("/api/commands/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(command),
    });

    if (response.ok) {
      // navigate(-1);
      alert("Motor encendido");
      onClose();
    } else {
      throw Error(await response.text());
    }

    // let command;
    // const response = await fetch(
    //   `/api/commands/send?deviceId=${selectedDeviceId}`
    // );
    // const response1 = response;
    // if (response.ok) {
    //   console.log("as");
    //   console.log(response1);
    //   command = await response.json();

    //   const engineResume = command.find((item) => item.type === "engineResume");

    //   const savedId = engineResume ? engineResume.id : null;
    //   if (savedId) {
    //     const response = await fetch(`/api/commands/${savedId}`);

    //     if (response.ok) {
    //       command = await response.json();
    //     } else {
    //       throw Error(await response.text());
    //     }
    //   } else {
    //     command = item;
    //   }

    //   command.deviceId = parseInt(id, 10);

    //   const response = await fetch("/api/commands/send", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(command),
    //   });

    //   if (response.ok) {
    //     onclose();
    //   } else {
    //     throw Error(await response.text());
    //   }
    // }
  });
  return (
    <div>
      <Typography>Desea encender el motor</Typography>
      <div className={classes.buttons}>
        <Button
          type="button"
          color="primary"
          variant="outlined"
          onClick={onClose}
        >
          {t("sharedCancel")}
        </Button>
        <Button
          type="button"
          color="primary"
          variant="contained"
          onClick={handleSend}
        >
          Aceptar
        </Button>
      </div>
    </div>
  );
};

export default Llave;
