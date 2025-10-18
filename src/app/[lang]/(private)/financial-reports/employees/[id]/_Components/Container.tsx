"use client";
import { useGetEmployeeReportsByEmployeeIdListQuery } from "@/hooks/api/definitions/employee/queries/use-get-employee-report-by-id";
// import DateRangePickerComponent from "@/components/muiComponent/dateRangePickerComponent";
// import CustomSearch from "@/components/muiComponent/search";
import {
  Box,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { ArrowRight2, ExportSquare, Printer } from "iconsax-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import Moment from "react-moment";
import SkeletonComponent from "../../../_components/Skeleton";
import { EmptyComponent } from "../../../_components/empty";
import { useGetEmployeeTransactionBalanceByEmployeeIdQuery } from "@/hooks/api/definitions/employee/queries/use-get-employee-transaction-balance-by-employee-id";

interface IPropsDetailsOfAccountEmployeePage {
  id: string;
}

const DetailsOfAccountEmployeePage = ({
  id,
}: IPropsDetailsOfAccountEmployeePage) => {
  const theme = useTheme();
  const t = useTranslations("financial_reports");
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  const { data: employeeReport, isLoading } =
    useGetEmployeeReportsByEmployeeIdListQuery({ page: 1, employeeId: id });
      const { data: employeeBalance, isLoading: loadingBalance } =
      useGetEmployeeTransactionBalanceByEmployeeIdQuery({ employeeId: id });
  const handleBackFunction = () => {
    // router.push({ pathname: "/financialReports/employeeAccounts" });
  };
  return (
    <Box>
      <Box
        display={"flex"}
        columnGap={2}
        alignItems={"center"}
        sx={{ cursor: "pointer" }}
        onClick={handleBackFunction}
      >
        <ArrowRight2 size={20} />
        <Typography variant="h3">
          {" "}
          {t("financial_statement")} ({name})
        </Typography>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          columnGap={"10px"}
          minWidth={"20rem"}
        >
          <InputLabel>ارز</InputLabel>
          <Select
            size="small"
            value={1}
            sx={{ bgcolor: theme.palette.background.default }}
          >
            <MenuItem value={1}>همه</MenuItem>
            <MenuItem>دالر</MenuItem>
            <MenuItem>افغانی</MenuItem>
          </Select>
        </Box>
        <Box
          display={"flex"}
          columnGap={"1rem"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          mb={2}
          mt={2}
        >
          <Box display={"flex"} columnGap={"2rem"} alignItems={"center"}>
            <IconButton>
              <ExportSquare color={theme.palette.primary.main} />
            </IconButton>
            <IconButton>
              <Printer color={theme.palette.primary.main} />
            </IconButton>
            {/* <CustomSearch /> */}
          </Box>
          <Box display={"flex"} justifyItems={"center"}>
            {/* <DateRangePickerComponent /> */}
          </Box>
          <Box pt={1}>
            {/* <CustomSearch getTextSearchFunction={() => {}} /> */}
          </Box>
        </Box>
      </Box>
      <Box>
        {isLoading && <SkeletonComponent />}
        {!isLoading && employeeReport?.count === 0 && (
          <EmptyComponent text={t("no_statements_have_been_recorded")} />
        )}

        {employeeReport?.count > 0 && (
          <TableContainer component={Paper}>
            <Table
              sx={{
                minWidth: 650,
                fontWeight: 400,
                fontSize: "1.4rem",
                boxShadow: "none",
              }}
              aria-label="simple table"
            >
              <TableHead sx={{ bgcolor: theme.palette.background.default }}>
                <TableRow>
                  <TableCell align="right" width={"20%"}>
                    {t("description")}
                  </TableCell>
                  <TableCell align="right">{t("debit")}</TableCell>
                  <TableCell align="right">{t("credit")}</TableCell>
                  {/* <TableCell align="right">الباقی</TableCell> */}
                  <TableCell align="right">{t("currency")}</TableCell>
                  <TableCell align="right">
                    {t("calculated_currency")}
                  </TableCell>
                  <TableCell align="right">{t("date")}</TableCell>
                </TableRow>
              </TableHead>
              {employeeReport?.list?.map((item: any) => (
                <TableBody key={item?._id}>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">
                      {item?.billId?.__typename === "SellBill" &&
                        " فاکتور فروش"}
                    </TableCell>
                    <TableCell align="right">
                      {item?.receiverType ? item?.amount : 0}
                    </TableCell>
                    <TableCell align="right">
                      {item?.payerType ? item?.amount : 0}
                    </TableCell>

                    <TableCell align="right">
                      {item?.currencyId?.name}{" "}
                    </TableCell>
                    <TableCell align="right">
                      {item?.calculatedTo ? item?.calculatedTo.name : "-"}{" "}
                    </TableCell>
                    <TableCell align="right">
                      <Moment format="YYYY/MM/DD">{item?.createdAt}</Moment>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table>
          </TableContainer>
        )}
      </Box>
      <Box display="flex" justifyContent={"end"} mt={2}>
        {employeeReport?.count > 9 && (
          <Stack spacing={2} p={1}>
            <Pagination
              count={Math.ceil(employeeReport?.count / 10)}
              size={"medium"}
              shape="rounded"
              variant="outlined"
              color="primary"
              // onChange={handleChangePage}
              sx={{
                fontSize: "2rem !important",
              }}
            />
          </Stack>
        )}
      </Box>
      {employeeBalance?.map((item:any) => (
      <Box
        display={"grid"}
        gridTemplateColumns={"12rem auto"}
        alignItems={"center"}
        mt={2}
        key={item?.currencyId?._id}
      >
        <Typography variant="subtitle2">{item?.currencyId?.name}</Typography>
        <Box
          display={"grid"}
          gridTemplateColumns={"32.5% 32.5% 32.5%"}
          justifyContent={"space-between"}
        >
          <Box
            display={"grid"}
            gridTemplateColumns={"50% 50%"}
            alignItems={"center"}
            sx={{
              border: `1px solid ${theme.palette.grey[200]}`,
              overflow: "hidden",
            }}
            borderRadius={"8px"}
          >
            <Typography p={1.5} variant="subtitle2">
              {t("debit_balance")}
            </Typography>
            <Box
              bgcolor={theme.palette.background.default}
              height={"100%"}
              p={1.5}
            >
              <Typography variant="subtitle2">{item?.debitAmount || 0 }</Typography>
            </Box>
          </Box>
          <Box
            display={"grid"}
            gridTemplateColumns={"50% 50%"}
            alignItems={"center"}
            sx={{
              border: `1px solid ${theme.palette.grey[200]}`,
              overflow: "hidden",
            }}
            borderRadius={"8px"}
          >
            <Typography p={1.5} variant="subtitle2">
              {t("credit_balance")}
            </Typography>
            <Box
              bgcolor={theme.palette.background.default}
              height={"100%"}
              p={1.5}
            >
              <Typography variant="subtitle2">{item?.creditAmount || 0}</Typography>
            </Box>
          </Box>
          <Box
            display={"grid"}
            gridTemplateColumns={"50% 50%"}
            alignItems={"center"}
            sx={{
              border: `1px solid ${theme.palette.grey[200]}`,
              overflow: "hidden",
            }}
            borderRadius={"8px"}
          >
            <Typography p={1.5} variant="subtitle2">
               {t("total_remaining")}
            </Typography>
            <Box
              bgcolor={theme.palette.background.default}
              height={"100%"}
              p={1.5}
            >
              <Typography variant="subtitle2">{item?.debitAmount - (item?.creditAmount || 0)}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      ))}
    </Box>
  );
};

export default DetailsOfAccountEmployeePage;
