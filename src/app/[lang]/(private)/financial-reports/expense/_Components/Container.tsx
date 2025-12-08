"use client";
import { useGetConsumptionListQuery } from "@/hooks/api/transactions/queries/use-get-consumption-list";
// import DateRangePickerComponent from "@/components/muiComponent/dateRangePickerComponent";
// import CustomSearch from "@/components/muiComponent/search";
import {
  Box,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Card,
  useTheme,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Moment from "react-moment";
import SkeletonComponent from "../../_components/Skeleton";
import { EmptyComponent } from "../../_components/empty";
import { useGetConsumptionReportQuery } from "@/hooks/api/definitions/consumption/queries/use-get-consumption-report";

const ExpensesAccountsPage = () => {
  const theme = useTheme();
  const t = useTranslations("financial_reports");
  const [page, setPage] = useState(1);
  const {
    data: consumptionList,
    isLoading,
    refetch,
  } = useGetConsumptionListQuery({
    page,
  });
  const { data: consumptionReport, isLoading: isLoadingConsumption } =
    useGetConsumptionReportQuery();
  const handleChangePage = (event: any, page: number) => {
    setPage(page);
    refetch();
  };
  return (
    <Box>
      <Typography variant="h3">{t("expense_reports")}</Typography>
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
        <Box pt={1}>
          {/* <CustomSearch getTextSearchFunction={() => {}} /> */}
        </Box>
      </Box>
      <Card  sx={{backgroundColor: theme.palette.background.paper}}>
        {isLoading && <SkeletonComponent />}
        {!isLoading && consumptionList?.count === 0 && (
          <EmptyComponent text={t("no_statements_have_been_recorded")} />
        )}
        {consumptionList?.count > 0 && (
          <TableContainer component={"div"}>
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
                    {t("payer_name")}
                  </TableCell>
                  <TableCell align="right">{t("description")}</TableCell>
                  <TableCell align="right">{t("amount")}</TableCell>
                  <TableCell align="right">{t("currency")}</TableCell>
                  <TableCell align="right">{t("consumption_type")}</TableCell>
                  <TableCell align="right">{t("date")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {rows.map((row) => ( */}

                {consumptionList?.consumption?.map((item: any) => (
                  <TableRow
                    // key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{item?.payer?.name}</TableCell>
                    <TableCell align="right">{item?.description}</TableCell>
                    <TableCell align="right">{item?.amount}</TableCell>
                    <TableCell align="right">
                      {item?.currencyId?.name}
                    </TableCell>
                    <TableCell align="right">
                      {item?.consumptionTypeId?.name}{" "}
                    </TableCell>
                    <TableCell align="right">
                      <Moment format="YYYY/MM/DD">{item?.createdAt}</Moment>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>
      {consumptionList?.count > 9 && (
        <Box display="flex" justifyContent={"end"} mt={2}>
          <Stack spacing={2} p={1}>
            <Pagination
              count={Math.ceil(consumptionList?.count / 10)}
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
      )}
      <Box>
        {consumptionReport?.map((item: any) => (
          <Box
            display={"grid"}
            gridTemplateColumns={"12rem auto"}
            alignItems={"center"}
            mt={2}
            key={item?.currencyId?._id}
          >
            <Typography variant="subtitle2" >
              {item?.currencyId?.name}
            </Typography>
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
                 {t("consumption_amount")}
                </Typography>
                <Box
                  bgcolor={theme.palette.background.default}
                  height={"100%"}
                  p={1.5}
                >
                  <Typography variant="subtitle2">
                    {item?.totalAmount || 0}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ExpensesAccountsPage;
ExpensesAccountsPage.requireAuth = true;
