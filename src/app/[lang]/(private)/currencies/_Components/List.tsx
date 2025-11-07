//create a commponent with name of CurrencyComponent
import {
  Box,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useTranslations } from "next-intl";
import { DeleteCurrency } from "./Delete";
import { UpdateCurrency } from "./Update";
import { useUpdateUserCurrencyStatusMutation } from "@/hooks/api/currencies/mutations/use-update-user-currency-status";
import { AppContext } from "@/provider/appContext";
import { DalyRateCurrency } from "./Daly-rate";



interface IPropsCurrency {
  item: any;
  baseCurrency: any;
}
const CurrencyComponent: React.FC<IPropsCurrency> = ({
  item,
  baseCurrency,
}) => {
  const t = useTranslations("pages");
  const theme = useTheme();
  const {setHandleError}  = useContext(AppContext)
  const [isActiveCurrency, setIsActiveCurrency] = useState(item?.isActive);
  const {mutate:updateUserCurrencyStatus} = useUpdateUserCurrencyStatusMutation()
 


  const handleChangeActiveAndDeActive = async (
    event: any,
    checked: boolean
  ) => {
    const variables = {
      currencyId: item?._id,
      isActive: checked,
    };
    updateUserCurrencyStatus(variables , {
      onSuccess:()=> {
        setIsActiveCurrency(!isActiveCurrency)
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
    <Card
      sx={{
        boxShadow: "none",
        borderRadius: "16px",
        width: "30rem",
        backgroundColor: theme.palette.background.default,
      }}
    >

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
                  fontSize: "1.8rem !important",
                  fontWeight: "700 !important",
                  lineHeight: "2rem",
                },
              }}
              label={item?.name}
              onChange={handleChangeActiveAndDeActive}
            />
          </FormGroup>
          <Typography variant="h5">{item?.symbol}</Typography>
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
            {t("currency.current_rate_in_base_currency")}
          </Typography>
          <Typography textAlign={"center"} variant="h3" p={1.5}>
            {item?.rate} = {baseCurrency?.symbol} {item?.baseRate}
          </Typography>
        </Box>
      </Box>
      <Box display={"grid"} padding={2}>
       
        <DalyRateCurrency item={item}  />
      </Box>
      <Box display={"flex"} justifyContent={"center"} columnGap={0.5} pb={1}>
        <UpdateCurrency item={item} />
        <DeleteCurrency isBase={item?.isBase} id={item?._id} />
      </Box>
    </Card>
  );
};

export default CurrencyComponent;
