import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useSettingsStyles from "../../../settings/common/useSettingsStyles";
import SelectField from "../SelectField";
import BaseCommandView from "../../../settings/components/BaseCommandView";
import { useRestriction } from "../../util/permissions";
import { useCatch } from "../../../reactHelper";
import { useTranslation } from "../LocalizationProvider";

const Candado = ({ onClose }) => {
  const navigate = useNavigate();
  const classes = useSettingsStyles();
  const t = useTranslation();

  //   const { id } = useParams();
  const id = useSelector((state) => state.devices.selectedId);

  const [savedId, setSavedId] = useState(0);
  const [item, setItem] = useState({});

  const limitCommands = useRestriction("limitCommands");

  const handleSend = useCatch(async () => {
    let command;
    console.log("savedId", savedId);
    if (savedId) {
      console.log("savea");
      const response = await fetch(`/api/commands/${savedId}`);
      console.log(response);
      if (response.ok) {
        command = await response.json();
        alert("Comando creado");
        onClose();
      } else {
        throw Error(await response.text());
      }
    } else {
      command = item;
      alert("No se puede crear comando para este dispositivo");
      onClose();
    }

    command.deviceId = parseInt(id, 10);

    const response = await fetch("/api/commands/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(command),
    });

    if (response.ok) {
      //   navigate(-1);
    } else {
      throw Error(await response.text());
    }
  });

  const validate = () => savedId || (item && item.type);
  return (
    <div>
      <Container maxWidth="xs" className={classes.container}>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">{t("sharedRequired")}</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <SelectField
              value={savedId}
              emptyValue={limitCommands ? null : 0}
              emptyTitle={t("sharedNew")}
              onChange={(e) => {
                console.log(e);
                setSavedId(e.target.value);
              }}
              endpoint={`/api/commands/send?deviceId=${id}`}
              titleGetter={(it) => it.description}
              label={t("sharedSavedCommand")}
            />
            {!limitCommands && !savedId && (
              <BaseCommandView deviceId={id} item={item} setItem={setItem} />
            )}
          </AccordionDetails>
        </Accordion>
        <div className={classes.buttons}>
          <Button
            type="button"
            color="primary"
            variant="contained"
            onClick={handleSend}
            disabled={!validate()}
          >
            {t("commandSend")}
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Candado;
