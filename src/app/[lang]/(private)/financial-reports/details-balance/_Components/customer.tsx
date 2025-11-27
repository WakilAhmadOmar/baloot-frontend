import { useGetCalculateAllEmployeesLedgerBalanceQuery } from "@/hooks/api/financial-reports/queries/use-calculate-all-employees-ledger-balance";
import { Box, Pagination, Stack, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { buildColumns, ReportRow } from "./columns";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useGetCalculateAllCustomersLedgerBalanceQuery } from "@/hooks/api/financial-reports/queries/use-calculate-all-customers-ledger-balance";

export function CustomerContainer() {
  const theme = useTheme();
  const t = useTranslations("financial_reports");
  const [page, setPage] = useState(1);
  const { data: customer, refetch , isLoading } =
    useGetCalculateAllCustomersLedgerBalanceQuery({
      page: page,
      limit: 10,
    });

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
    refetch();
  };
  return (
    <Box>
      <Box maxWidth={"100%"}>
        <DataGrid
          rows={customer?.ledgerBalance?.map((item: ReportRow) => ({
            ...item,
            id: item?._id,
          }))}
          columns={buildColumns(t , "fullName")}
          hideFooterPagination
          rowSelection={false}
          hideFooter
          loading={isLoading}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.grey[300],
              borderBottom: `1px solid ${theme.palette.divider}`,
              height: 56,
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: 700,
              fontSize: "1.3rem",
            },
            "& .MuiDataGrid-cell": {
              fontSize: "1.5rem", // body cell size
            },
          }}
        />
      </Box>

      <Box display="flex" justifyContent={"end"} mt={2}>
        <Stack spacing={2} p={1}>
          <Pagination
            count={Math.ceil(customer?.totalCount / 10)}
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
      <Box
        display={"grid"}
        gridTemplateColumns={"6rem auto"}
        alignItems={"center"}
        mt={2}
      >
        <Typography variant="subtitle2">افغانی</Typography>
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
              موجودی دیبت
            </Typography>
            <Box bgcolor={"#FFF"} height={"100%"} p={1.5}>
              <Typography variant="subtitle2">8050</Typography>
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
              موجودی کریدت
            </Typography>
            <Box bgcolor={"#FFF"} height={"100%"} p={1.5}>
              <Typography variant="subtitle2">8050</Typography>
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
              الباقی
            </Typography>
            <Box bgcolor={"#FFF"} height={"100%"} p={1.5}>
              <Typography variant="subtitle2">8050</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        display={"grid"}
        gridTemplateColumns={"6rem auto"}
        alignItems={"center"}
        mt={2}
      >
        <Typography variant="subtitle2">دالر</Typography>
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
              موجودی دیبت
            </Typography>
            <Box bgcolor={"#FFF"} height={"100%"} p={1.5}>
              <Typography variant="subtitle2">8050</Typography>
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
              موجودی کریدت
            </Typography>
            <Box bgcolor={"#FFF"} height={"100%"} p={1.5}>
              <Typography variant="subtitle2">8050</Typography>
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
              الباقی
            </Typography>
            <Box bgcolor={"#FFF"} height={"100%"} p={1.5}>
              <Typography variant="subtitle2">8050</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
