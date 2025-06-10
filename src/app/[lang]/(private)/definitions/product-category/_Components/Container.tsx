"use client";
import { EmptyProductPageIcon } from "@/icons";
import EmptyPage from "@/components/util/emptyPage";
import { Box, Typography } from "@mui/material";
import { useGetProductCategoryList } from "@/hooks/api/definitions/product-category/queries/use-get-list";
import BoxItemCategory from "./box-item";
import { CreateCategory } from "./Create";
import { SkeletonComponentBox } from "../../_Components/Skeleton-box";

interface IProps {
  t: any;
}
const CategoryProductPage: React.FC<IProps> = ({ t }) => {
  const { data: categoryList, isLoading } = useGetProductCategoryList();

  return (
    <Box>
      <Typography variant="h3" mb={2}>
        {t?.product?.categories}
      </Typography>

      <Box
        display={"grid"}
        gridTemplateColumns={"auto 30%"}
        justifyContent={"space-between"}
        mb={2}
      >
        <CreateCategory t={t} />

        {/* <CustomSearch /> */}
      </Box>

      <Box display={"flex"} flexWrap={"wrap"} columnGap={2} rowGap={2}>
        {categoryList?.map((item: any) => {
          return (
            <Box key={item?._id} display={"grid"}>
              <BoxItemCategory t={t} item={item} />
            </Box>
          );
        })}
        {
        isLoading && <SkeletonComponentBox />
      }
      </Box>
      {categoryList?.length === 0 && !isLoading && (
        <Box className={"empty_page_content"}>
          <EmptyPage
            icon={<EmptyProductPageIcon />}
            title={t.product.no_product_yet_title_category}
            discription={t.product.no_product_yet_discription_category}
          />
        </Box>
      )}
      
    </Box>
  );
};

export default CategoryProductPage;
