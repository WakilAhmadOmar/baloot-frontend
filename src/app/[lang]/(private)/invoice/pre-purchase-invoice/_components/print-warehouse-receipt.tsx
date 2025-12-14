import {
  Box,
  Button,
  Grid2,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {  useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Moment from "react-moment";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";

const printStyle = {
  visibility: "hidden",
  position: "absolute",
  dir: "rtl",
  left: 0,
  top: 0,
  color: "#000",
  "@media print": {
    visibility: "visible",
    position: "relative",
  },
};

export function PrintWarehouseReceipt() {
  const theme = useTheme();
  const t = useTranslations("invoice");
  const { watch } = useFormContext();


  const componentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({
    contentRef: componentRef,
    preserveAfterPrint: true,
    // documentTitle: "print invoice",
    pageStyle: `
    @page { size: auto; margin: 10mm;}
     @media print {
        body { visibility: hidden; }
       .print-container {
        visibility: visible !important;
        position: relative !important;
        width: 100vw !important;
        max-width: 100vw !important;
        min-width: 100vw !important;
        left: 0 !important;
        top: 0 !important;
        padding: 0 !important;
         
      }
      .MuiDataGrid-root,
      .MuiDataGrid-main,
      .MuiDataGrid-virtualScroller,
      .MuiDataGrid-window,
      .MuiDataGrid-renderingZone,
      .MuiDataGrid-row,
      .MuiDataGrid-cell {
        width: 100vw !important;
        max-width: 100vw !important;
        min-width: 100vw !important;
        box-sizing: border-box !important;
        
      }
      .MuiDataGrid-virtualScrollerContent {
        width: 100vw !important;
        max-width: 100vw !important;
        min-width: 100vw !important;
      }
        .MuiDataGrid-columnHeaders {
        width: 100vw !important;
        max-width: 100vw !important;
        min-width: 100vw !important;
        table-layout: fixed !important;
      }
        .MuiDataGrid-columnHeader {
      width: 100% !important;
      min-width: 0 !important;
      max-width: none !important;
  
    }
      .MuiDataGrid-row {
        display: flex !important;
        width: 100vw !important;
      }
      .MuiDataGrid-cell {
        flex: 1 1 0 !important;
        min-width: 88px !important;
         box-sizing: border-box !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        text-align: center !important;
      }
      table {
        table-layout: fixed !important;
        width: 100vw !important;
      }
        .mui-print-table {
    display: table !important;
  }
  }
  `,
  });
  const products = watch("products");

  const columns: GridColDef[] = [
    {
      field: "productName",
      headerName: t("product_name"),
      sortable: false,
      filterable: false,
      flex: 1,
      minWidth: 150,
      hideable: false,
      resizable: false,
      align: t("dir") === "ltr" ? "left" : "right",
    },
    {
      field: "measure",
      headerName: t("units"),
      sortable: false,
      filterable: false,
      minWidth: 70,
      flex: 1,
      hideable: false,
      resizable: false,


      renderCell: ({ row }) => (
        <Box
          display={"flex"}
          width={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {row?.measures
            ?.filter((item: any) => item?.selected)
            ?.map((item: any, index: number) => (
              <Box
                key={item?.measureId?._id}
                width={45}
                border={"1px solid #e1e1e1"}
                rowGap={1}
                height={25}
                borderRadius={10}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                mt={index > 0 ? 1 : 0}
              >
                {item?.measureName}
              </Box>
            ))}
        </Box>
      ),
    },
    {
      field: "quantity",
      headerName: t("quantity"),
      sortable: false,
      filterable: false,
      minWidth: 60,
      flex: 1,
      hideable: false,
      resizable: false,
      align: t("dir") === "ltr" ? "left" : "right",
      renderCell: ({ row }) => (
        <Box
          display={"flex"}
          width={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {row?.measures
            ?.filter((item: any) => item?.selected)
            ?.map((item: any, index: number) => (
              <Box key={item?.measureId?._id} mt={index > 0 ? 2 : 0}>
                {item?.amount || 1}
              </Box>
            ))}
        </Box>
      ),
    },
    {
      field: "warehouse",
      headerName: t("warehouse"),
      sortable: false,
      filterable: false,
      minWidth: 70,
      flex: 1,
      hideable: false,
      align: t("dir") === "ltr" ? "left" : "right",
      renderCell:({row})=>{
        
        return row?.warehouse?.name
      }
    
    },
    {
      field: "Details",
      headerName: t("details"),
      sortable: false,
      filterable: false,
      hideable: false,
      minWidth: 250,
      flex: 1,
      headerClassName: "wrap-header", // Add this line
      align: t("dir") === "ltr" ? "left" : "right",
    },
  ];

  const MIN_ROWS = 22; // Set this to the minimum number of rows you want to show

  // Fill with empty rows if needed
  const filledRows = [
    ...products.map((item: any) => ({ id: item?.productId, ...item })),
    ...Array.from(
      { length: Math.max(0, MIN_ROWS - products.length) },
      (_, idx) => ({
        id: `empty-${idx}`,
        productName: "",
        measures: [],
        quantity: "",
        price: "",
        discount: "",
        "discount-amount": "",
        total: "",
        expirationDate: "",
      })
    ),
  ];
  return (
    <div>
      <Box
        ref={componentRef}
        className="print-container"
        sx={[printStyle, { direction: t("dir"), padding: "2rem" }]}
      >
        <Box
          display={"grid"}
          gridTemplateColumns={"auto"}
          // borderBottom={"1px solid #000"}
        >
            <Box display={"flex"} justifyContent={"center"} mt={1}>
              <Typography variant="h4">{t("warehouse_delivery_note")}</Typography>
            </Box>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"start"}
          alignItems={"center"}
          my={1}
          gap={3}
        >
          <Box display={"flex"} gap={2}>
            <Typography variant="subtitle2"> {t("invoice_number")}: 200009 </Typography>
            <Typography variant="subtitle2">  {t("customer_name")}: احسان سفیر </Typography>
          </Box>
          <Box display={"flex"} gap={2}>
            <Typography variant="subtitle2">
              تاریخ صدور فاکتور: 1403/2/23{" "}
            </Typography>
            <Typography variant="subtitle2">   {t("warehouse")} : گدام مرگزی</Typography>
          </Box>
        </Box>
        <DataGrid
          rows={filledRows}
          columns={columns}
          disableVirtualization
          getRowHeight={() => "auto"}
          sx={{
            width: "100%",
            border: "2px solid #e1e1e1",
            borderRadius: "8px",
            "& .MuiDataGrid-columnHeaders": {
              direction: t("dir"),
              width: "100%",
              borderBottom: "none !important",
              fontSize: "1.5rem",
              fontWeight: "bold",
              "@media print": {
                // "-webkit-print-color-adjust": "exact",
                webkitPrintColorAdjust: "exact",
                printColorAdjust: "exact",
              },
            },
            "& .MuiDataGrid-row": {
              direction: t("dir"),
              width: "100% !important", // Force rows to fill width
              display: "flex",
              borderBottom: "none !important",
              borderTop: "none !important",
            },
            "& .MuiDataGrid-columnSeparator": {
              display: "none", // This removes the line between headers
            },
            "& .MuiDataGrid-cell": {
              borderTop: "1px solid #E1E1E1 !important",
              textAlign: "center",
              padding: "10px 0px !important",
              // wordBreak: "break-word",
              // boxSizing: "border-box",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              borderBottom: "none !important",
              color: "#000",
            },
            "& .wrap-header .MuiDataGrid-columnHeaderTitle": {
              whiteSpace: "normal",
              lineHeight: "1.2",
              // textAlign: "center",
              // wordBreak: "break-word",
              wordBreak: "inherit",
              justifyContent: "center",
            },
          }}
          hideFooter
          // hideFooterSelectedRowCount
          // disableColumnMenu
          // disableAutosize
          // disableColumnFilter
          // disableColumnSelector
        />
        <Box mt={3}>
          <Grid2 container spacing={2}>
            <Grid2 size={2} display={"grid"} alignItems={"center"}>
              <Typography textAlign={"center"} variant="body1">{t("seller_signature")}</Typography>
            </Grid2>
            <Grid2 size={3} display={"grid"} alignItems={"center"}>
              <Typography textAlign={"center"} variant="body1">{t("customer_signature")}</Typography>
            </Grid2>
            <Grid2 size={5}>
              <Grid2 container sx={{
                border:`1px solid ${theme.palette.grey[200]}`,
                borderRadius:"1rem",
                overflow:"hidden"
              }}>
                <Grid2 size={12}>
                  <Box
                    display={"grid"}
                    gridTemplateColumns={"50% 50%"}
                    borderBottom={`2px solid ${theme.palette.grey[200]}`}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#F5F5F5",
                        padding: "1rem 2rem",
                        "@media print": {
                          backgroundColor: "#F5F5F5", // enforce for print
                          WebkitPrintColorAdjust: "exact",
                          printColorAdjust: "exact",
                        },
                      }}
                    >
                      <Typography variant="body1">{t("total_number_of_products")} </Typography>
                    </Box>
                    <Box
                      sx={{
                        padding: "1rem 2rem",
                      }}
                    >
                      <Typography variant="body1">{products?.length}</Typography>
                    </Box>
                  </Box>
                </Grid2>
                
                
              </Grid2>
            </Grid2>
            <Grid2 size={2}>
                logo
                  
                </Grid2>
          </Grid2>
        </Box>
      </Box>
      <Button
        variant="outlined"
        onClick={() => {
          if (componentRef.current) {
            componentRef.current.style.height = "auto";
          }
          reactToPrintFn();
        }}
      >
        {t("print_warehouse_note")}
      </Button>
    </div>
  );
}
