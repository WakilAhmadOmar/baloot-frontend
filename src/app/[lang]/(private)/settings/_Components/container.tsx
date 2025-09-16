"use client"
import { Box, Divider, Grid, InputLabel, TextField, Typography, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { AddBankAccount } from "./add-bank-account";

export function  SettingsContainer() {
    const theme = useTheme();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  
  const onSubmit = (data: any) => {
    console.log("data", data);
  };
  return (
    <Box>
      <Typography variant="h3" pb={3}>
        پروفایل کمپنی
      </Typography>
      <Box
        sx={{
          bgcolor: theme.palette.background.default,
          borderRadius: "10px",
          padding: "2rem",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={2}></Grid>
            <Grid item xs={10}>
              <Grid container spacing={2}>
                <Grid item xs={6} mt={0.6}>
                  <InputLabel required sx={{ mb: "7px" }}>
                    نام شرکت
                  </InputLabel>
                  <TextField
                    {...register("customerPhoneNumber", { required: false })}
                    name="customerPhoneNumber"
                    fullWidth
                    size="small"
                  />
                  {errors.customer?.type === "required" && (
                    <Typography>نام مشتری حتمی است.</Typography>
                  )}
                </Grid>
                <Grid item xs={6} mt={0.6}>
                  <InputLabel sx={{ mb: "7px" }}>
                    نام شرکت به انگلیسی
                  </InputLabel>
                  <TextField
                    {...register("customerPhoneNumber", { required: false })}
                    name="customerPhoneNumber"
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} mt={0.6}>
                  <InputLabel sx={{ mb: "7px" }}>آدرس دفتر مرکزی</InputLabel>
                  <TextField
                    {...register("customerPhoneNumber", { required: false })}
                    name="customerPhoneNumber"
                    fullWidth
                    size="small"
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h5">مشخصات کمپنی</Typography>
            </Grid>
            <Grid item xs={12} mt={0.6}>
              <InputLabel required sx={{ mb: "7px" }}>
                توضیحات
              </InputLabel>
              <TextField
                {...register("customerPhoneNumber", { required: false })}
                name="customerPhoneNumber"
                fullWidth
                size="small"
                multiline
                minRows={4}
              />
              {errors.customer?.type === "required" && (
                <Typography>نام مشتری حتمی است.</Typography>
              )}
            </Grid>
            <Grid item xs={12} sx={{ mt: "2rem" }}>
              <Typography variant="h5"> شماره حساب های بانکی</Typography>
            </Grid>
            <Grid item xs={12} mt={0.6}>
              <AddBankAccount />
              </Grid>

            {/* <Grid item xs={6} mt={0.6}>
              <InputLabel required sx={{ mb: "7px" }}>
              عزیزی بانک
              </InputLabel>
              <TextField
                {...register("customerPhoneNumber", { required: false })}
                name="customerPhoneNumber"
                fullWidth
                size="small"
                
              />
              {errors.customer?.type === "required" && (
                <Typography>نام مشتری حتمی است.</Typography>
              )}
            </Grid>
            <Grid item xs={6} mt={0.6}>
              <InputLabel required sx={{ mb: "7px" }}>
              کابل بانک
              </InputLabel>
              <TextField
                {...register("customerPhoneNumber", { required: false })}
                name="customerPhoneNumber"
                fullWidth
                size="small"
                
              />
              {errors.customer?.type === "required" && (
                <Typography>نام مشتری حتمی است.</Typography>
              )}
            </Grid> */}
            <Divider orientation="horizontal" variant="fullWidth"/>

            <Grid item xs={12} sx={{ mt: "2rem" }}>
              <Typography variant="h5"> شماره حساب های بانکی</Typography>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

