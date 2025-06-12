"use client"
import { InputAdornment, TextField, Divider, useTheme } from "@mui/material";
import { SearchNormal1 } from "iconsax-react";
import { debounce } from "lodash";
import { SearchIcon } from "@/icons";
import { useTranslations } from "next-intl";


interface IPropsSearch {
  getTextSearchFunction?: (text: string) => void;

}

const CustomSearch: React.FC<IPropsSearch> = ({ getTextSearchFunction  }) => {
const t = useTranslations("home")
  const theme = useTheme();
  const debounceFunction = debounce((data: string) => {
    if (getTextSearchFunction) {
      getTextSearchFunction(data);
    }
  }, 500);
  const handleChangeTextField = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const text = event?.currentTarget?.value;
    debounceFunction(text);
  };
  return (
    <TextField
      fullWidth
      size="small"
      placeholder={t("search")}
      onChange={handleChangeTextField}
      sx={{
        position: "relative",
        "& .MuiOutlinedInput-root": {
          bgcolor: theme.palette.background.default,
          borderRadius: "8px",
          "& fieldset": {
            borderRadius: "8px",
            borderColor: theme.palette.grey[200],
          },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" sx={{ marginInlineEnd: "1.5rem" }}>
            <Divider
              orientation="vertical"
              sx={{
                position: "absolute",
                borderLeft: `1px solid ${theme.palette.grey[200]}`,
                top: 0,
                bottom: 0,
                ...(t("dir") === "ltr" ? { left: 40 } : { right: 35 }),
              }}
            />
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default CustomSearch;
