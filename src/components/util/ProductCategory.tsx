import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import { useMemo, useState } from "react";

import { useGetProductCategoryList } from "@/hooks/api/definitions/product-category/queries/use-get-list";

interface IPropsProductCategory {
  register: any;
  defaultValue?: string;
}
const ProductCategoriesComponent: React.FC<IPropsProductCategory> = ({
  register,
  defaultValue,
}) => {

  const [productCategories, setProductCategories] = useState<any[]>([]);

  const { data: getCategories, isLoading } = useGetProductCategoryList();

  useMemo(() => {
    if (getCategories) {
      setProductCategories(getCategories);
    }
  }, [getCategories]);




  return (
    <Box>
      <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }} required>
        دسته بندی
      </InputLabel>
      {productCategories?.length > 0 && (
        <Select
          fullWidth
          size={"small"}
          {...register("category", { required: true })}
          name="category"
          defaultValue={defaultValue || productCategories?.[0]?._id}
        >
          {productCategories?.map((item) => {
            return (
              <MenuItem key={item?._id} value={item?._id}>
                {item?.name}
              </MenuItem>
            );
          })}
        </Select>
      )}
    </Box>
  );
};

export default ProductCategoriesComponent;
