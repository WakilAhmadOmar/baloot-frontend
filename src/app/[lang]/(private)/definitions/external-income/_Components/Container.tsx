
"use client"
import CreateExternalIncomeType from "./Create";
import { GET_EXTERNAL_TYPE_INCOME } from "@/graphql/queries/GET_EXTERNAL_TYPE_INCOME";
import CircularProgressComponent from "@/components/loader/CircularProgressComponent";
import { useApolloClient } from "@apollo/client";
import { Box,  Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ConsumptionBox from "../../consumption/_Components/ConsumptionBox";

interface IProps {
    t:any
}
const ExternalIncomePage:React.FC<IProps> = ({t}) => {
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

  const getProductListFunction = async () => {
    try {
      const {
        data: { getExternalIncomeTypeList },
      } = await client.query({
        query: GET_EXTERNAL_TYPE_INCOME,
      });
      setProductsState((prevState) => ({
        ...prevState,
        products: getExternalIncomeTypeList,
        page: prevState.page + 1,
      }));
      setLoadingPage(false);
    } catch (error: any) {}
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
    }));
  };
  const handleGetCreatedProduct = (product: any) => {
    setProductsState((prevState) => ({
      ...prevState,
      products: [product, ...prevState?.products],
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
  return (
    <Box>
      {loadingPage && <CircularProgressComponent />}
      {(productsState?.products?.length > 0 || loadingPage) && (
        <Typography variant="h3" mb={2}>
          {t?.pages?.income?.external_income}
        </Typography>
      )}
      <Box
        mb={2}
        sx={{
          display: productsState?.count > 0 ? "flex" : "grid",
          justifyContent: productsState.count > 0 ? "space-between" : "",
        }}
      >
        <CreateExternalIncomeType
          getProuctCreated={handleGetCreatedProduct}
          isUpdate={updateProductState}
          item={updateProductItem}
          getProductUpdated={handleGetUpdateProduct}
          canceleUpdageProduct={canceleUpdateProduct}
          isEmptyPage={
            loadingPage === false && productsState?.products?.length === 0
          }
          t={t}
        />
        {/* {productsState?.products?.length > 0 && (
          <Box bgcolor={"#FFF"}>
            <CustomSearch />
          </Box>
        )} */}
      </Box>
      <Box display={"flex"} flexWrap="wrap" columnGap={"1rem"} rowGap="1rem">
        {productsState?.products?.map((item) => (
          <ConsumptionBox
            key={item?._id}
            item={item}
            id={item?._id}
            updateProductFunction={updateProductFunction}
            t={t}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ExternalIncomePage;
