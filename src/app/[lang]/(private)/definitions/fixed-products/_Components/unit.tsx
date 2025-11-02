import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import { useMemo, useState } from "react";

import { useGetProductCategoryList } from "@/hooks/api/definitions/product-category/queries/use-get-list";
import { useGetMeasuresQuery } from "@/hooks/api/definitions/units/queries/use-get-meansures-query";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";


export const ProductUnit = () => {
    const t = useTranslations("product")

    const {control  , register } = useFormContext()

//   const [productCategories, setProductCategories] = useState<any[]>([]);

  const { data: measureList, isLoading } = useGetMeasuresQuery();

//   useMemo(() => {
//     if (getCategories) {
//       setProductCategories(getCategories);
//     }
//   }, [getCategories]);




  return (
    <Box>
      <InputLabel sx={{ marginTop: "1rem", paddingBottom: "5px" }} required>
     {t("measure")}
      </InputLabel>
      <Controller 
      name="measureId"
      control={control}
      render={({field})=>(
        <Select
          fullWidth
          size={"small"}
          {...field}
          {...register("measureId", { required: true })}
          name="measureId"
        //   defaultValue={defaultValue || productCategories?.[0]?._id}
        >
          {measureList?.map((item:any) => {
            return (
              <MenuItem key={item?._id} value={item?._id}>
                {item?.name}
              </MenuItem>
            );
          })}
        </Select>
      )
      }
      />
    </Box>
  );
};

