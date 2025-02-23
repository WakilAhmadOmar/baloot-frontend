import { Theme, useTheme } from "@mui/material/styles";
import {
  Box,
  Checkbox,
  Chip,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 155,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

type dataSelect = "دانه" | "بسته";
interface IPropsSelect {
  data?: any[];
  register?: any;
  name?: string;
  getDataSelect?: (data: any[], idNumber?: number) => void;
  idNumber?: number;
}

const CustomSelectMeasure: React.FC<IPropsSelect> = ({
  data,
  register,
  name,
  getDataSelect,
  idNumber,
}) => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([
    ...(data && data?.length > 0 ? [data?.[0]?.measureId?.name] : []),
  ]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;


    setPersonName(value as string[]);
    let measure: any = [];
    for (let index = 0; index < value.length; index++) {
      const dataArray: any = data?.filter(
        (item) => item?.measureId?.name === value[index]
      );
      measure = [...measure, ...dataArray];
    }
    if (getDataSelect) getDataSelect(measure, idNumber);
  };

  return (
    <Select
      multiple
      fullWidth
      size="small"
      //   {...register(name, { require: true })}
      value={personName}
      onChange={handleChange}
      // placeholder={"واحد"}
      sx={{
        // bgcolor: "gray",
        "&:hover fieldset": {
          borderColor: theme.palette.grey[100],
          border: "none",
        },
        "& fieldset": {
          borderColor: theme.palette.grey[100],
        },
      }}
      //   input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
      renderValue={(selected: any) => (
        <Box
          sx={{
            display: "grid",
            columnGap: 3,
            rowGap: "2px",
            justifyContent: "center",
          }}
        >
          {selected?.map((value: string) => (
            <Chip
              key={value}
              label={value}
              sx={{ fontSize: "12px" }}
              size={"medium"}
            />
          ))}
        </Box>
      )}
      MenuProps={MenuProps}
    >
      {data?.map((name) => (
        <MenuItem
          key={name?.measureId?._id}
          value={name?.measureId?.name}
          // style={getStyles(name?.measure?.name, personName, theme)}
          sx={{
            display: "flex",
            justifyContent: "start",
            direction: "rtl",
          }}
        >
          {/* {name?.measure?.name} */}
          <Checkbox checked={personName.indexOf(name?.measureId?.name) > -1} />
          <ListItemText
            primary={name?.measureId?.name}
            sx={{ width: "fit-content", textAlign: "start" }}
          />
        </MenuItem>
      ))}
    </Select>
  );
};

export default CustomSelectMeasure;
