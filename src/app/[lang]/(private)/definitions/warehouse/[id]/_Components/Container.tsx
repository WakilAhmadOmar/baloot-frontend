"use client";

import { AppContext } from "@/provider/appContext";
import {
  Box,
  Button,
  Pagination,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useContext, useEffect, useMemo, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSchemaCrateForm } from "./Create-form-schema";
import { useGetWareFromEntrepotQuery } from "@/hooks/api/definitions/warehouse/queries/use-get-ware-from-entrepot";
import { useAddWareToEntrepotMutation } from "@/hooks/api/definitions/warehouse/mutations/use-add-ware-to-entrepot";

interface IPropsContainer {
  id: string;
}
type FormType = {
  wareObject: Array<{
    productId: string;
    productName?: string;
    measures: Array<{
      measureName?: string;
      measureId: string;
      amountOfProduct: number;
    }>;
    expireInDate?: string;
  }>;
};
const ContainerAddProduct: React.FC<IPropsContainer> = ({ id }) => {
  const t = useTranslations("pages");
  const [page, setPage] = useState(1);
  const { data: getWareFromEntrepot, isLoading } = useGetWareFromEntrepotQuery({
    entrepotId: id,
    existProduct: false,
    page,
  });
  const { mutate: addWareToEntrepot, isLoading: addLoading } =
    useAddWareToEntrepotMutation();
console.log("getWareFromEntrepot",getWareFromEntrepot)
  const defaultValues: FormType = useMemo(
    () => ({
      wareObject:
        getWareFromEntrepot?.ware?.map((item: any) => ({
          productId: item?.productId?._id,
          productName: item?.productId?.name,
          measures: item?.productId?.price?.map((measure: any) => ({
            measureName: measure?.measureId?.name,
            measureId: measure?.measureId?._id,
            amountOfProduct: 0,
          })),
          expireInDate: new Date().toISOString().slice(0, 10), // ISO string for date input
        })) || [],
    }),
    [getWareFromEntrepot?.ware]
  );

  console.log("defaultValues" , defaultValues)
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    resolver: yupResolver(useSchemaCrateForm(t)),
    defaultValues,
  });


  const { fields, append, remove } = useFieldArray({
    control,
    name: "wareObject",
  });

  const paginationModel = { page: 1, pageSize: 10 };
  const { setHandleError } = useContext(AppContext);
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

  useEffect(() => {
    if (getWareFromEntrepot?.ware?.length) {
      reset({
        wareObject:  getWareFromEntrepot?.ware?.map((item: any) => ({
          productId: item?.productId?._id,
          productName: item?.productId?.name,
          measures: item?.productId?.price?.map((measure: any) => ({
            measureName: measure?.measureId?.name,
            measureId: measure?.measureId?._id,
            amountOfProduct: 0,
          })),
          expireInDate: new Date().toISOString().slice(0, 10), // ISO string for date input
        })) || [],
      });
    }
  }, [getWareFromEntrepot?.ware, reset]);


  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      sortable: false,
      filterable: false,
      renderCell: ({ row  }) => {
        return row?._fieldIndex + 1;
      },
    },
    {
      field: "ProductId",
      headerName: t("warehouse.product_name"),
      width: 230,
      cellClassName: "pointer",
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => {
        return (
          <Typography variant="body1" my={"auto"} height={"fit-content"}>
            {row?.productName || ""}
          </Typography>
        );
      },
    },
    {
      field: "expirationDate",
      headerName: t("warehouse.expiration_date"),
      width: 230,
      cellClassName: "pointer",
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => {
        const rowIndex = row._fieldIndex;

        return (
          <Controller
            control={control}
            name={`wareObject.${rowIndex}.expireInDate`}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="date"
                size="small"
                sx={{
                  '& input[type="date"]::-webkit-calendar-picker-indicator': {
                    filter:
                      theme.palette.mode === "dark" ? "invert(1)" : "none",
                  },
                }}
              />
            )}
          />
        );
      },
    },
    {
      field: "Unit",
      headerName: t("warehouse.units"),
      width: 130,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => {
        return (
          <Box display={"grid"} my={1} gap={2}>
            {row?.measures?.map((item: any) => (
              <Typography key={item?.measureId}>{item?.measureName}</Typography>
            ))}
          </Box>
        );
      },
    },
    {
      field: "Quantity",
      headerName: t("warehouse.quantity"),
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => {
        const rowIndex = row._fieldIndex;

        return (
          <Box display={"grid"} my={1} gap={1}>
            {row?.measures?.map((item: any, measureIndex: number) => (
              <Controller
                key={item?.measureId?._id}
                control={control}
                name={`wareObject.${rowIndex}.measures.${measureIndex}.amountOfProduct`}
                render={({ field }) => (
                  <TextField
                    {...field}
                    sx={style}
                    size="small"
                    type="number"
                    placeholder="quantity"
                    fullWidth
                  />
                )}
              />
            ))}
          </Box>
        );
      },
    },
  ];

  const handleSaveProduct = async (data: any) => {
    const variables = {
      entrepotId: id,
      wareObject: data?.wareObject?.map((item: any) => {
        const measures = item?.measures?.filter((ware:any)=> ware?.amountOfProduct > 0)?.map((measure: any) => ({
          measureId: measure?.measureId,
          amountOfProduct: measure?.amountOfProduct,
        }));

        return {
          productId: item?.productId,
          measures,
          expireInDate: item?.expireInDate,
        };
      }).filter((item:any) => item?.measures?.length > 0),
      isFirstPeriodWare: true,
    };
    addWareToEntrepot(variables, {
      onSuccess: () => {
        setHandleError({
          status: "error",
          open: true,
          message: t("warehouse.initial_inventory_saved_successfully"),
        });
      },
      onError: (error: any) => {
        setHandleError({
          status: "error",
          open: true,
          message: error.message,
        });
      },
    });
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
  };
const wareObject = watch("wareObject") || []
console.log("wareObjectdddddddddddd" , wareObject)
  return (
    <Box>
      <Box>
        <Typography variant="h3" mb={2}>
          {t("warehouse.initial_inventory_entry_in_warehouse")}({name})
        </Typography>
      </Box>
      <form>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          my={2}
        >
          <Box display={"flex"} gap="2rem" alignItems={"center"}>
            <Link href={`/${lang}/definitions/warehouse`}>
              <Button variant="outlined">{t("warehouse.back")}</Button>
            </Link>
            <Button
              variant="contained"
              onClick={handleSubmit(handleSaveProduct)}
              loading={addLoading}
            >
              {t("warehouse.save")}
            </Button>
          </Box>
          <Box></Box>
        </Box>
        <Paper sx={{ width: "100%" }}>
          <DataGrid
            rows={wareObject?.map((item: any, index) => ({
              ...item,
              id: item?.productId?._id || index,
              _fieldIndex: index, // add this!
            }))}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            // pageSizeOptions={[10, 25, 50]}
            checkboxSelection={false}
            //   sx={tableStyle}
            loading={isLoading}
            rowCount={getWareFromEntrepot?.count || 0}
            // paginationModel={{ page: rows?.page, pageSize: rows?.page }}
            //   onPaginationModelChange={setPaginationModel}
            // paginationMode="server"
            hideFooter
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
          {getWareFromEntrepot?.count > 9 && (
            <Stack spacing={2} p={2}>
              <Pagination
                count={Math.ceil(getWareFromEntrepot?.count / 10)}
                size={"medium"}
                onChange={handleChangePage}
                variant="outlined"
                color="primary"
                shape="rounded"
                sx={{
                  fontSize: "2rem !important",
                }}
              />
            </Stack>
          )}
        </Paper>
      </form>
    </Box>
  );
};

export default ContainerAddProduct;
