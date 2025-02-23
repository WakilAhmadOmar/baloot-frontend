import {
    Box,
    Card,
    Grid,
    Pagination,
    Stack,
    Typography,
    useTheme,
  } from "@mui/material";
  import CollapseComponent from "@/components/collapse/Collapse";
  import {  useState } from "react";
  import { useApolloClient } from "@apollo/client";
  import CircularProgressComponent from "@/components/loader/CircularProgressComponent";
  import SnackbarComponent from "@/components/snackbarComponent";

  import { DELETE_CUSTOMER } from "@/graphql/mutation/DELETE_CUSTOMER";
  interface IProps {
    products?: any[];
    count: number;
    deleteProductFunction: (id: string) => void;
    handleUpdateProuct: (id: string) => void;
    t:any
  }
  const CustomerList: React.FC<IProps> = ({
    products,
    count,
    deleteProductFunction,
    handleUpdateProuct,
    t
  }) => {
    const client = useApolloClient();
    const theme = useTheme();
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
          customerId: id,
        };
        const {
          data: { deleteCustomer },
        } = await client.mutate({
          mutation: DELETE_CUSTOMER,
          variables,
        });
        if (deleteCustomer?.message) {
          setLoadingPage(false);
          deleteProductFunction(id);
          setHandleError({
            open: true,
            status: "success",
            message: deleteCustomer.message,
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
              name={item?.fullName}
              createdAt={item?.createdAt}
              id={item?._id}
              getIdToAddAction={handleDelteProductFunction}
              updateProductFunction={handleUpdateProuct}
              height="150px"
            >
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={10}
                  display="grid"
                  gridTemplateColumns={"auto 1rem"}
                >
                  <Box
                    display={"grid"}
                    gridTemplateColumns={"15rem auto"}
                    rowGap={"1rem"}
                  >
                    <Typography variant="caption">{t?.pages?.Customers?.contact_number}</Typography>
                    <Typography variant="caption">
                      {item?.contactNumber}
                    </Typography>
                    <Typography variant="caption">{t?.pages?.Customers?.credit_limit}</Typography>
                    <Typography variant="caption">{item?.credibility}</Typography>
                    <Typography variant="caption">{t?.pages?.Customers?.address}</Typography>
                    <Typography variant="caption">{item?.address}</Typography>
                  </Box>
                </Grid>
  
                <Grid item xs={2} display="grid">
                  <Card
                    sx={{
                      boxShadow: "none",
                      padding: "2.5rem 1.5rem",
                      border: `1px solid ${theme.palette.grey[200]}`,
                      borderRadius: "8px",
                      height: "100%",
                    }}
                  >
                    <Typography
                      variant="button"
                      textAlign={"center"}
                      component={"div"}
                    >
                      {t?.pages?.Customers?.amount_due}
                    </Typography>
                    <Typography
                      sx={{
                        FontWeight: 500,
                        FontSize: "2rem",
                        LineHeight: "22px",
                      }}
                      textAlign={"center"}
                    >
                      {item?.pastBilling?.amount}{" "}
                      {item?.pastBilling?.currency?.name}
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </CollapseComponent>
          );
        })}
        <Stack spacing={2} p={1} display={"grid"} justifyContent={"end"}>
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
  
  export default CustomerList;
  