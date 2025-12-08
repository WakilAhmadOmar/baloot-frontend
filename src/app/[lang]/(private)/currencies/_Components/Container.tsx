"use client"
import CurrencyComponent from "./List";
import EmptyPage from "@/components/util/emptyPage";
import {
  Box,
  Typography,

} from "@mui/material";
import {  useEffect, useState } from "react";
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

  if (currencies?.length === 0 && !isLoading){
    return (
      <Box className={"empty_page_content"}>
        <EmptyPage
          discription={t("currency.you_have_no_currency")}
          title={t("currency.no_currency_registered")}
        />
      </Box>
    )
  }

  return (
    <Box>

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

    </Box>
  );
};
export default DefinitionsCurrency;

