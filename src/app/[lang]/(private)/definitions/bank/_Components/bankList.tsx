"use client"
import {
  Box,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import CollapseComponent from "@/components/collapse/Collapse";
import { useState } from "react";
import { useApolloClient } from "@apollo/client";
import CircularProgressComponent from "@/components/loader/CircularProgressComponent";
import SnackbarComponent from "@/components/snackbarComponent";

import { DELETE_BANK } from "@/graphql/mutation/DELETE_BANK";
interface IProps {
  products?: any[];
  count: number;
  deleteProductFunction: (id: string) => void;
  handleUpdateProuct: (id: string) => void;
  t:any
}
const BankList: React.FC<IProps> = ({
  products,
  count,
  deleteProductFunction,
  handleUpdateProuct,
  t
}) => {
  const client = useApolloClient();

  const [loadingPage, setLoadingPage] = useState(false);
  const [handleError, setHandleError] = useState<{
    status: "success" | "info" | "warning" | "error";
    open: boolean;
    message: string;
  }>({
    status: "success",
    open: false,
    message: "",
  });

  const handleDelteProductFunction = async (id: string) => {
    setLoadingPage(true);
    try {
      const variables = {
        bankId: id,
      };
      const {
        data: { deleteBank },
      } = await client.mutate({
        mutation: DELETE_BANK,
        variables,
      });
      if (deleteBank?.message) {
        setLoadingPage(false);
        deleteProductFunction(id);
        setHandleError({
          open: true,
          status: "success",
          message: deleteBank.message,
        });
      }
    } catch (error: any) {
      setLoadingPage(false);
      setHandleError({
        open: true,
        status: "error",
        message: error.message,
      });
    }
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {};

  const handleCloseError = () => {
    setHandleError((pre) => ({
      ...pre,
      open: false,
    }));
  };
  return (
    <>
      {loadingPage && <CircularProgressComponent />}
      <SnackbarComponent
        status={handleError?.status}
        open={handleError?.open}
        message={handleError?.message}
        handleClose={handleCloseError}
      />
      {products?.map((item, index) => {
        let units: any = {};
        item?.measures?.forEach((item: any) => {
          units[t.product.bought_price + " " + item?.measure?.name] =
            item?.boughtPrice;
          units[t.product.sale_price + " " + item?.measure?.name] =
            item?.salePrice;
        });
        return (
          <CollapseComponent
            key={`${index}`}
            name={item?.name}
            createdAt={item?.createdAt}
            id={item?._id}
            getIdToAddAction={handleDelteProductFunction}
            updateProductFunction={handleUpdateProuct}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                display="grid"
                gridTemplateColumns={"auto 1rem"}
              >
                <Box
                  display={"grid"}
                  gridTemplateColumns={"20rem auto"}
                  rowGap={"1rem"}
                >
                  <Typography variant="caption"> {t.pages.bank?.Account_Number}</Typography>
                  <Typography variant="caption">
                    {item?.accountNumber}
                  </Typography>
                  <Typography variant="caption">{t?.pages?.bank?.Current_Balance}</Typography>
                  <Typography variant="caption">
                    {item?.cridet?.[0]?.amount}
                    {item?.cridet?.[0]?.currencyId?.name}
                  </Typography>
                  <Typography variant="caption">{t?.pages?.bank?.Bank_Contact_Number}</Typography>
                  <Typography variant="caption">
                    {item?.bankPhoneNumber}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CollapseComponent>
        );
      })}
      <Stack spacing={2} p={2} display={"grid"} justifyContent={"end"}>
        <Pagination
          count={Math.ceil(count / 10)}
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
    </>
  );
};

export default BankList;
