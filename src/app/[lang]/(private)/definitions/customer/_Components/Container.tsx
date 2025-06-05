"use client";
import CreateCustomer from "./Create";
import { EmptyProductPageIcon } from "@/icons";
import {
  Box,
  Card,
  Grid,
  Pagination,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useState } from "react";
import CollapseComponent from "@/components/collapse/Collapse";
import { useGetCustomerListQuery } from "@/hooks/api/definitions/customer/queries/use-get-customer-list-query";
import EmptyPage from "@/components/util/emptyPage";
import UpdateCustomer from "./Update";
import { useDeleteCustomerMutation } from "@/hooks/api/definitions/customer/mutations/use-delete-mutation";
import { AppContext } from "@/provider/appContext";
import SkeletonComponent from "../../_Components/Skeleton";

interface IProps {
  t: any;
}
const CustomerPage: React.FC<IProps> = ({ t }) => {
  const theme = useTheme();
  const {setHandleError} = useContext(AppContext)

  const [page, setPage] = useState(1);

  const { data: customerList, isLoading } = useGetCustomerListQuery({ page });
  const {mutate , isLoading:deleteIsLoading} = useDeleteCustomerMutation()

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
  };

  const handleDeleteFunction = (id:string) => {
    mutate({customerId:id} , {
      onSuccess: ({message}) => {
        setHandleError({
          open:true,
          type:"success",
          message
        })
      },
      onError: (error:any)=> {
        setHandleError({
          open:true,
          type:"error",
          message:error.message
        })
      }
    })
  }
  return (
    <Box>
      <Typography variant="h3" mb={2}>
        {t?.pages?.Customers?.customers}
      </Typography>

      <Box
        mb={2}
        sx={{
          display: "flex",
        }}
      >
        <CreateCustomer t={t} />
        {/* {customerState?.count > 0 && (
          <Box>
            <CustomSearch getTextSearchFunction={getTextSearchFunction}  t={t}/>
          </Box>
        )} */}
      </Box>
      {/* {textSearchState !== "" &&
        !loadingPage &&
        customerState?.customers?.length === 0 && (
          <Box
            display={"grid"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"100%"}
            mt={7}
          >
            <NotFoundIcon />
            <Typography textAlign={"center"} variant="h6" mt={2}>
              {t?.pages?.Customers?.Nothing_Found}
            </Typography>
          </Box>
        )} */}
      <Box>
        {customerList?.customer?.map((item: any) => {
          return (
            <CollapseComponent
              key={item?._id}
              name={item?.fullName}
              createdAt={item?.createdAt}
              id={item?._id}
              getIdToAddAction={handleDeleteFunction}
              // updateProductFunction={handleUpdateProuct}
              height="150px"
              t={t}
              messageTitle={t?.pages?.Customers?.delete_title}
              messageDescription={t?.pages?.Customers?.delete_description}
              UpdateComponent={<UpdateCustomer t={t} item={item} />}
              isLoading={deleteIsLoading}
              editTable
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
                    <Typography variant="caption">
                      {t?.pages?.Customers?.contact_number}
                    </Typography>
                    <Typography variant="caption">
                      {item?.contactNumber}
                    </Typography>
                    {/* <Typography variant="caption">
                    {t?.pages?.Customers?.credit_limit}
                  </Typography>
                  <Typography variant="caption">
                    {item?.creditLimit?.amount}{item?.creditLimit?.currencyId?.symbol}
                  </Typography> */}
                    <Typography variant="caption">
                      {t?.pages?.Customers?.address}
                    </Typography>
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
                      {item?.firstPeriodCredit?.length > 0
                        ? item?.firstPeriodCredit?.map((item: any) => (
                            <Typography key={item?.currencyId?._id}>
                              {item?.amount}
                              {item?.currencyId?.symbol}
                              <Typography component={"span"} display={"grid"}>
                                Type:{item?.creditType}
                              </Typography>
                            </Typography>
                          ))
                        : "0"}
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </CollapseComponent>
          );
        })}
        {customerList?.count > 9 && (
          <Stack spacing={2} p={1} display={"grid"} justifyContent={"end"}>
            <Pagination
              count={Math.ceil(customerList?.count / 10)}
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
        {customerList?.count === 0 && !isLoading && (
          <Box className={"empty_page_content"}>
            <EmptyPage
              icon={<EmptyProductPageIcon />}
              title={t.pages?.Customers.no_product_yet_title}
              discription={t.pages?.Customers.no_product_yet_discription}
              // buttonText={t.pages?.Customers.add_new_customer}
              // onClick={handleOpenDialogFunction}
            />
          </Box>
        )}
        {isLoading && <SkeletonComponent />}
      </Box>
    </Box>
  );
};

export default CustomerPage;
