import { Box, InputLabel, MenuItem, Select, Typography } from "@mui/material";

import { useGetProductCategoryList } from "@/hooks/api/definitions/product-category/queries/use-get-list";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";

interface IPropsProductCategory {
  defaultValue?: string;
  name?: string;
}
const ProductCategoriesComponent: React.FC<IPropsProductCategory> = ({
  defaultValue,
  name,
}) => {
  const {
    formState: { errors },
    control,
  } = useFormContext();
  const t = useTranslations("product");

  const { data: getCategories, isLoading } = useGetProductCategoryList();

  return (
    <Box>
      <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }} required>
        {t("category")}
      </InputLabel>
      {getCategories?.length > 0 && (
        <Controller
          name={name || "category"}
          control={control}
          render={({ field }) => (
            <Select fullWidth size={"small"} {...field} disabled={isLoading}>
              {getCategories?.map((item: any) => {
                return (
                  <MenuItem key={item?._id} value={item?._id}>
                    {item?.name}
                  </MenuItem>
                );
              })}
            </Select>
          )}
        />
      )}
      {errors?.category && (
        <Typography color="error" p={1}>
          {errors?.category?.message as string}
        </Typography>
      )}
    </Box>
  );
};

export default ProductCategoriesComponent;
