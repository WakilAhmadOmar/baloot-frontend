"use client"
import CurrencyComponent from "./List";
import { ADD_USER_CURRENCY } from "@/graphql/mutation/ADD_USER_CURRENCY";
import { DELETE_USER_CURRENCY } from "@/graphql/mutation/DELETE_USER_CURRENCY";
import { UPDATE_USER_CURRENCY } from "@/graphql/mutation/UPDATE_USER_CURRENCY";
import CircularProgressComponent from "@/components/loader/CircularProgressComponent";
import EmptyPage from "@/components/util/emptyPage";
import { getUserCurrenciesFunction } from "@/components/util/getUserCurrency";
import { useApolloClient } from "@apollo/client";
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
import { ArrowSwapVertical, CloseSquare, InfoCircle } from "iconsax-react";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "@/provider/appContext";
import { useTranslations } from "next-intl";
import { useGetUserCurrenciesQuery } from "@/hooks/api/currencies/queries/use-get-user-currencies";
import { CreateCurrency } from "./Create";


const DefinitionsCurrency = () => {
  const t = useTranslations("pages")
 
  const [loadingPage, setLoadingPage] = useState(true);
  const [baseCurrency, setBaseCurrency] = useState<any>(null);

  const {data:currencies , isLoading} = useGetUserCurrenciesQuery()
  const getBaseCurrencyFunction = async () => {
    setLoadingPage(true);

    const base = currencies?.filter(
      (item: any) => item.isBase
    );

    setBaseCurrency(base?.[0]);
    setLoadingPage(false);
  };
  useEffect(() => {
    if (currencies){
      getBaseCurrencyFunction();
    }
  }, [currencies]);


  return (
    <Box>
      {/* {loadingPage && <CircularProgressComponent />} */}
      
      
      
      {currencies?.length === 0 && loadingPage === false ? (
        <Box className={"empty_page_content"}>
          <EmptyPage
            // buttonText={t("currency.add_new_currency")}
            discription={t("currency.you_have_no_currency")}
            // onClick={handleOpenDialogFunction}
            title={t("currency.no_currency_registered")}
          />
        </Box>
      ) : (
        <Box>
          <Typography variant="h3" mb={3}>
            {t("currency.define_currency")}
          </Typography>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            mb={2}
          >
            <CreateCurrency />
            <Typography variant="h3">
              {t("currency.base_currency")} ({baseCurrency?.symbol})
            </Typography>
          </Box>
          <Box display={"flex"} flexWrap={"wrap"} columnGap={2} rowGap={2}>
            {currencies?.map((item:any) => {
              return (
                <Box key={item?._id} height={"100%"}>
                  <CurrencyComponent
                    item={item}
                    baseCurrency={baseCurrency}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default DefinitionsCurrency;

