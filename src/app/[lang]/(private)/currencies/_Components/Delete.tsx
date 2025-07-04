import { useDeleteUserCurrencyMutation } from "@/hooks/api/currencies/mutations/use-delete-user-currency";
import { AppContext } from "@/provider/appContext";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { InfoCircle, Trash } from "iconsax-react";
import { useTranslations } from "next-intl";
import { useContext, useState } from "react";

type IPropsCUrrency = {
  isBase: boolean;
  id: string;
};
export function DeleteCurrency({ isBase, id }: IPropsCUrrency) {
  const t = useTranslations("pages");
  const { setHandleError } = useContext(AppContext);
  const theme = useTheme();
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  const handleOpenDialogDeleteFunction = () => {
    setOpenDialogDelete(!openDialogDelete);
  };

  const { mutate: deleteMutation, isLoading } = useDeleteUserCurrencyMutation({
    onSuccess: ({ message }) => {
      setHandleError({
        status: "success",
        open: true,
        message,
      });
      handleOpenDialogDeleteFunction();
    },
  });

  const deleteFunction = async () => {
    deleteMutation(
      { currencyId: id },
      {
        onError: (error: any) => {
          setHandleError({
            open: true,
            status: "error",
            message: error.message,
          });
        },
      }
    );
  };
  return (
    <Box>
      <IconButton
        size="large"
        onClick={handleOpenDialogDeleteFunction}
        disabled={isBase}
        color="primary"
      >
        <Trash
          size={20}
          color={isBase ? theme.palette?.grey[600] : theme.palette.primary.main}
        />
      </IconButton>
      <Dialog
        open={openDialogDelete}
        onClose={handleOpenDialogDeleteFunction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        dir={t("dir")}
      >
        <DialogTitle id="alert-dialog-title" className={"dialogTitleDelete"}>
          <Box
            display="flex"
            justifyContent={"space-between"}
            alignItems={"center"}
            columnGap={1}
          >
            <Typography variant="h5">
              {t("currency.message_title_delete")}
            </Typography>
            <InfoCircle color={theme.palette.warning.main} size={30} />
          </Box>
        </DialogTitle>
        <DialogContent className="dialogContentDelete">
          <Box pt={1}>
            <Typography variant="body1">
              {t("currency.message_description_delete")}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions
          className="dialogActionDelete"
          sx={{ display: "flex", justifyContent: "end", columnGap: "1rem" }}
        >
          <Button variant="outlined" onClick={handleOpenDialogDeleteFunction}>
            {t("currency.cancel")}
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={deleteFunction}
            loading={isLoading}
          >
            {t("currency.yes")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
