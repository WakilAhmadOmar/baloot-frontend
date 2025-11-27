"use client";
// import DateRangePickerComponent from "@/components/muiComponent/dateRangePickerComponent";
// import CustomSearch from "@/components/muiComponent/search";

import {
  Box,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { ArrowRight2, ExportSquare, Printer } from "iconsax-react";
import { useState } from "react";
import { CustomerContainer } from "./customer";
import { EmployeeContainer } from "./employee";
import { useTranslations } from "next-intl";


export const DetailsBalanceContainer = () => {
  const theme = useTheme();
  const t = useTranslations("financial_reports")
  const [value, setValue] = useState("Customers");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box display={"flex"} columnGap={2} alignItems={"center"}>
        <Typography variant="h3">{t("sub_ledger_balance_report")}</Typography>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          columnGap={"10px"}
          minWidth={"20rem"}
        >
          {/* <InputLabel>ارز</InputLabel> */}
          {/* <Select size="small" value={1} sx={{ bgcolor: "#FFF" }}>
            <MenuItem value={1}>همه</MenuItem>
            <MenuItem>دیبت</MenuItem>
            <MenuItem>کردیت</MenuItem>
          </Select> */}
        </Box>
        <Box
          display={"flex"}
          columnGap={"1rem"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          mb={2}
          mt={2}
        >
          <Box display={"flex"} columnGap={"2rem"} alignItems={"center"}>
            <IconButton>
              <ExportSquare color={theme.palette.primary.main} />
            </IconButton>
            <IconButton>
              <Printer color={theme.palette.primary.main} />
            </IconButton>
            {/* <CustomSearch /> */}
          </Box>
          <Box display={"flex"} justifyItems={"center"}>
            {/* <DateRangePickerComponent /> */}
          </Box>
          <Box pt={1}>
            {/* <CustomSearch getTextSearchFunction={() => {}} /> */}
          </Box>
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label "
            >
              <Tab value="Customers" label={t("customers")}  />
              <Tab value="Employees" label={t("employees")} />
            </Tabs>
          </Box>
        </Box>
      </Box>
      <Box>
        {value === "Customers" && <CustomerContainer />}
        {value === "Employees" && <EmployeeContainer />}
      </Box>
    </Box>
  );
};
