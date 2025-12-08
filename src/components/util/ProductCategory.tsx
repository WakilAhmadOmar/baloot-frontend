import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import { useMemo, useState } from "react";

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
    register,
    setValue,
    watch,
  } = useFormContext();
  const t = useTranslations("product");
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
        {t("category")}
      </InputLabel>
      {productCategories?.length > 0 && (
        <Controller
          name={name || "category"}
          control={control}
          render={({ field }) => ( 
        <Select
          fullWidth
          size={"small"}
          {...field}
          // name={name || "category"}
          // defaultValue={defaultValue || productCategories?.[0]?._id}
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
        />
    )}
    </Box>
  );
};

export default ProductCategoriesComponent;
