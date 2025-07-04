import { useDeleteUserCurrencyMutation } from "@/hooks/api/currencies/mutations/use-delete-user-currency";
import { useUpdateUserCurrencyRateMutation } from "@/hooks/api/currencies/mutations/use-update-user-currency-rate";
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
  Slide,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { ArrowSwapVertical, CloseSquare, InfoCircle, Trash } from "iconsax-react";
import { useTranslations } from "next-intl";
import { forwardRef, useContext, useState } from "react";
import { useForm } from "react-hook-form";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type IPropsCUrrency = {
  item: any;

};
export function DalyRateCurrency({ item}: IPropsCUrrency) {
  const t = useTranslations("pages");
  const { setHandleError } = useContext(AppContext);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm({
      defaultValues:{
        rate:item?.rate,
        baseRate:item?.baseRate
      }
    });

   const {mutate:updateUserCurrencyRate} = useUpdateUserCurrencyRateMutation()
 
   const handleToDayPriceFunction = () => {
    setOpen(!open);
  }

    const onSubmitFunction = async (data: any) => {
    const variables = {
      currencyId: item?._id,
      rate: parseFloat(data?.rate),
      baseRate: parseFloat(data?.baseRate),
    };
    updateUserCurrencyRate(variables , {
      onSuccess:() => {
        setHandleError({
          open:true,
          status:"success",
          message:t("currency.currency_rate_successfully_updated")
        })
        setOpen(false);
      },
       onError:(error:any)=>{
        setHandleError({
          open:true,
          status:"error",
          message:error.message
        })
      }
    })
  };

  return (
    <Box>
      <Button
        variant="outlined"
        onClick={handleToDayPriceFunction}
        size="large"
        sx={{
          borderRadius: "0.8rem",
          fontSize: "1.4rem",
          fontWeight: 500,
          paddingTop: "1rem",
          paddingBottom: "1rem",
        }}
      >
        {t("currency.set_daily_price")}
      </Button>
     <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleToDayPriceFunction}
        aria-describedby="alert-dialog-slide-description"
        dir={t("dir")}
        fullWidth
        maxWidth={"sm"}
      >
        <DialogTitle
          sx={{
            borderBottom: `2px solid ${theme.palette.grey[100]}`,
            // pt: "5px",
            pb: "5px",
            textTransform: "none",
          }}
        >
          <Box
            display="flex"
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="button">
              {" "}
              {t("currency.daily_rate")}
              {/* {item?.name} */}
            </Typography>

            <IconButton onClick={handleToDayPriceFunction}>
              <CloseSquare />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ marginTop: "3rem" }}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "auto 8rem auto",
                    alignItems: "end",
                  }}
                >
                  <Box>
                    <InputLabel
                      sx={{ paddingBottom: "5px", marginTop: "5px" }}
                      required
                    >
                      {t("currency.daily_rate")} ({item?.name})
                    </InputLabel>
                    <TextField
                      fullWidth
                      size="small"
                      {...register("rate", { required: true })}
                      name="rate"
                      type="number"
                    />
                    {errors?.rate?.type === "required" && (
                      <Typography color="error" p={1}>
                        {t("currency.rate_is_required")}
                      </Typography>
                    )}
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    pb={0.5}
                  >
                    <ArrowSwapVertical
                      color={theme.palette.primary.main}
                      size={32}
                    />
                  </Box>
                  <Box>
                    <InputLabel
                      sx={{ paddingBottom: "5px", marginTop: "5px" }}
                      required
                    >
                      {t("currency.to")} 
                      {/* {baseCurrency?.symbol} */}
                       (
                      {t("currency.base_currency")})
                    </InputLabel>
                    <TextField
                      fullWidth
                      size="small"
                      {...register("baseRate", { required: true })}
                      name="baseRate"
                      type="number"
                    />
                    {errors?.baseRate?.type === "required" && (
                      <Typography color="error" p={1}>
                        {t("currency.rate_is_required")}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            columnGap: "1rem",
            borderTop: `2px solid ${theme.palette.grey[100]}`,
            padding: "1rem",
            height: "7rem",
          }}
        >
          <Button
            onClick={handleSubmit(onSubmitFunction)}
            variant="contained"
            color="primary"
          >
            {t("currency.save")}
          </Button>
          <Button onClick={handleToDayPriceFunction} variant="outlined">
            {t("currency.cancel")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
