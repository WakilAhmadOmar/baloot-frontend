import {
    Box,
    Pagination,
    Stack,
    Typography,
  } from "@mui/material";
  import CollapseComponent from "@/components/collapse/Collapse";
  import {  useState } from "react";
  import { useApolloClient } from "@apollo/client";
  import CircularProgressComponent from "@/components/loader/CircularProgressComponent";
  import SnackbarComponent from "@/components/snackbarComponent";
  import { DELETE_SAFE } from "@/graphql/mutation/DELETE_SAFE";
  interface IProps {
    products?: any[];
    count: number;
    deleteProductFunction: (id: string) => void;
    handleUpdateProuct: (id: string) => void;
    t:any
  }
  const CashBoxList: React.FC<IProps> = ({
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
          data: { deleteSafe },
        } = await client.mutate({
          mutation: DELETE_SAFE,
          variables,
        });
        if (deleteSafe?.message) {
          setLoadingPage(false);
          deleteProductFunction(id);
          setHandleError({
            open: true,
            status: "success",
            message: deleteSafe.message,
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
              height="150px"
              t={t}
              messageDescription={t?.pages?.cashbox?.delete_description}
              messageTitle={t?.pages?.cashbox?.delete_title}
            >
              <Box display={"grid"} gridTemplateColumns={"20rem auto"} mb={1}>
                <Typography variant="caption">{t?.pages?.cashbox?.Cashier} </Typography>
                <Typography variant="caption">{item?.cashier?.name}</Typography>
              </Box>
              <Box display={"grid"} gridTemplateColumns={"20rem auto"}>
                <Typography variant="caption"> {t?.pages?.cashbox?.Current_Balance}</Typography>
                <Typography variant="caption">
                  {item?.credit?.[0]?.amount}{" "}
                  {item?.credit?.[0]?.currencyId?.name}
                </Typography>
              </Box>
              <Box display={"grid"} gridTemplateColumns={"20rem auto"}>
                <Typography variant="caption"> {t?.pages?.cashbox?.Cashier_Contact_Number}</Typography>
                <Typography variant="caption">
                  {item?.cashier?.phoneNumber}{" "}
                </Typography>
              </Box>
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
  
  export default CashBoxList;
  