
import { Theme, useTheme } from "@mui/material/styles";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

type dataSelect = { name: string; _id: string };
interface IPropsSelect {
  data?: any;
  name?: string;
  index?: number;
  getDataSelect?: (data: any, index?: number) => void;
}

const SelectComponent: React.FC<IPropsSelect> = ({
  data,
  name,
  getDataSelect,
  index,
}) => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string | null>(null);

  const style = {
    borderColor: "#FFF",
    "& .MuiInputBase-sizeSmall": {
      paddingRight: "10px",
    },
    "& .MuiAutocomplete-endAdornment": {
      display: "none",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderColor: theme.palette.grey[200],
    },
    "& .MuiOutlinedInput-root": {
      paddingRight: "10px !important",
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.grey[200],
      },
    },
  };
  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;


    const selecteValue = data?.filter(
      (item: any) => item?.measure?._id === value
    );
    if (getDataSelect && selecteValue) getDataSelect(selecteValue?.[0], index);
    setPersonName(value);
  };
  return (
    <Select
      fullWidth
      size="small"
      value={personName}
      onChange={handleChange}
    //   placeholder="واحد"
      sx={{
        width: "90%",
        ".MuiOutlinedInput-notchedOutline": {
          borderColor: "#FFF",
        },
      }}
      MenuProps={MenuProps}
      // defaultOpen={true}
      defaultValue={data?.[0]?.measure?.name}
    >
      {data?.map((item: any) => (
        <MenuItem key={item?.measure?._id} value={item?.measure?._id}>
          {item?.measure?.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectComponent;
