"use client";
import { Box, Pagination, Skeleton, Stack, Typography } from "@mui/material";
import { ProductItem } from "./product-item";
import { useTranslations } from "next-intl";
import { useGetAllSoldProductReportsQuery } from "@/hooks/api/products-reports/queries/use-get-all-sold-product-reports";
import React from "react";
import { useState } from "react";
import EmptyPage from "@/components/util/emptyPage";
import { EmptyProductPageIcon } from "@/icons";
import { useTheme } from "@mui/material/styles";
const TotalSalesContainer = () => {
  const [page, setPage] = useState(1);
  const theme = useTheme();
  const t = useTranslations("products_reports");

  const { data: soldProducts, isLoading: isLoadingSoldProducts, refetch } =
    useGetAllSoldProductReportsQuery({
      page: page,
      limit: 10,
    });
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    refetch();
  };

  if (soldProducts?.count === 0 && !isLoadingSoldProducts ){
    return (
        <Box height={"calc(100vh - 130px)"} display={"flex"} justifyContent={"center"} alignItems={"center"} bgcolor={theme.palette.background.default}>
        <EmptyPage
          icon={<EmptyProductPageIcon />}
          title={t("not_any_report_has_been_recorded_yet")}
          discription={""}

        />
      </Box>)
  }

  return (
    <Box>
      <Typography variant="h3" mb={2}>
        {t("total_sales_report")}
      </Typography>
      {isLoadingSoldProducts && (
        <Box>
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <Skeleton
                sx={{ marginTop: "1rem" , borderRadius:"1rem" }}
                variant="rectangular"
                width={"100%"}
                height={100}
                key={index}
              />
            ))}
        </Box>
      )}
      <Box rowGap={"1rem"} columnGap={"1rem"} display={"grid"} pt={2}>
        {soldProducts?.soldProducts?.map((product: any) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </Box>
      {soldProducts?.count > 9 && <Box
        display="flex"
        justifyContent={t("dir") === "rtl" ? "start" : "end"}
        mt={2}
        dir="ltr"
      >
        <Stack spacing={2} p={1}>
          <Pagination
            count={Math.ceil(soldProducts?.count / 10)}
            size={"medium"}
            shape="rounded"
            variant="outlined"
            color="primary"
            onChange={handleChangePage}
            sx={{
              fontSize: "2rem !important",
            }}
          />
        </Stack>
      </Box>}
    </Box>
  );
};

export default TotalSalesContainer;
