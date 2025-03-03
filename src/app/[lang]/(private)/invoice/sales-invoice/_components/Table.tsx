"use client";
import ProductsAutoComplete from "@/components/Auto/productAutoComplete";
import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Add } from "iconsax-react";
import { useState } from "react";

interface IPropsTable {
  t:any
}
export default function DataTable ({t}:IPropsTable) {
  const [rows, setRows] = useState<any>([

  ]);

  const handleAddNewRow = () => {
    setRows([...rows , {id:"id"}])
  }

  const handleGetSelectedProduct = (product:any , index?:number) => {
    setRows([...rows , {
      id:product?._id,
      ...product
    }])
  };


  const columns: GridColDef[] = [
    {
      field: "Product Name",
      headerName: "Product Name",
      width: 200,
      renderCell: ({ row , rowNode} ) => {
        console.log("rowNode" , rowNode)
        return (
          <>
            <ProductsAutoComplete
              getProduct={handleGetSelectedProduct}
              defaultValue={row}
              index={1}
              // name={"productName"}
              t={t}
              isTable
              productIds={rows?.map((item: any) => item?.id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid rows={rows} columns={columns} sx={{ border: 0 }} hideFooter />
      <Box>
      <Button
          startIcon={<Add style={{ margin: "0 1rem" }} />}
          variant={"outlined"}
          size={"small"}
          onClick={handleAddNewRow}
        >
          {t?.invoice?.insert_new_row}
        </Button>
      </Box>
    </Box>
  );
}
