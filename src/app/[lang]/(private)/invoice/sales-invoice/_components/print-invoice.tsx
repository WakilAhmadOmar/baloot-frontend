import {
  Box,
  Button,
  Chip,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useContext, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { InvoiceContext } from "../../_components/invoiceContext";
import Moment from "react-moment";

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

interface IPropsPrint {
  t: any;
}

export function PrintInvoice({ t }: IPropsPrint) {
  const { rows } = useContext(InvoiceContext);
  console.log("rows", rows);
  const componentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({
    contentRef: componentRef,
    preserveAfterPrint: true,
    // documentTitle: "print invoice",
    pageStyle: `
    @page { size: auto; margin: 10mm; }
     @media print {
        body { visibility: hidden; }
  }
  `,
  });

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: t?.invoice?.product_name,
      sortable: false,
      filterable: false,
      width: 120,
      hideable: false,
      resizable: false,
      align: t?.home?.dir === "ltr" ? "left" : "right",
    },
    {
      field: "measure",
      headerName: t?.invoice?.units,
      sortable: false,
      filterable: false,
      width: 70,
      hideable: false,
      resizable: false,
      // align: t?.home?.dir === "ltr" ? "left" : "right",
      
      renderCell: ({ row }) => (
        <Box display={"grid"}  >
          {row?.measures
            ?.filter((item: any) => item?.selected)
            ?.map((item: any , index:number) => (
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
                style={{backgroundColor:"red !important"}}
                mt={index > 0 ? 1 : 0}
              >
                
                {item?.measureId?.name}
              
              </Box>
            ))}
        </Box>
      ),
    },
    {
      field: "quantity",
      headerName: t?.invoice?.quantity,
      sortable: false,
      filterable: false,
      width: 60,
      hideable: false,
      resizable: false,
      align: t?.home?.dir === "ltr" ? "left" : "right",
      renderCell: ({ row }) => (
        <Box>
          {row?.measures
            ?.filter((item: any) => item?.selected)
            ?.map((item: any , index:number) => (
              <Box key={item?.measureId?._id} mt={index > 0 ? 2 : 0}>{item?.amount || 1}</Box>
            ))}
        </Box>
      ),
    },
    {
      field: "price",
      headerName: t?.invoice?.price,
      sortable: false,
      filterable: false,
      width: 70,
      hideable: false,
      align: t?.home?.dir === "ltr" ? "left" : "right",
      renderCell: ({ row }) => (
        <Box>
          {row?.measures
            ?.filter((item: any) => item?.selected)
            ?.map((item: any , index:number) => (
              <Box key={item?.measureId?._id} mt={index > 0 ? 2 : 0}>{item?.sellPrice}</Box>
            ))}
        </Box>
      ),
    },
    {
      field: "discount",
      headerName: t?.invoice?.discount,
      sortable: false,
      filterable: false,
      width: 100,
      hideable: false,
      align: t?.home?.dir === "ltr" ? "left" : "right",
      renderCell: ({ row }) => (
        <Box>
          {row?.measures
            ?.filter((item: any) => item?.selected)
            ?.map((item: any , index:number) => (
              <Box key={item?.measureId?._id} mt={index > 0 ? 2 : 0} >{item?.discount || 0}</Box>
            ))}
        </Box>
      ),
    },
    {
      field: "discount-amount",
      headerName: t?.invoice?.discount_amount,
      sortable: false,
      filterable: false,
      width: 90,
      hideable: false,
      align: t?.home?.dir === "ltr" ? "left" : "right",
      renderCell: ({ row }) => (
        <Box>
          {row?.measures
            ?.filter((item: any) => item?.selected)
            ?.map((item: any, index:number) => (
              <Box key={item?.measureId?._id} mt={index > 0 ? 2 : 0}>{item?.discount || 0}</Box>
            ))}
        </Box>
      ),
    },
    {
      field: "total",
      headerName: t?.invoice?.total,
      sortable: false,
      filterable: false,
      width: 70,
      hideable: false,
      align: t?.home?.dir === "ltr" ? "left" : "right",
      renderCell: ({ row }) => (
        <Box>
          {row?.measures
            ?.filter((item: any) => item?.selected)
            ?.map((item: any , index:number) => (
              <Box key={item?.measureId?._id} mt={index > 0 ? 2 : 0}>{item?.totalPrice}</Box>
            ))}
        </Box>
      ),
    },
    {
      field: "expirationDate",
      headerName: t?.invoice?.expiration_date,
      sortable: false,
      filterable: false,
      hideable: false,
      width: 150,
      align: t?.home?.dir === "ltr" ? "left" : "right",
      renderCell: ({ row }) => (
        <Moment format="YYYY/MM/DD">{row?.expirationDate}</Moment>
      ),
    },
  ];

  return (
    <div>
      <Box
        ref={componentRef}
        className="print-container"
        sx={[printStyle, { direction: t?.home?.dir, padding: "2rem" }]}
      >
        <Box
          display={"grid"}
          gridTemplateColumns={"auto 2rem"}
          borderBottom={"1px solid #000"}
        >
          <Box>
            <Box display={"flex"} justifyContent={"center"} mt={1}>
              <Typography variant="h4">شرکت برادران ابراهیم زاده</Typography>
              <Typography variant="h4">
                Ebrahimzadeh Brothers Company
              </Typography>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mt={1}
            >
              <Typography variant="subtitle2">334455667788990000</Typography>
              <Typography variant="subtitle2">
                0799989898 - 0789989898
              </Typography>
              <Typography variant="subtitle2">
                Email. Ebrahimzadeh.brothers@gmail.com
              </Typography>
            </Box>
          </Box>
          <Box>logo</Box>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          my={1}
        >
          <Box display={"flex"} gap={2}>
            <Typography variant="subtitle2">شماره فاکتور: 200009 </Typography>
            <Typography variant="subtitle2"> نام مشتری: احسان سفیر </Typography>
          </Box>
          <Box>
            <Typography variant="h4">فاکتور فروش</Typography>
          </Box>
          <Box display={"flex"} gap={2}>
            <Typography variant="subtitle2">
              تاریخ صدور فاکتور: 1403/2/23{" "}
            </Typography>
            <Typography variant="subtitle2"> ارز فاکتور: افغانی</Typography>
          </Box>
        </Box>
        <DataGrid
          rows={rows}
          columns={columns}
          disableVirtualization
          getRowHeight={() => "auto"}
          sx={{
            width: "100%", 
            border: "2px solid #e1e1e1",
            borderRadius: "8px",
            "& .MuiDataGrid-columnHeaders": {
              direction: t?.home?.dir,
              width: "100%", 
              borderBottom: "none !important",
              fontSize: "1.5rem",
              fontWeight: "bold",
              "@media print": {
                "-webkit-print-color-adjust": "exact",
                "print-color-adjust": "exact",
              },
            },
            "& .MuiDataGrid-row": {
              direction: t?.home?.dir,
              width: "100% !important", // Force rows to fill width
              display: "flex",
              borderBottom: "none !important",
              borderTop: "none !important",
              backgroundColor: "red !important",
            },
            "& .MuiDataGrid-columnSeparator": {
              display: "none", // This removes the line between headers
            },
            "& .MuiDataGrid-cell": {
              borderTop: "1px solid #E1E1E1 !important",
              textAlign: "left",
              padding: "10px 0px !important",
              // wordBreak: "break-word",
              // boxSizing: "border-box",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              borderBottom: "none !important",
              color: "#000",
            },
          }}
          hideFooter
          // hideFooterSelectedRowCount
          // disableColumnMenu
          // disableAutosize
          // disableColumnFilter
          // disableColumnSelector
        />
      </Box>
      <Button 
      variant="contained"
        onClick={() => {
          if (componentRef.current) {
            componentRef.current.style.height = "auto";
          }
          reactToPrintFn();
        }}
      >
        Print
      </Button>
    </div>
  );
}
