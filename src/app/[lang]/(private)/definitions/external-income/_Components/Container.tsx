"use client";
import CreateExternalIncomeType from "./Create";
import { Box, Typography } from "@mui/material";
import { useGetExternalIncomeTypeListQuery } from "@/hooks/api/definitions/external-income/queries/use-get-external-income-type";
import ExternalIncomeBox from "./external-income-cart";
import EmptyPage from "@/components/util/emptyPage";
import { EmptyProductPageIcon } from "@/icons";
import { SkeletonComponentBox } from "../../_Components/Skeleton-box";
import { useTranslations } from "next-intl";

const ExternalIncomePage = () => {
  const t = useTranslations("pages");

  const { data: incomeList, isLoading } = useGetExternalIncomeTypeListQuery();

  return (
    <Box>
      <Typography variant="h3" mb={2}>
        {t("income.external_income")}
      </Typography>

      <Box
        mb={2}
        sx={{
          display: "flex",
        }}
      >
        <CreateExternalIncomeType />
        {/* {productsState?.products?.length > 0 && (
          <Box bgcolor={"#FFF"}>
            <CustomSearch />
          </Box>
        )} */}
      </Box>
      <Box display={"flex"} flexWrap="wrap" columnGap={"1rem"} rowGap="1rem">
        {incomeList?.map((item: any) => (
          <ExternalIncomeBox key={item?._id} item={item} />
        ))}
        {isLoading && <SkeletonComponentBox />}
      </Box>
      {incomeList?.length === 0 && !isLoading && (
        <Box className={"empty_page_content"}>
          <EmptyPage
            icon={<EmptyProductPageIcon />}
            title={t("income.no_external_income_recorded")}
            discription={t("income.no_income_description")}
            // onClick={handleOpenDialogFunction}
            // buttonText={t("income.add_new_external_income")}
          />
        </Box>
      )}
    </Box>
  );
};

export default ExternalIncomePage;
