import { Box, MenuItem, Select, TextField } from "@mui/material";
import { ChangeEvent } from "react";

type SelectItem = {
  name: string;
  value: string;
};

interface IPropsSelectWithInput {
  register?: any;
  defaultValue?: string;
  data?: SelectItem[];
  selectName?: string;
  inputName?: string;
  inputDefaultValue?:number
  onChange?:(event:ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>void
}

const SelectWithInput: React.FC<IPropsSelectWithInput> = ({
  register,
  defaultValue,
  data,
  selectName,
  inputName,
  inputDefaultValue,
onChange
}) => {
  return (
    <Box display={"flex"}>
      <Select
        size={"small"}
        {...register(selectName || "isNewProduct", { require: true })}
        name={selectName || "isNewProduct"}
        defaultValue={defaultValue || data?.[0]?.value}
        sx={{ borderStartEndRadius: 0, borderEndEndRadius: 0 }}
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
      <TextField
        fullWidth={true}
        size={"small"}
        type="number"
        defaultValue={inputDefaultValue}
        sx={{
          "& .MuiInputBase-root": {
            borderStartStartRadius: "0",
            borderEndStartRadius: 0,
          },
        }}
        {...register(inputName || "amount", { require: true })}
        name={inputName || "amount"}
        onChange={onChange}
      />
    </Box>
  );
};
export default SelectWithInput;
