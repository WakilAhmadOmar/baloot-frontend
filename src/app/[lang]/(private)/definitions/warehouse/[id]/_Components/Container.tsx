"use client";

import CustomSearch from "@/components/search/CustomSearch";
import { ADD_WARE_TO_ENTREPOT } from "@/graphql/mutation/ADD_WARE_TO_ENTREPOT";
import { GET_WARE_FROM_ENTREPOT } from "@/graphql/queries/GET_WARE_FROM_ENTREPOT";
import { AppContext } from "@/provider/appContext";
import { useApolloClient } from "@apollo/client";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChangeEvent, useContext, useEffect, useState } from "react";

interface IPropsContainer {
  id: string;
  t: any;
}

const ContainerAddProduct: React.FC<IPropsContainer> = ({ t, id }) => {
  const paginationModel = { page: 1, pageSize: 10 };
  const client = useApolloClient();
  const {setHandleError } = useContext(AppContext)
  const [loadingPage, setLoadingPage] = useState(true);
  const theme = useTheme();
   const pathname = usePathname();
    const lang = pathname.split("/")[1];
    const searchParams = useSearchParams();
  const name = searchParams.get("name");

  const style = {
    width: "100%",
    paddingInlineStart: "3px !important",
    "& .MuiInputBase-input": {
      paddingInlineStart: "3px !important",
    },
    "& .MuiInputBase-sizeSmall": {
      // paddingRight: "10px",
      paddingInlineStart: "3px !important",
    },
    "& .MuiAutocomplete-endAdornment": {
      display: "none",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderColor: theme.palette.primary.main,
    },
    "& .MuiOutlinedInput-root": {
      // paddingRight: "10px !important",
      paddingInlineStart: "3px !important",
      "& fieldset": {
        borderColor: theme.palette.grey[100],
      },
      "&:hover fieldset": {
        borderColor: theme.palette.grey[100],
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
  };
  const [rows, setRows] = useState<any>({
    page: 1,
    pageSize: 10,
    data: [],
    count: 0,
  });

  const getProductsFunction = async () => {
    setLoadingPage(true);
    try {
      const variables = {
        entrepotId: id,
        existProduct: false,
        page: rows?.page,
      };
      const {
        data: { getWareFromEntrepot },
      } = await client.query({
        query: GET_WARE_FROM_ENTREPOT,
        variables,
      });

      if (getWareFromEntrepot?.count > 0) {
        const allData =[...rows?.data || [], ...getWareFromEntrepot?.ware?.map((item: any, index: number) => ({
          ...item,
          id: item?.productId?._id || index,
        }))];
        const duplicate = allData?.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.id === value?.id)
        );
        setRows((prevState: any) => ({
          ...prevState,
          page: prevState?.page + 1,
          data: duplicate,
          count: getWareFromEntrepot?.count,
        }));
      }
      setLoadingPage(false);
    } catch (error) {
      setLoadingPage(false);
    }
  };

  useEffect(() => {
    getProductsFunction();
  }, []);

  const handleChangeBillFunction = (event:ChangeEvent<HTMLInputElement> , rowIndex:number , measureIndex:number) => {
    const value = parseInt(event.currentTarget?.value);
    console.log("value" , value)
    const newRows = rows?.data?.map((item: any, index: number) => {
      if (index === rowIndex) {
        return {
          ...item,
          measures: item?.measures?.map((measureItem: any, measureIndexItem: number) => {
            if (measureIndexItem === measureIndex) {
              return {
                ...measureItem,
                amountOfProduct: value,
              };
            }
            return measureItem;
          }),
        };
      }
      return item;
    });
    setRows((prevState: any) => ({
      ...prevState,
      data: newRows,
    }));
  }

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => {
        const rowIndex = rows?.data?.findIndex(
          (r: any) => r?.productId?._id === row?.productId?._id
        );
        return rowIndex + 1;
      },
    },
    {
      field: "ProductId",
      headerName: t?.pages?.warehouse?.product_name,
      width: 230,
      cellClassName: "pointer",
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => {
        return (
          <Typography variant="body1" my={"auto"} height={"fit-content"}>
            {row?.productId?.name || ""}
          </Typography>
        );
      },
    },
    {
      field: "Unit",
      headerName: t?.pages?.warehouse?.units,
      width: 130,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => {
        return (
          <Box display={"grid"} my={1} gap={2}>
            {row?.measures?.map((item: any) => (
              <Typography key={item?.measureId?._id}>
                {item?.measureId?.name}
              </Typography>
            ))}
          </Box>
        );
      },
    },
    {
      field: "Quantity",
      headerName: t?.pages?.warehouse?.quantity,
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => {
        const rowIndex = rows?.data?.findIndex(
          (r: any) => r?.productId?._id === row?.productId?._id
        );
        return (
          <Box display={"grid"} my={1} gap={1}>
            {row?.measures?.map((item: any, measureIndex: number) => (
              <TextField
                key={item?.measureId?._id}
                sx={style}
                size="small"
                type="number"
                placeholder="quantity"
                value={item?.amountOfProduct}
                name="quantity"
                onChange={(event:ChangeEvent<HTMLInputElement>) =>
                  handleChangeBillFunction(event, rowIndex, measureIndex)
                }
              />
            ))}
          </Box>
        );
      },
    },
  ];

  const handleSaveProduct = async() => {
    try{
      const variables = {
        entrepotId:id,
        wareObject:rows?.data?.map((item:any) => ({
          productId:item?.productId?._id,
          measures:item?.measures?.map((measureItem:any) => ({
            measureId:measureItem?.measureId?._id,
            amountOfProduct:measureItem?.amountOfProduct
          }))
        })),
        isFirstPeriodWare:true
      }
      const { data : { addWareToEntrepot }} = await client.mutate({
        mutation:ADD_WARE_TO_ENTREPOT,
        variables
      }) 
      if (addWareToEntrepot?.id) {
      const allRows =  rows?.data?.filter((item:any) => {
          return item?.measures?.some((measureItem:any) => measureItem.amountOfProduct > 0)
        })
        setRows((prev:any)=>({
          ...prev,
          data:allRows
        }))
        setHandleError({
          open:true,
          message:"Products added successfully",
          type:"success"
        })
      }
    }catch(error:any){
      setLoadingPage(false);
      setHandleError({
        open:true,
        message:error?.message,
        type:"error"
      })
    }

  }
  return (
    <Box>
        <Box>
          <Typography variant="h3" mb={2}>
            {t?.pages?.warehouse?.initial_inventory_entry_in_warehouse}({name})
          </Typography>
        </Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        my={2}
      >
        <Box display={"flex"} gap="2rem" alignItems={"center"}>
          <Link href={`/${lang}/definitions/warehouse`}>
          <Button variant="outlined">{t?.pages?.warehouse?.back}</Button>
          </Link>
          <Button variant="contained" onClick={handleSaveProduct}>{t?.pages?.warehouse?.save}</Button>
        </Box>
        <Box>
        </Box>
      </Box>
      <Paper sx={{ width: "100%" }}>
        <DataGrid
          rows={loadingPage ? [] : rows?.data || []}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10, 25, 50]}
          checkboxSelection={false}
          //   sx={tableStyle}
          loading={loadingPage}
          rowCount={rows?.count || 0}
          paginationModel={{ page: rows?.page, pageSize: rows?.page }}
          //   onPaginationModelChange={setPaginationModel}
          paginationMode="server"
          sx={{
            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center",
              // justifyContent: "center",
            },
          }}
          getRowHeight={() => "auto"}
          disableRowSelectionOnClick
        />
      </Paper>
    </Box>
  );
};

export default ContainerAddProduct;
