import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import CollapseComponent from "@/components/collapse/Collapse";
import { useContext, useState } from "react";
import { ApolloError, useApolloClient } from "@apollo/client";
import CircularProgressComponent from "@/components/loader/CircularProgressComponent";
import { DELETE_PRODUCT } from "@/graphql/mutation/DELETE_PRODUCT";
import SnackbarComponent from "@/components/snackbarComponent";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useGetProductList } from "@/hooks/api/definitions/product/queries/use-get-list";
import EmptyPage from "@/components/util/emptyPage";
import { EmptyProductPageIcon } from "@/icons";
import SkeletonComponent from "../../_Components/Skeleton";
import { useDeleteProductMutation } from "@/hooks/api/definitions/product/mutations/use-delete-mutation";
import { AppContext } from "@/provider/appContext";
import { ClientError } from "@/types";
import UpdateProduct from "./Update";
interface IProps {
  t: any;
}
const ProductList: React.FC<IProps> = ({
  t,
}) => {

  const {setHandleError} = useContext(AppContext)
const [page , setPage] = useState(1)

  const { data: productList, isLoading } = useGetProductList({ page });
  const {mutate:deleteProductMutation , isLoading:deleteLoading} = useDeleteProductMutation ()

 

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {

      setPage(page);
    
  };
const handleDeleteProduct = (id:string) =>{

  deleteProductMutation({productId:id},{
    onSuccess:()=>{

      setHandleError({
        type:"success",
        open:true,
        message:t?.product?.product_deleted_successfully
      })
    },
    onError:(error:any)=> {
      setHandleError({
        type:"error",
        open:true,
        message:error.message
      })
    },
  })
}

  return (
    <>
      {productList?.product?.map((item: any) => {
        return (
          <CollapseComponent
            key={`${item?._id}`}
            name={item?.name}
            createdAt={item?.baseMeasureAmount}
            id={item?._id}
            getIdToAddAction={handleDeleteProduct}
            // updateProductFunction={handleUpdateProuct}
            t={t}
            messageDescription={t.product?.delete_description}
            messageTitle={t.product?.delete_title}
            isLoading={deleteLoading}
            UpdateComponent={<UpdateProduct t={t} product={item} />}
            
          >
            <Grid container spacing={2}>
              <Grid
                item
                display="grid"
                gridTemplateColumns={"auto 1rem"}
                gap={"3rem"}
              >
                <Box
                  display={"grid"}
                  gridTemplateColumns={"20rem auto"}
                  rowGap={"1rem"}
                >
                  <Typography variant="caption">
                    {" "}
                    {t?.product?.product_name}
                  </Typography>
                  <Typography variant="caption">{item?.name}</Typography>
                  <Typography variant="caption">
                    {" "}
                    {t?.product?.units}{" "}
                  </Typography>
                  <Box>
                    {item?.measures?.map((measure: any) => (
                      <Typography
                        component={"span"}
                        key={measure?.measureId?._id}
                      >
                        {" "}
                        {measure?.measureId?.name}{" "}
                      </Typography>
                    ))}
                  </Box>
                  <Typography variant="caption">
                    {t?.product?.product_quantity}
                  </Typography>
                  <Typography variant="caption">
                    {item?.baseMeasureAmount}
                  </Typography>
                </Box>
                <Box>
                  {item?.measures?.map((measure: any) => {
                    return (
                      <Box
                        key={measure?.measure?._id}
                        display="grid"
                        gridTemplateColumns={"15rem auto"}
                      >
                        <Typography variant="caption">
                          {t?.product?.bought_price} {measure?.measureId?.name}{" "}
                        </Typography>
                        <Typography variant="caption">
                          {measure?.buyPrice}
                        </Typography>
                        <Typography variant="caption">
                          {t?.product?.sale_price} {measure?.measureId?.name}{" "}
                        </Typography>
                        <Typography variant="caption">
                          {measure?.sellPrice}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Grid>

              <Grid
                item
                xs={4}
                justifyContent={"flex-end"}
                display="grid"
                alignItems={"flex-end"}
              >
                <Box></Box>
              </Grid>
            </Grid>
          </CollapseComponent>
        );
      })}

      {productList?.count > 9 && (
        <Stack spacing={2} p={2}>
          <Pagination
            count={Math.ceil(productList?.count / 10)}
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
      {productList?.count === 0 && !!isLoading && (
        <Box className={"empty_page_content"}>
          <EmptyPage
            icon={<EmptyProductPageIcon />}
            title={t.product.no_product_yet_title}
            discription={t.product.no_product_yet_discription}
            // buttonText={t.product.add_new_product}
            // onClick={handleOpenDialogFunction}
          />
        </Box>
      )}
      {isLoading && <SkeletonComponent />}
    </>
  );
};

export default ProductList;
