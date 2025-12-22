"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box, Card, Pagination, Stack, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { Journal, journalColumns } from "./columns";

export const journals: Journal[] = [
  {
    id: "1",
    payer: "Company A",
    description: "Office rent payment",
    currency: "USD",
    amount: 1200,
    receiver: "Landlord",
    created_at: "2025-01-01",
  },
  {
    id: "2",
    payer: "Company A",
    description: "Internet service",
    currency: "USD",
    amount: 80,
    receiver: "ISP Provider",
    created_at: "2025-01-03",
  },
  {
    id: "3",
    payer: "Company B",
    description: "Electricity bill",
    currency: "USD",
    amount: 230,
    receiver: "Power Company",
    created_at: "2025-01-05",
  },
  {
    id: "4",
    payer: "Company B",
    description: "Office supplies",
    currency: "USD",
    amount: 150,
    receiver: "Stationery Store",
    created_at: "2025-01-07",
  },
  {
    id: "5",
    payer: "Company C",
    description: "Employee salary",
    currency: "USD",
    amount: 2000,
    receiver: "John Doe",
    created_at: "2025-01-10",
  },
  {
    id: "6",
    payer: "Company C",
    description: "Software subscription",
    currency: "USD",
    amount: 99,
    receiver: "SaaS Provider",
    created_at: "2025-01-12",
  },
  {
    id: "7",
    payer: "Company A",
    description: "Marketing campaign",
    currency: "USD",
    amount: 500,
    receiver: "Ad Agency",
    created_at: "2025-01-15",
  },
  {
    id: "8",
    payer: "Company D",
    description: "Consulting fee",
    currency: "USD",
    amount: 750,
    receiver: "Consultant",
    created_at: "2025-01-18",
  },
  {
    id: "9",
    payer: "Company D",
    description: "Travel expenses",
    currency: "USD",
    amount: 320,
    receiver: "Travel Agency",
    created_at: "2025-01-20",
  },
  {
    id: "10",
    payer: "Company A",
    description: "Equipment purchase",
    currency: "USD",
    amount: 1800,
    receiver: "Electronics Store",
    created_at: "2025-01-22",
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  const t = useTranslations("pages");
  const theme = useTheme();
  const [page, setPage] = React.useState(1);
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
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    // refetch();
  };
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Card sx={{ backgroundColor: theme.palette.background.paper }}>
        <DataGrid
          rows={journals}
          columns={journalColumns(t)}
          hideFooterPagination
          rowSelection={false}
          hideFooter
          // loading={isLoading}
          sx={tableStyle}
        />
      </Card>
      <Box
        display="flex"
        justifyContent={t("dir") === "rtl" ? "start" : "end"}
        mt={2}
        dir="ltr"
      >
        <Stack spacing={2} p={1}>
          <Pagination
            count={Math.ceil(100 / 10)}
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
}
