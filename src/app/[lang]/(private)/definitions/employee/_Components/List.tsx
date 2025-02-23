import {
    Box,
    Grid,
    Pagination,
    Stack,
    Typography,
  } from "@mui/material";
  import CollapseComponent from "@/components/collapse/Collapse";
 
  import {  useState } from "react";
  import { useApolloClient } from "@apollo/client";
  import CircularProgressComponent from "@/components/loader/CircularProgressComponent";
  import SnackbarComponent from "@/components/snackbarComponent";
  import { DELETE_EMPLOYEE } from "@/graphql/mutation/DELETE_EMPLOYEE";
  import EmployeeDetails from "./Details";
  interface IProps {
    products?: any[];
    count: number;
    deleteProductFunction: (id: string) => void;
    handleUpdateProuct: (id: string) => void;
    t:any
  }
  const EmployeesList: React.FC<IProps> = ({
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
          employeeId: id,
        };
        const {
          data: { deleteEmployee },
        } = await client.mutate({
          mutation: DELETE_EMPLOYEE,
          variables,
        });
        if (deleteEmployee?.message) {
          setLoadingPage(false);
          deleteProductFunction(id);
          setHandleError({
            open: true,
            status: "success",
            message: deleteEmployee.message,
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
                <Grid item xs={9} display="grid">
                  <Box
                    display={"grid"}
                    gridTemplateColumns={"17rem auto"}
                    rowGap={"1rem"}
                  >
                    <Typography variant="caption">{t?.pages?.employee?.job_title}</Typography>
                    <Typography variant="caption">{item?.jobTitle}</Typography>
                    <Typography variant="caption">{t?.pages?.employee?.salary_amount}</Typography>
                    <Typography variant="caption">
                      {item?.salary?.amount}
                    </Typography>
                    <Typography variant="caption">{t?.pages?.employee?.phone_number}</Typography>
                    <Typography variant="caption">{item?.phoneNumber}</Typography>
                    <Typography variant="caption">{t?.pages?.employee?.email}</Typography>
                    <Typography variant="caption">{item?.email}</Typography>
                  </Box>
                </Grid>
  
                <Grid
                  item
                  xs={3}
                  justifyContent={"flex-end"}
                  display="flex"
                  alignItems={"flex-end"}
                >
                  <Box>
                    <EmployeeDetails item={item} t={t}/>
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
  
  export default EmployeesList;
  