
"use client"
import CreateExternalIncomeType from "./Create";
import CircularProgressComponent from "@/components/loader/CircularProgressComponent";
import { useApolloClient } from "@apollo/client";
import { Box,  Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ConsumptionBox from "../../consumption/_Components/ConsumptionBox";
import { DELETE_RECEIVE } from "@/graphql/mutation/DELETE_RECEIVE";
import { AppContext } from "@/provider/appContext";
import { useGetExternalIncomeTypeListQuery } from "@/hooks/api/definitions/external-income/queries/use-get-external-income-type";
import ExternalIncomeBox from "./external-income-cart";
import EmptyPage from "@/components/util/emptyPage";
import { EmptyProductPageIcon } from "@/icons";
import { SkeletonComponentBox } from "../../_Components/Skeleton-box";

interface IProps {
    t:any
}
const ExternalIncomePage:React.FC<IProps> = ({t}) => {
  const client = useApolloClient();
  const { setHandleError } = useContext(AppContext)
 
  const [loadingPage, setLoadingPage] = useState(true);
  const [updateProductState, setUpdateProductState] = useState(false);
  const [updateProductItem, setUpdateProductItem] = useState({});
  
  const {data:incomeList , isLoading } = useGetExternalIncomeTypeListQuery()


  const handleGetCreatedProduct = (product: any) => {
    // setProductsState((prevState) => ({
    //   ...prevState,
    //   products: [product, ...prevState?.products],
    // }));
  };

  const canceleUpdateProduct = () => {
    setUpdateProductItem({});
    setUpdateProductState(false);
  };
  const updateProductFunction = (productId: String) => {

    // const item = productsState?.products?.filter((item) => {
    //   return item?._id === productId;
    // });
    // setUpdateProductItem(item?.[0]);
    setUpdateProductState(true);
  };
  const handleGetUpdateProduct = (product: any) => {
    // const filterState = productsState?.products?.map((item) => {
    //   if (item?._id === product._id) {
    //     return product;
    //   } else return item;
    // });
    // setProductsState((prevState) => ({
    //   ...prevState,
    //   products: filterState,
    // }));
    canceleUpdateProduct();
  };

  const handleDeleteItem = async (id:string) => {
    setLoadingPage(true)
    try{
      const variables =  {
        receiveId:id
      }
      const {data : { deleteReceive }} = await client.mutate({
        mutation:DELETE_RECEIVE,
        variables
      })
      if (deleteReceive?.message){
        setHandleError({
          message:deleteReceive?.message,
          type:"success",
          open:true
        })
        // setProductsState((prevState) => ({
        //   ...prevState,
        //   products: prevState?.products?.filter((item) => item?._id !== id)
        // }))
      }
      setLoadingPage(false)
    }catch(error:any){
      setLoadingPage(false)
      setHandleError({
        type:"error",
        message:error?.message,
        open:true
      })
    }
  }
  return (
    <Box>
  
        <Typography variant="h3" mb={2}>
          {t?.pages?.income?.external_income}
        </Typography>

      <Box
        mb={2}
        sx={{
          display: "flex" ,
         
        }}
      >
        <CreateExternalIncomeType
          t={t}
        />
        {/* {productsState?.products?.length > 0 && (
          <Box bgcolor={"#FFF"}>
            <CustomSearch />
          </Box>
        )} */}
      </Box>
      <Box display={"flex"} flexWrap="wrap" columnGap={"1rem"} rowGap="1rem">
        {incomeList?.map((item:any) => (
          <ExternalIncomeBox
            key={item?._id}
            item={item}
            t={t}
          />
        ))}
        {isLoading && <SkeletonComponentBox />}
      </Box>
       {incomeList?.length === 0 && !isLoading && <Box className={"empty_page_content"}>
            <EmptyPage
              icon={<EmptyProductPageIcon />}
              title={t?.pages?.income?.no_external_income_recorded}
              discription={t?.pages?.income?.no_income_description}
              // onClick={handleOpenDialogFunction}
              // buttonText={t?.pages?.income?.add_new_external_income}
            />
          </Box>}
          
    </Box>
  );
};

export default ExternalIncomePage;
