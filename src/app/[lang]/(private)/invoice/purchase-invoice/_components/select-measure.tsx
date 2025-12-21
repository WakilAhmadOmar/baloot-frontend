import { useTheme } from "@mui/material/styles";
import {
  Box,
  Checkbox,
  Chip,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect } from "react";
import { useTranslations } from "next-intl";

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

interface IPropsSelect {
  data?: any[];
  register?: any;
  name?: string;
  getDataSelect?: (data: any[], idNumber?: number) => void;
  idNumber?: number;
}

export const CustomSelectMeasure: React.FC<IPropsSelect> = ({
  data,
  register,
  name,
  getDataSelect,
  idNumber,
}) => {
  const theme = useTheme();
  const t = useTranslations("home");
  const [personName, setPersonName] = React.useState<string[]>([]);

  useEffect(() => {
    // When data changes, set the first measure as selected
    if (data && data.length > 0 && personName?.length === 0) {
      const filterData = data?.filter((item) => item?.selected);

      setPersonName(
        filterData?.length > 0
          ? filterData?.map((item) => item?.measureId?.name)
          : [data?.[0]?.measureName]
      );
      if (getDataSelect)
        getDataSelect(
          filterData?.length > 0 ? filterData : [data?.[0]],
          idNumber
        );
    }
  }, [data, personName]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;

    if (value?.length === 0) return;

    let measure: any = [];
    for (let index = 0; index < value.length; index++) {
      const dataArray: any = data?.filter(
        (item) => item?.measureId?.name === value[index]
      );
      if (data && data.length > 0) {
        setPersonName(
          data
            ?.filter((item: any) => value?.includes(item?.measureId?.name))
            .map((item: any) => item?.measureId?.name)
        );
      }
      measure = [...measure, ...dataArray];
    }
    if (getDataSelect) getDataSelect(measure, idNumber);
  };
  return (
    <Select
      multiple
      fullWidth
      size="small"
      value={personName}
      onChange={handleChange}
      sx={{
        "&:hover fieldset": {
          borderColor: theme.palette.grey[100],
          border: "none",
        },
        "& fieldset": {
          borderColor: theme.palette.grey[100],
        },
      }}
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
          sx={{
            display: "flex",
            justifyContent: "start",
            direction: t("dir"),
          }}
        >
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
