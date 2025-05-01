import React, { useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useReactToPrint } from "react-to-print";
import { Button, Box } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "age", headerName: "Age", width: 150 },
];

const rows = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  age: 20 + index,
}));

const PrintTable = () => {
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Table_Print",
    pageStyle: `
      @page { size: auto; margin: 10mm; }
      @media print {
        body { visibility: hidden; }
        .print-container {
          visibility: visible !important;
          height: auto !important;
          overflow: visible !important;
        }
        .MuiDataGrid-root {
          height: auto !important;
          max-height: none !important;
        }
        .MuiDataGrid-main, .MuiDataGrid-virtualScroller {
          overflow: visible !important;
        }
        .MuiDataGrid-row {
          break-inside: avoid;
          page-break-inside: avoid;
          height:"10rem"
        }
      }
    `,
  });

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={() => handlePrint()}>
        Print Table
      </Button>
      <div
        ref={componentRef}
        className="print-container"
        style={{ visibility: "hidden" }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          disableVirtualization
          getRowHeight={() => "auto"}
          sx={{
            backgroundColor: "white",
            
            "& .MuiDataGrid-columnSeparator": {
              display: "none", // This removes the line between headers
            },
          }}
          hideFooter
          hideFooterSelectedRowCount
          disableColumnMenu
          disableAutosize
          disableColumnFilter
          disableColumnSelector
        />
      </div>
    </Box>
  );
};

export default PrintTable;
