import { Box, MenuItem, Select, TextField } from "@mui/material";

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
}

const SelectWithInput: React.FC<IPropsSelectWithInput> = ({
  register,
  defaultValue,
  data,
  selectName,
  inputName,
}) => {
  return (
    <Box display={"flex"}>
      <Select
        size={"small"}
        {...register(selectName || "isNewProduct", { require: true })}
        name={selectName || "isNewProduct"}
        defaultValue={defaultValue || data?.[0]?.value}
        sx={{ borderStartEndRadius: 0, borderEndEndRadius: 0 }}
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
        sx={{
          "& .MuiInputBase-root": {
            borderStartStartRadius: "0",
            borderEndStartRadius: 0,
          },
        }}
        {...register(inputName || "amount", { require: true })}
        name={inputName || "amount"}
      />
    </Box>
  );
};
export default SelectWithInput;
