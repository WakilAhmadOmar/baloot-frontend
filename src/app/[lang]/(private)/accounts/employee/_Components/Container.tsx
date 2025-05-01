"use client";
import AddCashboxAccounts from "./Create";
import CollapseComponent from "@/components/collapse/Collapse";
import CustomSearch from "@/components/search/CustomSearch";
import { AppContext } from "@/provider/appContext";
import { useApolloClient } from "@apollo/client";
import { Box, Pagination, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import SkeletonComponent from "./Skeleton";
import CircularProgressComponent from "@/components/loader/CircularProgressComponent";
import { NotFoundIcon } from "@/icons";
import { GET_CUSTOMER_LIST } from "@/graphql/queries/GET_CUSTOMER_LIST";
import { DELETE_CUSTOMER } from "@/graphql/mutation/DELETE_CUSTOMER";
import { GET_EMPLOYEE_LIST } from "@/graphql/queries/GET_EMPLOYEE_LIST";

interface IPropsBankAccountPages {
  t: any;
}

const EmployeePage: React.FC<IPropsBankAccountPages> = ({ t }) => {
  const { setHandleError } = useContext(AppContext);
  const client = useApolloClient();
  const [loadingPage, setLoadingPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [textSearchState , setTextSearchState] = useState("")
  const [employeeDetails, setEmployeeDetails] = useState<any>({
    page: 1,
    data: [],
    count: 0,
  });
  const getCashboxListFunction = async (searchTerm?: string) => {
    setLoadingPage(true)
    try {
      const variables = {
        page: searchTerm ? 1 : employeeDetails?.page,
        ...(searchTerm ? { searchTerm: searchTerm } : {}),
      };
      const {
        data: { getEmployeeList },
      } = await client.query({
        query: GET_EMPLOYEE_LIST,
        variables,
      });

      if (getEmployeeList?.employee) {
        const allBank = [
          ...employeeDetails?.data,
          ...(getEmployeeList?.employee?.length > 0 ? getEmployeeList?.employee : []),
        ];
        const duplicate = allBank?.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t._id === value._id)
        );
        setEmployeeDetails((prevState: any) => ({
          page: searchTerm ? 1 : prevState.page + 1,
          count: getEmployeeList?.count ? getEmployeeList?.count : prevState?.count,
          data: searchTerm ? getEmployeeList?.employee : duplicate,
        }));
      }
      setLoadingPage(false);
    } catch (error: any) {
      setLoadingPage(false)
      setHandleError({
        open: true,
        type: "error",
        message: error.message,
      });
    }
  };
  useEffect(() => {
    if (employeeDetails?.count === 0) {
      getCashboxListFunction();
    }
  }, []);

  const handleDeleteItem = async (id: string) => {
    setLoading(true);
    try {
      const variables = {
        customerId: id,
      };
      const {
        data: { deleteCustomer },
      } = await client?.mutate({
        mutation: DELETE_CUSTOMER,
        variables,
      });
      if (deleteCustomer?.message) {
        setLoading(false);
        setEmployeeDetails(employeeDetails?.filter((item: any) => item?._id !== id));
      }
    } catch (error: any) {
      setLoading(false);
      setHandleError({
        message: error?.message,
        type: "error",
        open: true,
      });
    }
  };
  const handleSearchItem = (search: string) => {
    setTextSearchState(search)
    if (search){

      getCashboxListFunction(search);
    }else {
      getCashboxListFunction()
    }
  };

  const handleUpdateEmployee = (employee:any) => {
    setEmployeeDetails((prevState:any) => ({
      ...prevState,
      data:prevState?.data?.map((item:any) => {
        if (item?._id === employee?._id){
          return {
            ...item,
            credit:employee?.credit,
            description:employee?.description
          }
        }else return item
      })
    }))
  }
  return (
    <Box>
      {loading && <CircularProgressComponent />}
    
        <Typography variant="h3">
          {t?.pages?.employee?.list_of_employee_accounts}
        </Typography>
      
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        mt={4}
      
      >
        <Box display={"flex"} width={"100%"}>
          <AddCashboxAccounts
            isEmptyPage={loadingPage === false && employeeDetails?.count === 0}
            t={t}
            onUpdateEmployee={handleUpdateEmployee}
          />
        </Box>
        {( employeeDetails?.count > 0) && (
          <Box>
            <CustomSearch t={t} getTextSearchFunction={handleSearchItem} />
          </Box>
        )}
      </Box>
      {textSearchState !== "" &&
        !loadingPage &&
        employeeDetails?.data?.length === 0 && (
          <Box
            display={"grid"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"100%"}
            mt={7}
          >
            <NotFoundIcon />
            <Typography textAlign={"center"} variant="h6" mt={2}>
              {t?.product?.nothing_found}
            </Typography>
          </Box>
        )}
      {employeeDetails?.data?.length === 0 &&
        loadingPage &&
        Array(8)
          .fill(null)
          .map((_, index) => <SkeletonComponent key={"skeleton" + index} />)}
      <Box mt={2}>
        {employeeDetails?.data?.map((item: any) => {
          return (
            <CollapseComponent
              key={item?._id}
              name={item?.name}
              createdAt={item?.createdAt}
              height="270px"
              t={t}
              messageDescription={t?.pages?.employee?.delete_description}
              messageTitle={t?.pages?.employee?.delete_title}
              id={item?._id}
              editTable={false}
              getIdToAddAction={handleDeleteItem}
            >
              
              {item?.credit?.map((credit: any, index: number) => {
                return (
                  <Box
                    display={"grid"}
                    gridTemplateColumns={"15rem auto"}
                    key={credit?.amount + index}
                  >
                    <Typography variant="caption" pt={2}>
                      {credit?.creditType}
                    </Typography>
                    <Typography variant="caption" pt={2}>
                      {" "}
                      {credit?.amount} {credit?.currencyId?.symbol}{" "}
                    </Typography>
                  </Box>
                );
              })}
              <Box display={"grid"} gridTemplateColumns={"15rem auto"}>
                <Typography variant="caption" pt={2}>
                  {t?.pages?.employee?.salary_amount}
                </Typography>
                <Typography variant="caption" pt={2}>
                  {item?.salary?.amount} {item?.salary?.currencyId?.symbol}
                </Typography>
              </Box>
              <Box display={"grid"} gridTemplateColumns={"15rem auto"}>
                <Typography variant="caption" pt={2}>
                  {t?.pages?.Customers?.contact_number}
                </Typography>
                <Typography variant="caption" pt={2}>
                  {item?.contactNumber}
                </Typography>
              </Box>
              <Box display={"grid"} gridTemplateColumns={"15rem auto"}>
                <Typography variant="caption" pt={2}>
                  {t?.pages?.Customers?.address}
                </Typography>
                <Typography variant="caption" pt={2}>
                  {item?.address}
                </Typography>
              </Box>
              <Box display={"grid"} gridTemplateColumns={" auto"}>
                <Typography variant="caption" pt={2}>
                  {t?.pages?.bank?.description}
                </Typography>
                <Typography variant="caption">{item?.description}</Typography>
              </Box>
            </CollapseComponent>
          );
        })}
      </Box>
      {employeeDetails?.count > 0 && textSearchState === "" &&<Box display={"flex"} justifyContent={"flex-end"} mt={2}>
        <Stack spacing={2} p={1}>
          <Pagination
            count={employeeDetails?.count / 10}
            size={"medium"}
            // onChange={handleChangePage}
            variant="outlined"
            color="primary"
            shape="rounded"
            sx={{
              fontSize: "2rem !important",
            }}
          />
        </Stack>
      </Box>}
    </Box>
  );
};
export default EmployeePage;
