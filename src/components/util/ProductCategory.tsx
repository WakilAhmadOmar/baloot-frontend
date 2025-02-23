import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { getProductCategoriesFunction } from "./getProductCategoriesFunction";

interface IPropsProductCategory {
  register: any;
  defaultValue?: string;
}
const ProductCategoriesComponent: React.FC<IPropsProductCategory> = ({
  register,
  defaultValue,
}) => {
  const cleint = useApolloClient();
  const [productCategories, setProductCategories] = useState<any[]>([]);
  const [handleError, setHandleError] = useState<{
    status: "success" | "info" | "warning" | "error";
    open: boolean;
    message: string;
  }>({
    status: "success",
    open: false,
    message: "",
  });

  const getDefaultDataProduct = async () => {
    const categoryData: any = await getProductCategoriesFunction(cleint);;
    if (categoryData?.type === "success") {
      setProductCategories(categoryData?.getCategories);
    }
    if (categoryData?.type === "error") {
      setHandleError((prevState) => ({
        ...prevState,
        open: true,
        status: "error",
        message: categoryData?.error,
      }));
    }
  };

  useEffect(() => {
    if (productCategories?.length === 0) {
      getDefaultDataProduct();
    }
  }, []);

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
