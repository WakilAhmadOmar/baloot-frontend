import BankAutoComplete from "@/components/Auto/bankAutoComplete";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, IconButton, InputLabel, TextField, Typography, useTheme } from "@mui/material";
import { CloseSquare } from "iconsax-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";


export  function AddBankAccount (){

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [openDialog, setOpenDialog] = useState(false);
    const theme = useTheme();
    const t  = useTranslations("pages")

    const handleOpenDialogFunction = () => {
        setOpenDialog(!openDialog);
    };

    const onSubmitFunction = (data:any) => {
        // Handle form submission
    };  

    return (
        <div>
             <Box display={"grid"}>
                <Button variant="outlined" color="primary" onClick={handleOpenDialogFunction}>{t("settings.add_new_bank_account")}</Button>
             </Box>
             {/* add dialog box to add bank account */}
             <form onSubmit={handleSubmit(onSubmitFunction)}>
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
                px: 2,
                py: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: `1px solid ${theme.palette.grey[200]}`,
              }}
            >
              <Typography>{t("cash_receipt_from_customer")}</Typography>
              <IconButton size="medium" onClick={handleOpenDialogFunction}>
                <CloseSquare size={20} color="gray"/>
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid2 container spacing={2} mt={1}>
                <Grid2 size={12}>
                  <InputLabel
                    sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                    required
                    error={!!errors?.payerId}
                  >
                    {t("full_name_of_customer")}({t("payer")})
                  </InputLabel>
                  <BankAutoComplete name="payerId" dir={t("dir")} />
                  {errors?.payerId?.type === "optionality" && (
                    <Typography color="error" p={1}>
                      {/* {errors?.payerId?.message} */}
                    </Typography>
                  )}
                </Grid2>
                <Grid2  size={6}>
                  <InputLabel
                    sx={{ marginTop: "1rem", paddingBottom: "5px" }}
                    required
                    error={!!errors?.amount}
                  >
                    {t("received_amount")}
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    {...register("amount", { required: true })}
                    error={!!errors?.amount}
                  />
                  {!!errors?.amount && (
                    <Typography color="error" p={1}>
                      {/* {errors?.amount?.message} */}
                    </Typography>
                  )}
                </Grid2>
              
              </Grid2>
            </DialogContent>
            <DialogActions
              sx={{
                display: "flex",
                justifyContent: "start",
                columnGap: "1rem",
              }}
            >
              <Button
                color="primary"
                variant="contained"
                // type="submit"
                onClick={handleSubmit(onSubmitFunction)}
                // loading={isLoading}
              >
                {t("save")}
              </Button>
              <Button variant="outlined" onClick={handleOpenDialogFunction}>
                {t("cancel")}
              </Button>
            </DialogActions>
          </Dialog>
        </form>
        </div>
    );
};