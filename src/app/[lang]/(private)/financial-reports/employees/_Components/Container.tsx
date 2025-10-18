"use client";
import CustomSearch from "@/components/search/CustomSearch";
import { useGetEmployeeListQuery } from "@/hooks/api/definitions/employee/queries/use-get-employee-list-query";
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
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";
import SkeletonComponent from "../../_components/Skeleton";
import { EmptyComponent } from "../../_components/empty";
import { useGetEmployeeTransactionBalanceByEmployeeIdQuery } from "@/hooks/api/definitions/employee/queries/use-get-employee-transaction-balance-by-employee-id";

interface IPropsCollapseContainer {
  lang: "en" | "fa";
}
const CustomerFinancialReports: React.FC<IPropsCollapseContainer> = ({
  lang,
}) => {
  const theme = useTheme();
  const t = useTranslations("financial_reports");
  const [page, setPage] = useState(1);
  const { data: employeeList, isLoading } = useGetEmployeeListQuery({ page });


  const handleChangePagination = (event: any, page: number) => {
    setPage(page);
  };
  return (
    <Box>
      <Typography variant="h3">{t("employees_reports")}</Typography>
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
      {!isLoading && employeeList?.count === 0 && (
        <EmptyComponent text={t("no_statements_have_been_recorded")} />
      )}
      {employeeList?.employee?.map((item: any) => (
        <Link
          href={
            "/" +
            lang +
            "/financial-reports/employees/" +
            item?._id +
            "?name=" +
            item?.name
          }
          id={item?._id}
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
            <Typography variant="h5"> {item?.name}</Typography>
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
                {item?.phoneNumber}{" "}
              </Typography>
              {/* <AddCircle color={theme.palette.primary.main} size={20}/> */}
            </Box>
          </Box>
        </Link>
      ))}

      {employeeList?.count > 9 && (
        <Stack
          spacing={2}
          sx={{ justifyContent: "end", display: "grid", marginTop: "2rem" }}
        >
          {/* <Pagination count={10} shape="rounded" /> */}
          <Pagination
            count={Math.ceil(employeeList?.count / 10)}
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
