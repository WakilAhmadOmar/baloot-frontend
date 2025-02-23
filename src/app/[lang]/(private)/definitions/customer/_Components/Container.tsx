"use client"
import CreateCustomer from "./Create";
import CustomerList from "./List";
import { GET_CUSTOMER_LIST } from "@/graphql/queries/GET_CUSTOMER_LIST";
import { NotFoundIcon } from "@/icons";
import CircularProgressComponent from "@/components/loader/CircularProgressComponent";
import CustomSearch from "@/components/search/CustomSearch";
import { useApolloClient } from "@apollo/client";
import {
  Box,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

interface IProps{
    t:any
}
const CustomerPage:React.FC<IProps> = ({t}) => {
  const client = useApolloClient();
  const [customerState, setCustomerState] = useState<{
    customers: any[];
    count: number;
    page: number;
  }>({
    customers: [],
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
        page: textSearch ? 1 : customerState?.page,
        ...(textSearch ? { searchTerm: textSearch } : {}),
      };
      const {
        data: { getCustomerList },
      } = await client.query({
        query: GET_CUSTOMER_LIST,
        variables,
      });
      setCustomerState((prevState) => ({
        customers: getCustomerList?.customer,
        count:
          getCustomerList?.count > 0
            ? getCustomerList?.count
            : prevState?.count,
        page: prevState.page + 1,
      }));
      setLoadingPage(false);
    } catch (error: any) {
      setLoadingPage(false);
    }
  };
  useEffect(() => {
    if (customerState?.customers?.length === 0) {
      getProductListFunction();
    }
  }, []);

  const handleDeleteItemFunction = (id: string) => {
    const filterState = customerState?.customers?.filter((item) => {
      return id !== item?._id;
    });
    setCustomerState((preState) => ({
      ...preState,
      customers: filterState,
    }));
  };
  const handleGetCreatedProduct = (product: any) => {
    setCustomerState((prevState) => ({
      ...prevState,
      customers: [product, ...prevState?.customers],
    }));
  };

  const canceleUpdateProduct = () => {
    setUpdateProductItem({});
    setUpdateProductState(false);
  };
  const updateItemFunction = (productId: String) => {
    const item = customerState?.customers?.filter((item) => {
      return item?._id === productId;
    });
    setUpdateProductItem(item?.[0]);
    setUpdateProductState(true);
  };
  const handleGetUpdateProduct = (product: any) => {
    const filterState = customerState?.customers?.map((item) => {
      if (item?._id === product._id) {
        return product;
      } else return item;
    });
    setCustomerState((prevState) => ({
      ...prevState,
      customers: filterState,
    }));
    canceleUpdateProduct();
  };
  const getTextSearchFunction = (textSearch: string) => {
    setCustomerState((prvState) => ({
      ...prvState,
      page: 0,
      products: [],
    }));
    setTextSearchState(textSearch);
    getProductListFunction(textSearch);
  };
  return (
    <Box>
      {loadingPage && <CircularProgressComponent />}
      {(customerState?.count > 0 || loadingPage) && (
        <Typography variant="h3" mb={2}>
          {t?.pages?.Customers?.customers}
        </Typography>
      )}

      <Box
        mb={2}
        sx={{
          display: "flex",
          ...(customerState?.count === 0 && loadingPage === false
            ? { justifyContent: "center" }
            : { justifyContent: "space-between" }),
        }}
      >
        <CreateCustomer
          getProuctCreated={handleGetCreatedProduct}
          isUpdate={updateProductState}
          item={updateProductItem}
          getProductUpdated={handleGetUpdateProduct}
          canceleUpdageProduct={canceleUpdateProduct}
          isEmptyPage={loadingPage === false && customerState?.count === 0}
          t={t}
        />
        {customerState?.count > 0 && (
          <Box>
            <CustomSearch getTextSearchFunction={getTextSearchFunction}  t={t}/>
          </Box>
        )}
      </Box>
      {textSearchState !== "" &&
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
        )}
      <Box>
        {customerState?.customers?.length > 0 && (
          <CustomerList
            products={customerState?.customers}
            count={customerState?.count}
            deleteProductFunction={handleDeleteItemFunction}
            handleUpdateProuct={updateItemFunction}
            t={t}
          />
        )}
      </Box>
    </Box>
  );
};

export default CustomerPage;
