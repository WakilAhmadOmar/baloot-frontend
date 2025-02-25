import {
    Box,
    Grid,
    Pagination,
    Stack,
    Typography,
  } from "@mui/material";
  import CollapseComponent from "@/components/collapse/Collapse";

  import {useState } from "react";
  import { useApolloClient } from "@apollo/client";
  import CircularProgressComponent from "@/components/loader/CircularProgressComponent";
  import { DELETE_PRODUCT } from "@/graphql/mutation/DELETE_PRODUCT";
  import SnackbarComponent from "@/components/snackbarComponent";

  interface IProps {
    products?: any[];
    count: number;
    deleteProductFunction: (id: string) => void;
    handleUpdateProuct: (id: string) => void;
    changePagination?: (page: number) => void;
    t:any
  }
  const PartnerList: React.FC<IProps> = ({
    products,
    count,
    deleteProductFunction,
    handleUpdateProuct,
    changePagination,
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
              name={item?.firstName + ` ( ${item?.lastName} )`}
              createdAt={item?.createdAt}
              id={item?._id}
              getIdToAddAction={handleDelteProductFunction}
              updateProductFunction={handleUpdateProuct}
              height="150px"
              t={t}
              messageDescription={t?.pages?.partner?.delete_description}
              messageTitle={t?.pages?.partner?.delete_title}
              
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
                    gridTemplateColumns={"25rem auto"}
                    rowGap={"1rem"}
                  >
                    <Typography variant="caption">{t?.pages?.partner?.percentage_of_equity}</Typography>
                    <Typography variant="caption">
                      {item?.investPercentage}%
                    </Typography>
                    <Typography variant="caption">
                     {t?.pages?.partner?.amount_of_money_in_cash}
                    </Typography>
                    <Typography variant="caption">
                      {item?.invest?.amount} {item?.invest?.currencyId?.symbol}
                    </Typography>
                    <Typography variant="caption"> {t?.pages?.partner?.phone_number}</Typography>
                    <Typography variant="caption">{item?.phoneNumber}</Typography>
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
  
  export default PartnerList;
  