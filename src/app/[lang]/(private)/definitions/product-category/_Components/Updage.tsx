
import { useUpdateCategoryMutation } from "@/hooks/api/definitions/product-category/mutations/update-category";
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

interface IPropsUpdate {

  item: any;
}
export const UpdateCategory = ({  item }: IPropsUpdate) => {
  const t = useTranslations("product")
  const theme = useTheme();
  const { setHandleError } = useContext(AppContext);
  const [openDialog, setOpenDialog] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: item?.name,
    },
  });
  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
  };
  const { mutate, isLoading } = useUpdateCategoryMutation();
  const onSubmitFunction = (data: any) => {
    mutate(
      { name: data?.name, categoryId: item?._id },
      {
        onSuccess: () => {
          setHandleError({
            open: true,
            type: "success",
            message: t("this_category_updated_successfully"),
          });
          setOpenDialog(false);
        },
        onError: (error: any) => {
          setHandleError({
            open: true,
            type: "error",
            message: error?.message,
          });
        },
      }
    );
  };
  return (
    <Box>
      <IconButton onClick={handleOpenDialogFunction}>
        <Edit color={theme.palette.grey["A700"]} size={25} />
      </IconButton>
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
          <Typography variant="button">
            {t("update_category")}
          </Typography>
          <IconButton size="medium" onClick={handleOpenDialogFunction}>
            <CloseSquare />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <Grid container spacing={2} sx={{ mt: "1rem" }}>
              <Grid item xs={12}>
                <InputLabel
                  sx={{ paddingBottom: "5px", marginTop: "10px" }}
                  required
                >
                  {t("category_name")}
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  {...register("name", { required: true })}
                  name="name"
                />
                {errors?.name?.type === "required" && (
                  <Typography color="error" p={1}>
                    نام دسته بندی حتمی است
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
            {t("cancel")}
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit(onSubmitFunction)}
            loading={isLoading}
          >
            {t("save")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
