import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  useTheme,
  Grid,
  InputLabel,
} from "@mui/material";
import { CloseSquare, Edit } from "iconsax-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { useAddExternalIncomeTypeMutation } from "@/hooks/api/definitions/external-income/mutations/use-add-mutation";
import { AppContext } from "@/provider/appContext";
import { useUpdateExternalIncomeTypeMutation } from "@/hooks/api/definitions/external-income/mutations/use-update-mutation";
import { useTranslations } from "next-intl";

interface IPropsCreateConsumetion {
  item: any;
}

const UpdateExternalIncomeType: React.FC<IPropsCreateConsumetion> = ({
  item,
}) => {
  const t = useTranslations("pages")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues:{
      name:item?.name
    }
  });
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const { setHandleError } = useContext(AppContext);

  const { mutate, isLoading } = useUpdateExternalIncomeTypeMutation();

  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
  };

  const onSubmitFunction = async (data: any) => {
    const variables = {
      name: data?.name,
      externalIncomeTypeId:item?._id
    };

    mutate(variables, {
      onSuccess: () => {
        setHandleError({
          open: true,
          message: t("income.external_income_type_updated_successfully"),
          status: "success",
        });
        setOpenDialog(false);
      },
      onError: (error: any) => {
        setHandleError({
          open: true,
          message: error.message,
          status: "error",
        });
      },
    });
  };

  return (
    <Box>
      <Dialog
        open={openDialog}
        onClose={handleOpenDialogFunction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        dir={t("dir")}
        fullWidth
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${theme.palette.grey[200]}`,
          }}
        >
          <Typography>{t("income.update_income")}</Typography>
          <IconButton size="medium" onClick={handleOpenDialogFunction}>
            <CloseSquare />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 36, pb: 5 }}>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <Grid container spacing={2} sx={{ mt: "1rem" }}>
              <Grid item xs={12}>
                <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }}>
                  {t("income.income_name")}
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  {...register("name", { required: true })}
                  name="name"
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "end", columnGap: "1rem" }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit(onSubmitFunction)}
            loading={isLoading}
          >
            {t("income.save")}
          </Button>
          <Button variant="outlined" onClick={handleOpenDialogFunction}>
            {t("income.cancel")}
          </Button>
        </DialogActions>
      </Dialog>

      <Box>
        <IconButton onClick={handleOpenDialogFunction}>
          <Edit color={theme.palette.grey["A700"]} size={25} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default UpdateExternalIncomeType;
