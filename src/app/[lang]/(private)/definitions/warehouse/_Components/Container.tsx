"use client"
import { GET_ENTREPOT_LIST } from "@/graphql/queries/GET_ENTREPOT_LIST";
import { NotFoundIcon } from "@/icons";
import CircularProgressComponent from "@/components/loader/CircularProgressComponent";
import CustomSearch from "@/components/search/CustomSearch";
import CreateWarehouse from "./Create";
import WarehouseList from "./List";
import { useApolloClient } from "@apollo/client";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
interface IProps{
    t:any
}

const WarehousePage:React.FC<IProps> = ({t}) => {
  const client = useApolloClient();
  const [productsState, setProductsState] = useState<{
    products: any[];
    count: number;
    page: number;
  }>({
    products: [],
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
        page: textSearch ? 1 : productsState?.page,
        ...(textSearch ? { searchTerm: textSearch } : {}),
      };
      const {
        data: { getEntrepotList },
      } = await client.query({
        query: GET_ENTREPOT_LIST,
        variables,
        fetchPolicy: "network-only",
      });
      setProductsState((prevState) => ({
        products: getEntrepotList?.entrepot,
        count:
          getEntrepotList?.count > 0 ? getEntrepotList?.count : prevState.count,
        page: prevState.page + 1,
      }));
      setLoadingPage(false);
    } catch (error: any) {
      setLoadingPage(false);
    }
  };
  useEffect(() => {
    if (productsState?.products?.length === 0) {
      getProductListFunction();
    }
  }, []);

  const handleDeleteItemFunction = (id: string) => {
    const filterState = productsState?.products?.filter((item) => {
      return id !== item?._id;
    });
    setProductsState((preState) => ({
      ...preState,
      products: filterState,
      count: preState.count - 1,
    }));
  };
  const handleGetCreatedProduct = (product: any) => {
    setProductsState((prevState) => ({
      ...prevState,
      products: [product, ...prevState?.products],
      count: prevState?.count + 1,
    }));
  };

  const canceleUpdateProduct = () => {
    setUpdateProductItem({});
    setUpdateProductState(false);
  };
  const updateProductFunction = (productId: String) => {
    const item = productsState?.products?.filter((item) => {
      return item?._id === productId;
    });
    setUpdateProductItem(item?.[0]);
    setUpdateProductState(true);
  };
  const handleGetUpdateProduct = (product: any) => {
    const filterState = productsState?.products?.map((item) => {
      if (item?._id === product._id) {
        return product;
      } else return item;
    });
    setProductsState((prevState) => ({
      ...prevState,
      products: filterState,
    }));
    canceleUpdateProduct();
  };
  const getTextSearchFunction = (textSearch: string) => {
    setProductsState((prvState) => ({
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
      {(productsState?.count > 0 || loadingPage) && (
        <Typography variant="h3" mb={2}>
          {t?.pages?.warehouse?.warehouses}
        </Typography>
      )}
      <Box
        mb={2}
        sx={{
          display: productsState?.count > 0 ? "flex" : "grid",
          justifyContent: productsState.count > 0 ? "space-between" : "",
        }}
      >
        <CreateWarehouse
          getProuctCreated={handleGetCreatedProduct}
          isUpdate={updateProductState}
          item={updateProductItem}
          getProductUpdated={handleGetUpdateProduct}
          canceleUpdageProduct={canceleUpdateProduct}
          isEmpty={loadingPage === false && productsState?.count === 0}
          t={t}
        />
        {productsState?.products?.length > 0 && (
          <Box>
            <CustomSearch getTextSearchFunction={getTextSearchFunction} t={t} />
          </Box>
        )}
      </Box>
      {textSearchState !== "" &&
        !loadingPage &&
        productsState?.products?.length === 0 && (
          <Box
            display={"grid"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"100%"}
            mt={7}
          >
            <NotFoundIcon />
            <Typography textAlign={"center"} variant="h6" mt={2}>
              {t?.pages?.warehouse?.nothing_found}
            </Typography>
          </Box>
        )}
      {productsState?.products?.length > 0 && (
        <WarehouseList
          products={productsState?.products}
          count={productsState?.count}
          deleteProductFunction={handleDeleteItemFunction}
          handleUpdateProuct={updateProductFunction}
          t={t}
        />
      )}
    </Box>
  );
};

export default WarehousePage;

