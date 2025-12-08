"use client"
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Box, Card, useTheme } from '@mui/material';

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
  const theme = useTheme();
  return (
    <Box sx={{ height: 400, width: '100%', direction:"rtl" }}>
      <Card sx={{ backgroundColor: theme.palette.background.paper }}>

      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={false}
        autoHeight
        disableVirtualization
        getRowHeight={() => "auto"}
        sx={{
          direction:"rtl"
          // backgroundColor: "white",
          // height: "100%",
          // "& .MuiDataGrid-columnSeparator": {
          //   display: "none", // This removes the line between headers
          // },
          // "& .MuiDataGrid-container--top [role=row]":{
          //   background:"rgb(238, 0, 0) !important"
          // },
          // "& .MuiDataGrid-cell": {
          //   borderTop: "1px solid #E1E1E1 !important",
          //   textAlign: " right",
          //   padding: "10px !important",
          //   wordBreak: "break-word",
          //   boxSizing: "border-box",
          //   display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
          // },
        }}
        hideFooter
        hideFooterSelectedRowCount
        disableColumnMenu
        disableAutosize
        disableColumnFilter
        disableColumnSelector
      />
      </Card>
    </Box>
  );
}
