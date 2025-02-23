import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import Image from "next/image";
import CollapseComponent from "@/components/collapse/Collapse";
import { useState } from "react";
import { useApolloClient } from "@apollo/client";
import CircularProgressComponent from "@/components/loader/CircularProgressComponent";
import { DELETE_PRODUCT } from "@/graphql/mutation/DELETE_PRODUCT";
import SnackbarComponent from "@/components/snackbarComponent";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
interface IProps {
  products?: any[];
  count: number;
  deleteProductFunction: (id: string) => void;
  handleUpdateProuct: (id: string) => void;
  changePagination?: (page: number) => void;
  t: any;
}
const ProductList: React.FC<IProps> = ({
  products,
  count,
  deleteProductFunction,
  handleUpdateProuct,
  changePagination,
  t,
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
        productId: id,
      };
      const {
        data: { deleteProduct },
      } = await client.mutate({
        mutation: DELETE_PRODUCT,
        variables,
      });
      if (deleteProduct?._id) {
        setLoadingPage(false);
        deleteProductFunction(id);
        setHandleError({
          open: true,
          status: "success",
          message: "Delete Product is successfully.",
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
  ) => {
    if (changePagination) {
      changePagination(page);
    }
  };

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
      {products?.map((item) => {
        return (
          <CollapseComponent
            key={`${item?._id}`}
            name={item?.name}
            createdAt={item?.baseMeasureAmount}
            id={item?._id}
            getIdToAddAction={handleDelteProductFunction}
            updateProductFunction={handleUpdateProuct}
          >
            <Grid container spacing={2}>
              <Grid
                item
               
                display="grid"
                gridTemplateColumns={"auto 1rem"}
                gap={"3rem"}
              >
                <Box
                  display={"grid"}
                  gridTemplateColumns={"20rem auto"}
                  rowGap={"1rem"}
                >
                  <Typography variant="caption">
                    {" "}
                    {t?.product?.product_name}
                  </Typography>
                  <Typography variant="caption">{item?.name}</Typography>
                  <Typography variant="caption"> {t?.product?.units} </Typography>
                  <Box>
                    {item?.measures?.map((measure: any) => (
                      <Typography
                        component={"span"}
                        key={measure?.measureId?._id}
                      >
                        {" "}
                        {measure?.measureId?.name}{" "}
                      </Typography>
                    ))}
                  </Box>
                  <Typography variant="caption">{t?.product?.product_quantity}</Typography>
                  <Typography variant="caption">
                    {item?.baseMeasureAmount}
                  </Typography>
                
                </Box>
                <Box>
                    {item?.measures?.map((measure: any) => {
                      return (
                        <Box
                          key={measure?.measure?._id}
                          display="grid"
                          gridTemplateColumns={"15rem auto"}
                        >
                          <Typography variant="caption">
                           {t?.product?.bought_price} {measure?.measureId?.name}{" "}
                          </Typography>
                          <Typography variant="caption">
                            {measure?.buyPrice}
                          </Typography>
                          <Typography variant="caption">
                             {t?.product?.sale_price} {measure?.measureId?.name}{" "}
                          </Typography>
                          <Typography variant="caption">
                            {measure?.sellPrice}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
              </Grid>

              <Grid
                item
                xs={4}
                justifyContent={"flex-end"}
                display="grid"
                alignItems={"flex-end"}
              >
                
                <Box></Box>
              </Grid>
            </Grid>
          </CollapseComponent>
        );
      })}

      <Stack spacing={2} p={2}>
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

export default ProductList;
