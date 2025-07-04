
import { useUpdateCategoryMutation } from "@/hooks/api/definitions/product-category/mutations/update-category";
import { AppContext } from "@/provider/appContext";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { InfoCircle, Trash } from "iconsax-react";
import { useTranslations } from "next-intl";
import { useContext, useState } from "react";

interface IPropsUpdate {

  id: string;
}
export const DeleteCategory = ({  id }: IPropsUpdate) => {
  const t = useTranslations("product")
  const theme = useTheme();
  const { setHandleError } = useContext(AppContext);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
  };
  const { mutate, isLoading } = useUpdateCategoryMutation();
  const onSubmitFunction = () => {
    mutate(
      {  categoryId: id },
      {
        onSuccess: () => {
          setHandleError({
            open: true,
            type: "success",
            message:t("this_category_updated_successfully"),
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
         <Trash color={theme.palette.grey["A700"]} size={25} />
      </IconButton>
      <Dialog
        open={openDialog}
        onClose={handleOpenDialogFunction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        dir={t("dir")}
      >
        <DialogContent>
          <Box
            display="flex"
            justifyContent={"start"}
            alignItems={"center"}
            columnGap={1}
            mt={1.5}
          >
            <InfoCircle color={theme.palette.warning.main} />
            <Typography variant="h5">
              {t("Are_you_sure_you_want_to_delete_this_category")}
            </Typography>
          </Box>
          <Box pt={1} sx={{ paddingInlineStart: "3rem" }}>
            <Typography variant="body1">
              {
                t("Once_this_category_is_deleted_you_will_no_longer_have_access_to_it")
              }
            </Typography>
          </Box>
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
            onClick={onSubmitFunction}
          >
            {t("yes")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
