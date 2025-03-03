//create a commponent with name of CurrencyComponent

import { useApolloClient } from "@apollo/client";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  Slide,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { ArrowSwapVertical, CloseSquare, Edit, Trash } from "iconsax-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { UPDATE_USER_CURRENCY_STATUS } from "@/graphql/mutation/UPDATE_USER_CURRENCY_STATUS";
import { UPDATE_USER_CURRENCY_RATE } from "@/graphql/mutation/UPDATE_USER_CURRENCY_RATE";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IPropsCurrency {
  item: any;
  onUpdate: (item: any) => void;
  onUpdateRate: (item: any) => void;
  onDelete: (id: string) => void;
  t: any;
}
const CurrencyComponent: React.FC<IPropsCurrency> = ({
  item,
  onUpdate,
  onUpdateRate,
  onDelete,
  t,
}) => {
  const theme = useTheme();
  const client = useApolloClient();
  const [open, setOpen] = React.useState(false);
  const [isActiveCurrency, setIsActiveCurrency] = useState(item?.isActive);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    setValue,
    getFieldState,
  } = useForm();
  const [updateCurrency, setUpdateCurrency] = useState(false);

  const handleClickOpen = () => {
    setUpdateCurrency(false);
    setOpen(!open);
  };
  const handleChangeActiveAndDeActive = async (
    event: any,
    checked: boolean
  ) => {
    try {
      const variables = {
        currencyId: item?._id,
        isActive: checked,
      };
      const {
        data: { updateUserCurrencyStatus },
      } = await client.mutate({
        mutation: UPDATE_USER_CURRENCY_STATUS,
        variables,
      });
      setIsActiveCurrency(updateUserCurrencyStatus?.isActive);
    } catch (error: any) {
      console.log("error", error.message);
    }
  };
  const handleToDayPriceFunction = () => {
    setValue("rate", item?.rate);
    setValue("baseRate", item?.baseRate);
    setOpen(!open);
  };
  const updateCurrencyFunction = () => {
    // setUpdateCurrency(true);
    // setOpen(!open);
    if (onUpdate) {
      onUpdate(item);
    }
  };
  const onSubmitFunction = async (data: any) => {
    try {
      const variables = {
        currencyId: item?._id,
        rate: parseFloat(data?.rate),
        baseRate: parseFloat(data?.baseRate),
      };
      const {
        data: { updateUserCurrencyRate },
      } = await client.mutate({
        mutation: UPDATE_USER_CURRENCY_RATE,
        variables,
      });
      if (updateUserCurrencyRate?._id && onUpdateRate) {
        onUpdateRate(updateUserCurrencyRate);
        setOpen(false);
      }
    } catch (error: any) {
      console.log("error", error.message);
    }
  };

  const onClickDelteButton = () => {
    if (onDelete) onDelete(item?._id);
  };
  return (
    <Card
      sx={{
        boxShadow: "none",
        borderRadius: "16px",
        width: "30rem",
        backgroundColor: theme.palette.grey[50],
      }}
    >
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClickOpen}
        aria-describedby="alert-dialog-slide-description"
        dir={t?.home?.dir}
        fullWidth
        maxWidth={updateCurrency ? "sm" : "sm"}
      >
        <DialogTitle
          sx={{
            borderBottom: `2px solid ${theme.palette.grey[100]}`,
            pt: "5px",
            pb: "5px",
          }}
        >
          <Box
            display="flex"
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="button">
              {" "}
              {t?.pages?.currency?.daily_rate}
              {item?.name}
            </Typography>

            <IconButton onClick={handleClickOpen}>
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
                      {t?.pages?.currency?.daily_rate}
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
                        {t?.pages?.currency?.rate_is_required}
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
                      {t?.pages?.currency?.to} (
                      {t?.pages?.currency?.base_currency})
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
                        {t?.pages?.currency?.rate_is_required}
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
            {t?.pages?.currency?.save}
          </Button>
          <Button onClick={handleClickOpen} variant="outlined">
            {t?.pages?.currency?.cancel}
          </Button>
        </DialogActions>
      </Dialog>
      <Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          columnGap={"2rem"}
          alignItems={"center"}
          pt={2}
          sx={{ paddingInlineEnd: "8px" }}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isActiveCurrency}
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 22 } }}
                />
              }
              sx={{
                marginLeft: "0px",
                marginRight: "0px",
                "& .MuiTypography-body1": {
                  fontSize: "2.4rem !important",
                  fontWeight: "700 !important",
                  lineHeight: "2.2rem",
                },
              }}
              label={item?.name}
              onChange={handleChangeActiveAndDeActive}
            />
          </FormGroup>
          <Typography variant="h3">{item?.symbol}</Typography>
        </Box>
        <Box
        // sx={{
        //   cursor: "pointer",
        // }}
        >
          <Typography
            variant="h5"
            color={theme.palette.grey[500]}
            p={1}
            pt={2}
            textAlign={"center"}
          >
            {t?.pages?.currency?.current_rate_in_base_currency}
          </Typography>
          <Typography textAlign={"center"} variant="h3" p={1.5}>
            {item?.baseRate}
          </Typography>
        </Box>
      </Box>
      <Box display={"grid"} padding={2}>
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
          {t?.pages?.currency?.set_daily_price}
        </Button>
      </Box>
      <Box display={"flex"} justifyContent={"center"} columnGap={0.5} pb={1}>
        <IconButton onClick={updateCurrencyFunction} size="large">
          <Edit size={20} color={theme.palette.primary.main} />
        </IconButton>
        <IconButton size="large" onClick={onClickDelteButton}>
          <Trash size={20} color={theme.palette.primary.main} />
        </IconButton>
      </Box>
    </Card>
  );
};

export default CurrencyComponent;
