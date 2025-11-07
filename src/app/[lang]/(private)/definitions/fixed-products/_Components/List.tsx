import { Box, Grid, Typography } from "@mui/material";
import CollapseComponent from "@/components/collapse/Collapse";
import { useContext, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import EmptyPage from "@/components/util/emptyPage";
import { EmptyProductPageIcon } from "@/icons";
import SkeletonComponent from "../../_Components/Skeleton";
import { AppContext } from "@/provider/appContext";
import UpdateProduct from "./Update";
import { useTranslations } from "next-intl";
import { useGetFixedProductList } from "@/hooks/api/definitions/product/queries/use-get-fixed-list";
import { useDeleteFixedProductMutation } from "@/hooks/api/definitions/product/mutations/uset-delete-fixed-mutation";

const ProductList = () => {
  const t = useTranslations("product");
  const { setHandleError } = useContext(AppContext);
  const [page, setPage] = useState(1);

  const { data: productList, isLoading } = useGetFixedProductList({ page });
  const { mutate: deleteProductMutation, isLoading: deleteLoading } =
    useDeleteFixedProductMutation();

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
  };
  const handleDeleteProduct = (id: string) => {
    deleteProductMutation(
      { productId: id },
      {
        onSuccess: () => {
          setHandleError({
            type: "success",
            open: true,
            message: t("product_deleted_successfully"),
          });
        },
        onError: (error: any) => {
          setHandleError({
            type: "error",
            open: true,
            message: error.message,
          });
        },
      }
    );
  };

  return (
    <>
      {productList?.fixedProduct?.map((item: any) => {
        return (
          <CollapseComponent
            key={`${item?._id}`}
            name={item?.name}
            createdAt={item?.baseMeasureAmount}
            id={item?._id}
            getIdToAddAction={handleDeleteProduct}
            // updateProductFunction={handleUpdateProuct}

            messageDescription={t("delete_description")}
            messageTitle={t("delete_title")}
            isLoading={deleteLoading}
            UpdateComponent={<UpdateProduct product={item} />}
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
                    {t("product_name")}
                  </Typography>
                  <Typography variant="caption">{item?.name}</Typography>
                  <Typography variant="caption"> {t("units")} </Typography>
                  <Box>
                    <Typography component={"span"} key={item?.measureId?._id}>
                      {item?.measureId?.name}
                    </Typography>
                  </Box>
                  <Typography variant="caption">{t("price")}</Typography>
                  <Typography variant="caption">
                    {item?.price}
                  </Typography>
                  <Typography variant="caption">{t("currency")}</Typography>
                  <Typography variant="caption">{item?.currencyId?.name}</Typography>
                </Box>
                {/* <Box
                  display={"grid"}
                  gridTemplateColumns={"20rem auto"}
                  rowGap={"1rem"}
                  columnGap={"3rem"}
                >
                  {item?.price?.map((measure: any) => {
                    return (
                      <Box
                        key={measure?.measureId?._id}
                        display="grid"
                        gridTemplateColumns={"15rem auto"}
                        alignContent={"start"}
                        rowGap={"1rem"}
                      >
                        <Typography variant="caption">
                          {t("bought_price")} {measure?.measureId?.name}{" "}
                        </Typography>
                        <Typography variant="caption" minWidth={"30rem"}>
                          {measure?.buyPrice} {item?.currencyId?.symbol}
                        </Typography>
                        <Typography variant="caption" >
                          {t("sale_price")} {measure?.measureId?.name}{" "}
                        </Typography>
                        <Typography variant="caption" minWidth={"30rem"}>
                          {measure?.sellPrice} {item?.currencyId?.symbol}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box> */}
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
            title={t("no_product_yet_title")}
            discription={t("no_product_yet_discription")}
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
