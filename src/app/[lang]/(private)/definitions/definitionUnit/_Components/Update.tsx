import { useAddMeasureMutation } from "@/hooks/api/definitions/units/mutations/use-add-measure-mutation";
import { useUpdateMeasureMutation } from "@/hooks/api/definitions/units/mutations/use-update-mutation";
import { AppContext } from "@/provider/appContext";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputLabel,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { CloseSquare, Edit } from "iconsax-react";
import { useTranslations } from "next-intl";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

export function UpdateUnit({ item }: { item: any }) {
  const t = useTranslations("pages");
  const theme = useTheme();
  const { setHandleError } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: item?.name,
    },
  });
  const [openDialog, setOpenDialog] = useState(false);
  const { mutate, isLoading } = useUpdateMeasureMutation();

  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
  };
  const onSubmitFunction = (data: any) => {
    mutate(
      { measureId: item?._id, name: data?.name },
      {
        onSuccess: () => {
          setHandleError({
            message: t("unit.create_successfully"),
            status: "success",
            open: true,
          });
          handleOpenDialogFunction();
        },
        onError: (error: any) => {
          setHandleError({
            open: true,
            message: error?.message,
            status: "error",
          });
        },
      }
    );
  };
  return (
    <Box>
      <Box>
        <IconButton onClick={handleOpenDialogFunction}>
          <Edit color={theme.palette.grey["A700"]} size={25} />
        </IconButton>
      </Box>
      <Dialog
        open={openDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        dir="rtl"
        fullWidth
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            px: 2,
            py: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${theme.palette.grey[200]}`,
          }}
        >
          <Typography variant="button">
            {t("unit.update_unit")}({item?.name})
          </Typography>
          <IconButton size="medium" onClick={handleOpenDialogFunction}>
            <CloseSquare size={20} color="gray" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <Grid container spacing={2}>
              <Grid item xs={12} my={3}>
                <InputLabel
                  sx={{ paddingBottom: "5px", marginTop: "10px" }}
                  required
                  error={!!errors?.name}
                >
                  {t("unit.unit_name")}
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  {...register("name", { required: true })}
                  name="name"
                  error={!!errors?.name}
                />
                {errors?.name?.type === "required" && (
                  <Typography color="error" p={1}>
                    {t("unit.unit_name_is_required")}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "end", columnGap: "1rem" }}
        >
          <Button variant="outlined" onClick={handleOpenDialogFunction}>
            {t("unit.cancel")}
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit(onSubmitFunction)}
            loading={isLoading}
          >
            {t("unit.save")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
