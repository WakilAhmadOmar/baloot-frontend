import { Box, MenuItem, Select, TextField, Typography } from "@mui/material";
import { ChangeEvent } from "react";
import { Controller, useFormContext } from "react-hook-form";

type SelectItem = {
  name: string;
  value: string;
};

interface IPropsSelectWithInput {
  defaultValue?: string;
  data?: SelectItem[];
  selectName?: string;
  inputName?: string;
  inputDefaultValue?: number;
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const SelectWithInput: React.FC<IPropsSelectWithInput> = ({
  defaultValue,
  data,
  selectName,
  inputName,
  inputDefaultValue,
  onChange,
}) => {
  const {
    control,
    formState: { errors },
    watch,
    setValue,
    register,
  } = useFormContext();
  return (
    <Box display={"flex"}>
      <Controller
        name={selectName || "isNewProduct"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            size={"small"}
            {...register(selectName || "isNewProduct")}
            name={selectName || "isNewProduct"}
            defaultValue={value || defaultValue || data?.[0]?.value}
            sx={{ borderStartEndRadius: 0, borderEndEndRadius: 0 }}
            value={value}
            onChange={onChange}
          >
            {data?.map((item) => {
              return (
                <MenuItem value={item?.value} key={item?.name}>
                  {item?.name}
                </MenuItem>
              );
            })}
          </Select>
        )}
      />
      <TextField
        fullWidth={true}
        size={"small"}
        type="number"
        error={!!errors?.[inputName || "amount"]}
        defaultValue={inputDefaultValue}
        sx={{
          "& .MuiInputBase-root": {
            borderStartStartRadius: "0",
            borderEndStartRadius: 0,
          },
        }}
        {...register(inputName || "amount", { required: true })}
        name={inputName || "amount"}
      />
      {errors?.[inputName || "amount"] && (
        <Typography variant="caption" color="error">
          {(errors?.[inputName || "amount"] as any)?.message}
        </Typography>
      )}
    </Box>
  );
};
export default SelectWithInput;
