"use client";
import ConsumptionBox from "./ConsumptionBox";
import CreateConsumption from "./CreateConsumption";
import { useApolloClient } from "@apollo/client";
import { Box, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "@/provider/appContext";
import { DELETE_CONSUMPTION } from "@/graphql/mutation/DELETE_CONSUMPTION";
import { useGetConsumptionTypeQuery } from "@/hooks/api/definitions/consumption/queries/use-get-consumption-type";
import EmptyPage from "@/components/util/emptyPage";
import { EmptyProductPageIcon } from "@/icons";
import { SkeletonComponentBox } from "../../_Components/Skeleton-box";

interface IProps {
  t: any;
}
const ConsumptionPage: React.FC<IProps> = ({ t }) => {
  const client = useApolloClient();
  const { setHandleError } = useContext(AppContext);
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

  const { data: consumptionList, isLoading } = useGetConsumptionTypeQuery();

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
  const handleDeleteItem = async (id: string) => {
    setLoadingPage(true);
    try {
      const variables = {
        consumptionId: id,
      };
      const {
        data: { deleteConsumption },
      } = await client.mutate({
        mutation: DELETE_CONSUMPTION,
        variables,
      });
      if (deleteConsumption?.message) {
        setHandleError({
          message: deleteConsumption?.message,
          type: "success",
          open: true,
        });
        setProductsState((prevState) => ({
          ...prevState,
          products: prevState?.products?.filter((item) => item?._id !== id),
        }));
      }
      setLoadingPage(false);
    } catch (error: any) {
      setLoadingPage(false);
      setHandleError({
        type: "error",
        message: error?.message,
        open: true,
      });
    }
  };
  return (
    <Box>
      <Typography variant="h3" mb={2}>
        {t?.pages?.Expenses?.Expenses}
      </Typography>
      <Box
        mb={2}
        sx={{
          display: "flex",
        }}
      >
        <CreateConsumption t={t} />
        {/* {productsState?.products?.length > 0 && (
          <Box bgcolor={"#FFF"}>
            <CustomSearch />
          </Box>
        )} */}
      </Box>
      <Box display={"flex"} flexWrap="wrap" columnGap={"1rem"} rowGap="1rem">
        {consumptionList?.map((item: any) => (
          <ConsumptionBox key={item?._id} item={item} t={t} />
        ))}
        {isLoading && <SkeletonComponentBox />}
      </Box>

      {consumptionList?.length === 0 && !isLoading && (
        <Box className={"empty_page_content"}>
          <EmptyPage
            icon={<EmptyProductPageIcon />}
            // buttonText={t?.pages?.Expenses?.Add_New_Expense}
            discription={t?.pages?.Expenses?.You_have_no_expenses}
            // onClick={handleOpenDialogFunction}
            title={t?.pages?.Expenses?.No_Expenses_Recorded}
          />
        </Box>
      )}
    </Box>
  );
};

export default ConsumptionPage;
