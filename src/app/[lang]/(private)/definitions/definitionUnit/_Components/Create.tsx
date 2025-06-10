import { useAddMeasureMutation } from "@/hooks/api/definitions/units/mutations/use-add-measure-mutation";
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
import { CloseSquare } from "iconsax-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

export function Create({ t }: { t: any }) {
  const theme = useTheme();
  const {setHandleError}= useContext(AppContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [openDialog, setOpenDialog] = useState(false);
  const {mutate , isLoading} = useAddMeasureMutation()

  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog)
  };
  const onSubmitFunction = (data:any) => {
    mutate(data, {
      onSuccess: () => {
        setHandleError({
          message:t?.pages?.unit?.create_successfully,
          type: "success",
          open: true,
        });
        handleOpenDialogFunction()
      },
      onError: (error: any) => {
        setHandleError({
          open: true,
          message: error?.message,
          type: "error",
        });
      },
    });

  };
  return (
    <Box>
      <Box
        display={"grid"}
        gridTemplateColumns={"auto 30%"}
        justifyContent={"space-between"}
        mb={2}
      >
        <Button variant="contained" onClick={handleOpenDialogFunction}>
          {t?.pages?.unit?.add_new_unit}
        </Button>
      </Box>
      <Dialog
        open={openDialog}
        onClose={handleOpenDialogFunction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        dir="rtl"
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
          <Typography variant="button">{t?.pages?.unit?.new_unit}</Typography>
          <IconButton size="medium" onClick={handleOpenDialogFunction}>
            <CloseSquare />
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
                  {t?.pages?.unit?.unit_name}
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
                    {t?.pages?.unit?.unit_name_is_required}
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
            {t?.pages?.unit?.cancel}
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit(onSubmitFunction)}
            loading={isLoading}
          >
            {t?.pages?.unit?.save}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
