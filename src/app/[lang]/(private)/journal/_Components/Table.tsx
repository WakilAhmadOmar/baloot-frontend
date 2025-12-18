"use client"
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Box, Card, Pagination, Stack, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  const t = useTranslations()
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
    <Box sx={{ height: 400, width: '100%', direction:"rtl" }}>
      <Card sx={{backgroundColor: theme.palette.background.paper}}>
        <DataGrid
          rows={rows}
          columns={columns}
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
