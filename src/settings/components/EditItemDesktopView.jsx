import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Skeleton,
  Typography,
  TextField,
} from "@mui/material";
import { useCatch, useEffectAsync } from "../../reactHelper";
import { useTranslation } from "../../common/components/LocalizationProvider";
import PageLayout from "../../common/components/PageLayout";
import useSettingsStyles from "../common/useSettingsStyles";
import { useSelector } from "react-redux";

const EditItemDesktopView = ({
  children,
  endpoint,
  item,
  setItem,
  defaultItem,
  validate,
  onItemSaved,
}) => {
  const navigate = useNavigate();
  const classes = useSettingsStyles();
  const t = useTranslation();

  const id = useSelector((state) => state.session.user.id);

  useEffectAsync(async () => {
    if (!item) {
      if (id) {
        const response = await fetch(`/api/${endpoint}/${id}`);
        if (response.ok) {
          setItem(await response.json());
        } else {
          throw Error(await response.text());
        }
      } else {
        setItem(defaultItem || {});
      }
    }
  }, [id, item, defaultItem]);

  const handleSave = useCatch(async () => {
    let url = `/api/${endpoint}`;
    if (id) {
      url += `/${id}`;
    }

    const response = await fetch(url, {
      method: !id ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });

    if (response.ok) {
      if (onItemSaved) {
        onItemSaved(await response.json());
        alert("Se guardaron los cambios");
      }
    } else {
      throw Error(await response.text());
    }
  });

  return (
    <Container maxWidth="xs" className={classes.container}>
      {item ? (
        children
      ) : (
        <Accordion defaultExpanded>
          <AccordionSummary>
            <Typography variant="subtitle1">
              <Skeleton width="10em" />
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {[...Array(3)].map((_, i) => (
              <Skeleton key={-i} width="100%">
                <TextField />
              </Skeleton>
            ))}
          </AccordionDetails>
        </Accordion>
      )}
      <div className={classes.buttons}>
        <Button
          type="button"
          color="primary"
          variant="contained"
          onClick={handleSave}
          disabled={!item || !validate()}
        >
          {t("sharedSave")}
        </Button>
      </div>
    </Container>
  );
};

export default EditItemDesktopView;
