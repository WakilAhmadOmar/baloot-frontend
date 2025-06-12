"use client";
import ConsumptionBox from "./ConsumptionBox";
import CreateConsumption from "./CreateConsumption";
import { useApolloClient } from "@apollo/client";
import { Box, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "@/provider/appContext";
import { DELETE_CONSUMPTION } from "@/graphql/mutation/DELETE_CONSUMPTION";
import { useGetConsumptionTypeQuery } from "@/hooks/api/definitions/consumption/queries/use-get-consumption-type";
import EmptyPage from "@/components/util/emptyPage";
import { EmptyProductPageIcon } from "@/icons";
import { SkeletonComponentBox } from "../../_Components/Skeleton-box";
import { useTranslations } from "next-intl";


const ConsumptionPage = () => {
  const t = useTranslations("pages")
  const { data: consumptionList, isLoading } = useGetConsumptionTypeQuery();
  
  return (
    <Box>
      <Typography variant="h3" mb={2}>
        {t("Expenses.Expenses")}
      </Typography>
      <Box
        mb={2}
        sx={{
          display: "flex",
        }}
      >
        <CreateConsumption  />
        {/* {productsState?.products?.length > 0 && (
          <Box bgcolor={"#FFF"}>
            <CustomSearch />
          </Box>
        )} */}
      </Box>
      <Box display={"flex"} flexWrap="wrap" columnGap={"1rem"} rowGap="1rem">
        {consumptionList?.map((item: any) => (
          <ConsumptionBox key={item?._id} item={item}  />
        ))}
        {isLoading && <SkeletonComponentBox />}
      </Box>

      {consumptionList?.length === 0 && !isLoading && (
        <Box className={"empty_page_content"}>
          <EmptyPage
            icon={<EmptyProductPageIcon />}
            // buttonText={t("Expenses.Add_New_Expense")}
            discription={t("Expenses.You_have_no_expenses")}
            // onClick={handleOpenDialogFunction}
            title={t("Expenses.No_Expenses_Recorded")}
          />
        </Box>
      )}
    </Box>
  );
};

export default ConsumptionPage;
