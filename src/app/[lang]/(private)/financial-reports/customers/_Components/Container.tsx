"use client";
import CustomSearch from "@/components/search/CustomSearch";
import { useGetCustomerListQuery } from "@/hooks/api/definitions/customer/queries/use-get-customer-list-query";
import {
  Box,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { AddCircle, ExportSquare, MinusCirlce, Printer } from "iconsax-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";
import SkeletonComponent from "../../_components/Skeleton";
import { useTranslations } from "next-intl";
import { EmptyComponent } from "../../_components/empty";

type CustomerFunctionReportsIProps = {
  lang: "en" | "fa";
};

const CustomerFinancialReports: React.FC<CustomerFunctionReportsIProps> = ({
  lang,
}) => {
  const t = useTranslations("financial_reports");
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const { data: customerList, isLoading , refetch } = useGetCustomerListQuery({ page });

const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    refetch();
  };
  return (
    <Box>
      <Typography variant="h3"> {t("customers_reports")}</Typography>
      <Box
        display={"flex"}
        columnGap={"1rem"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        mb={2}
        mt={2}
      >
        <Box display={"flex"} justifyItems={"center"}>
          {/* <DateRangePickerComponent /> */}
        </Box>
        <Box pt={1}>{/* <CustomSearch  /> */}</Box>
      </Box>
      {isLoading && <SkeletonComponent />}
      {!isLoading && customerList?.count === 0 && (
        <EmptyComponent text={t("no_statements_have_been_recorded")} />
      )}
      {customerList?.customer?.map((item: any) => (
        <Link
          href={
            "/" +
            lang +
            "/financial-reports/customers/" +
            item?._id +
            "?name=" +
            item?.fullName
          }
          key={item?._id}
        >
          <Box
            sx={{
              bgcolor: theme.palette.background.default,
              display: "flex",
              justifyContent: "space-between",
              borderRadius: "8px",
              alignItems: "center",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: theme.palette.grey[100],
              },
            }}
            pl={2}
            pr={2}
            pt={2.5}
            pb={2.5}
            m={0.5}
          >
            <Typography variant="h5">{item?.fullName}</Typography>
            <Box
              display={"flex"}
              alignItems={"center"}
              gap={"1rem"}
              alignContent={"center"}
            >
              <Typography
                variant="body1"
                justifySelf={"center"}
                my={"auto"}
                display={"flex"}
              >
                {item?.contactNumber}
              </Typography>
              {/* <AddCircle color={theme.palette.primary.main} size={20}/> */}
            </Box>
          </Box>
        </Link>
      ))}

      {customerList?.count > 9 && (
        <Stack
          spacing={2}
          sx={{ justifyContent: "end", display: "grid", marginTop: "2rem" }}
        >
          <Pagination
            count={Math.ceil(customerList?.count / 10)}
            variant="outlined"
            shape="rounded"
            color={"primary"}
            onChange={handleChangePagination}
          />
        </Stack>
      )}
    </Box>
  );
};
export default CustomerFinancialReports;
