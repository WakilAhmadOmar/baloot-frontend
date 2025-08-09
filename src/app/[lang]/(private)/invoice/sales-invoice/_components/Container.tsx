"use client";

import { Box, Pagination, Stack, Typography } from "@mui/material";
import React, { MouseEvent, useContext, useState } from "react";
import RowFactor from "./RowFactor";
import { useApolloClient } from "@apollo/client";
import CreateSalesInvoice from "./Create";
import InvoiceContextProvider from "../../_components/invoiceContext";
import SkeletonComponent from "../../_components/Skeleton";
import { AppContext } from "@/provider/appContext";
import { DELETE_SELLS_BILL } from "@/graphql/mutation/DELETE_SELLS_BILL";
import { useGetSellsBillList } from "@/hooks/api/invoice/queries/use-get-sale-invoice";
import { useTranslations } from "next-intl";


const PurchaseInvoicePage = () => {
  const t = useTranslations("invoice")
  const client = useApolloClient();
  const { setHandleError } = useContext(AppContext);
  const [loading , setLoading] = useState(false)
  const [searchText, setSearchText] = useState("");
  const [pageData, setPageData] = useState<any>({
    page: 1,
    rows: [],
    count: 0,
  });
  const { data , error , isLoading  , refetch } =  useGetSellsBillList({
    page: pageData?.page,
    searchTerm:searchText,
    dateFilter:{
      startDate: "",
      endDate:""
    }
  })

  const handleDeleteFunction = async (event: MouseEvent) => {
    const id = event?.currentTarget?.id;

    try {
      setLoading(true);
      const variables = {
        sellBillId: id,
      };
      const {
        data: { deleteSellsBill },
      } = await client.mutate({
        mutation: DELETE_SELLS_BILL,
        variables,
      });
      if (deleteSellsBill?.message) {
        setHandleError({
          open: true,
          message: deleteSellsBill?.message,
          type: "success",
        });
        setPageData((prevState:any) => {
          const rows = prevState?.rows?.filter((item:any) => item?._id !== id)
          return {
            ...prevState,
            rows:rows
          }
        })
        setLoading(false)
      }
    } catch (error: any) {
      setHandleError({
        message: error?.message,
        open: true,
        type: "error",
      });
      setLoading(false);
    }
  };


  return (
    <InvoiceContextProvider>
      <Box>
        <Typography variant="h3">{t("sell_invoices")}</Typography>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mt={2}
          mb={2}
        >
          <CreateSalesInvoice  />
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            columnGap={"2rem"}
          >
            <Box display="flex" columnGap={"1rem"} alignItems={"center"} pb={1}>
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["SingleInputDateRangeField"]}>
                    <DateRangePicker
                      slots={{ field: SingleInputDateRangeField }}
                      name="allowedRange"
                      slotProps={{
                        textField: {
                          size: "small",
                          fullWidth: true,
                          InputProps: {
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                sx={{ paddingInlineEnd: "1rem" }}
                              >
                                <Calendar
                                  color={theme.palette.grey[400]}
                                  size={20}
                                />
                              </InputAdornment>
                            ),
                          },
                          sx: {
                            bgcolor: "#FFF",
                          },
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider> */}
              {/* <SingleInputDateRangePicker /> */}
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              {/* <CustomSearch  getTextSearchFunction={handleGetTextSearch} /> */}
            </Box>
          </Box>
        </Box>
        <Box>
          { data?.sellBill?.map((item: any) => (
            <RowFactor
              key={item?._id}
              billNumber={item?.billNumber}
              createdAt={item?.createdAt}
              id={item?._id}
              name={item?.customerId?.fullName}
              onDelete={handleDeleteFunction}
            />
          ))}
        </Box>
        {isLoading &&
          Array(5)
            .fill(null)
            ?.map((_, index: number) => <SkeletonComponent key={index} />)}
        <Box display="flex" justifyContent={"end"} mt={2}>
          <Stack spacing={2} p={1}>
            <Pagination
              count={Math.ceil(data?.count / 10)}
              size={"medium"}
              shape="rounded"
              variant="outlined"
              color="primary"
              sx={{
                fontSize: "2rem !important",
              }}
            />
          </Stack>
        </Box>
      </Box>
    </InvoiceContextProvider>
  );
};

export default PurchaseInvoicePage;
