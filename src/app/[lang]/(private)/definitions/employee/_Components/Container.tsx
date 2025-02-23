"use client"
import CreateEmployee from "./Create";
import EmployeesList from "./List";
import { GET_EMPLOYEE_LIST } from "@/graphql/queries/GET_EMPLOYEE_LIST";
import {  NotFoundIcon } from "@/icons";
import CircularProgressComponent from "@/components/loader/CircularProgressComponent";
import CustomSearch from "@/components/search/CustomSearch";

import { useApolloClient } from "@apollo/client";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface IProps {
    t:any
}
const EmployeePage:React.FC<IProps> = ({t}) => {
  const client = useApolloClient();
  const [employeeState, setEmployeeState] = useState<{
    employees: any[];
    count: number;
    page: number;
  }>({
    employees: [],
    count: 0,
    page: 1,
  });

  const [loadingPage, setLoadingPage] = useState(true);
  const [updateProductState, setUpdateProductState] = useState(false);
  const [updateProductItem, setUpdateProductItem] = useState({});
  const [textSearchState, setTextSearchState] = useState("");

  const getProductListFunction = async (textSearch?: string) => {
    setLoadingPage(true);
    try {
      const variables = {
        page: textSearch ? 1 : employeeState?.page,
        ...(textSearch ? { searchTerm: textSearch } : {}),
      };
      const {
        data: { getEmployeeList },
      } = await client.query({
        query: GET_EMPLOYEE_LIST,
        variables,
        fetchPolicy: "network-only",
      });
      setEmployeeState((prevState) => ({
        employees: getEmployeeList?.employee,
        count:
          getEmployeeList?.count > 0
            ? getEmployeeList?.count
            : prevState?.count,
        page: prevState.page + 1,
      }));
      setLoadingPage(false);
    } catch (error: any) {
      setLoadingPage(false);
    }
  };
  useEffect(() => {
    if (employeeState?.employees?.length === 0) {
      getProductListFunction();
    }
  }, []);

  const handleDeleteItemFunction = (id: string) => {
    const filterState = employeeState?.employees?.filter((item) => {
      return id !== item?._id;
    });
    setEmployeeState((preState) => ({
      ...preState,
      employees: filterState,
      count: preState?.count - 1,
    }));
  };
  const handleGetCreatedProduct = (product: any) => {
    setEmployeeState((prevState) => ({
      ...prevState,
      employees: [product, ...prevState?.employees],
      count: prevState.count + 1,
    }));
  };

  const canceleUpdateProduct = () => {
    setUpdateProductItem({});
    setUpdateProductState(false);
  };
  const updateItemFunction = (productId: String) => {
    const item = employeeState?.employees?.filter((item) => {
      return item?._id === productId;
    });
    setUpdateProductItem(item?.[0]);
    setUpdateProductState(true);
  };
  const handleGetUpdateProduct = (product: any) => {
    const filterState = employeeState?.employees?.map((item) => {
      if (item?._id === product._id) {
        return product;
      } else return item;
    });
    setEmployeeState((prevState) => ({
      ...prevState,
      employees: filterState,
    }));
    canceleUpdateProduct();
  };

  const getTextSearchFunction = (textSearch: string) => {
    setEmployeeState((prvState) => ({
      ...prvState,
      page: 0,
      employees: [],
    }));
    setTextSearchState(textSearch);
    getProductListFunction(textSearch);
  };
  return (
    <Box>
      {loadingPage && <CircularProgressComponent />}
      {(employeeState?.count > 0 || loadingPage) && (
        <Typography variant="h3" mb={2}>
          {t?.pages?.employee?.employees}
        </Typography>
      )}
      <Box
        mb={2}
        sx={{
          display: "flex",
          ...(employeeState?.count === 0 && loadingPage === false
            ? { justifyContent: "center" }
            : { justifyContent: "space-between" }),
        }}
      >
        <CreateEmployee
          getProuctCreated={handleGetCreatedProduct}
          isUpdate={updateProductState}
          item={updateProductItem}
          getProductUpdated={handleGetUpdateProduct}
          canceleUpdageProduct={canceleUpdateProduct}
          isEmptyPage={loadingPage === false && employeeState?.count === 0}
          t={t}
        />
        {employeeState?.count > 0 && (
          <Box>
            <CustomSearch getTextSearchFunction={getTextSearchFunction} t={t} />
          </Box>
        )}
      </Box>
      {textSearchState !== "" &&
        !loadingPage &&
        employeeState?.employees?.length === 0 && (
          <Box
            display={"grid"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"100%"}
            mt={7}
          >
            <NotFoundIcon />
            <Typography textAlign={"center"} variant="h6" mt={2}>
              {t?.pages?.employee?.employees}
            </Typography>
          </Box>
        )}
      {employeeState?.employees?.length > 0 && (
        <EmployeesList
          products={employeeState?.employees}
          count={employeeState?.count}
          deleteProductFunction={handleDeleteItemFunction}
          handleUpdateProuct={updateItemFunction}
          t={t}
        />
      )}
    </Box>
  );
};

export default EmployeePage;
