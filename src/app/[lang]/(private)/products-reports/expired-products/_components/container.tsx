"use client";
import { useGetAllEntrepotsValidProductsQuery } from "@/hooks/api/products-reports/queries/use-get-all-entrepots-valid-products";
// import DateRangePickerComponent from "@/components/muiComponent/dateRangePickerComponent";
// import CustomSearch from "@/components/muiComponent/search";
import {
  Box,
  IconButton,
  Pagination,
  Stack,
  Typography,
  useTheme,
  Card,
} from "@mui/material";
import {  ExportSquare, Printer } from "iconsax-react";
import { useTranslations } from "next-intl";
import { DataGrid } from "@mui/x-data-grid";
import { buildColumns, Product } from "./columns";
import { useState } from "react";
import { useGetAllEntrepotsExpiredProductsQuery } from "@/hooks/api/products-reports/queries/use-get-all-entrepots-expired-products";

export const ProductReportsExpiredProductsContainer = () => {
  const theme = useTheme();
  const t = useTranslations("products_reports");
  const tableStyle = {
    "& .MuiDataGrid-columnHeaders": {
      // backgroundColor: theme.palette.grey[300],
      borderBottom: `1px solid ${theme.palette.divider}`,
      // height: 56,
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      fontWeight: 700,
      fontSize: "1.3rem",
    },
  };
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useGetAllEntrepotsExpiredProductsQuery({
    page: page,
  });
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    refetch();
  };
  return (
    <Box>
      <Box pb={3}>
        <Typography variant="h3" pb={3}>
          {t("report_of_expired_products")}
        </Typography>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          {/* <Box
            display={"grid"}
            // columnGap={"1rem"}
            alignItems={"center"}
            width={"30rem"}
            gridTemplateColumns={"7rem auto"}
          >
            <Typography
              variant="subtitle2"
              component={"div"}
              width={"fit-content"}
            >
              گدام ها
            </Typography>
            <Box width={"100%"}>
              <Select
                sx={{
                  bgcolor: "#FFF",
                }}
                size="small"
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                // onChange={handleChange}
              >
                <MenuItem value={10}>همه</MenuItem>
                <MenuItem value={20}>گدام مرکزی</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </Box>
          </Box> */}

          <Box display={"flex"} columnGap={"2rem"} alignItems={"center"}>
            <IconButton>
              <ExportSquare color={theme.palette.primary.main} />
            </IconButton>
            <IconButton>
              <Printer color={theme.palette.primary.main} />
            </IconButton>
            <Box display={"flex"} alignItems={"center"}>
              {/* <DateRangePickerComponent /> */}
            </Box>
            {/* <CustomSearch /> */}
          </Box>
        </Box>
      </Box>
      <Box>
        <Card sx={{backgroundColor: theme.palette.background.paper}}>
        <DataGrid
          rows={data?.product?.map((item: Product) => ({
            ...item,
            id: item?._id,
          }))}
          columns={buildColumns(t)}
          hideFooterPagination
          rowSelection={false}
          hideFooter
          loading={isLoading}
          sx={tableStyle}
        />
      </Card>
      </Box>
      <Box
        display="flex"
        justifyContent={t("dir") === "rtl" ? "start" : "end"}
        mt={2}
        dir="ltr"
      >
        <Stack spacing={2} p={1}>
          <Pagination
            count={Math.ceil(data?.totalCount / 10)}
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
      </Box>
    </Box>
  );
};
