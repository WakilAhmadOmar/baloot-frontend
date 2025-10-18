"use client"
import ProfitLossChart from "./profit-loss-chart";
import ProfitLossChartPip from "./profit-loss-pip-chart";
import dynamic from "next/dynamic";

// const ProfitLossChart = dynamic(() => import("./profit-loss-pip-chart"), { ssr: false });
import { ArrowUpIcon, VectorIcon } from "@/icons";
import {Suspense} from "react"
// import CustomSearch from "@/components/muiComponent/search";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import {
  ArrowCircleUp2,
  ArrowDown2,
  Calendar,
  ExportSquare,
  Printer,
} from "iconsax-react";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
// import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useTheme } from "@mui/material/styles";

const ProfitLossStatementPage = () => {
  const theme = useTheme();
  const classes = {
    icon: {
      left: 0,
    },
  };
  return (
    <Box p={2}>
      <Typography variant="h4">صورت حساب مفاد و ضرر</Typography>
      <Box display={"flex"} justifyContent={"space-between"} mt={2}>
        <Box display="flex" columnGap={"1rem"} alignItems={"center"} pb={1}>
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["SingleInputDateRangeField"]}>
              <DateRangePicker
                slots={{ field: SingleInputDateRangeField }}
                name="allowedRange"
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                    InputProps: {
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{ paddingInlineEnd: "1rem" }}
                        >
                          <Calendar color={theme.palette.grey[400]} size={20} />
                        </InputAdornment>
                      ),
                    },
                    sx: {
                      bgcolor: "#FFF",
                    },
                  },
                }}
              />
            </DemoContainer>
          </LocalizationProvider> */}
          <ExportSquare />
          <Printer />
        </Box>
        <Box>
          {/* <CustomSearch /> */}
        </Box>
      </Box>
      <Box
        display={"grid"}
        justifyContent={"space-between"}
        gridTemplateColumns={"19% 19% 19% 19% 19%"}
        columnGap={"13px"}
        maxWidth={"100%"}
        mt={1}
      >
        <Box bgcolor={theme.palette.background.default} borderRadius={"16px"} p={2}>
          <Box display={"flex"} justifyContent={"space-between"} pb={1}>
            <Typography
              variant="h5"
              color={theme.palette.grey[500]}
              fontSize={"1.4rem"}
            >
              خریدات
            </Typography>
            <VectorIcon fill={"#00A28A"} />
          </Box>
          <Typography variant="h3" textAlign={"center"} p={2}>
            $526,300
          </Typography>
        </Box>
        <Box bgcolor={theme.palette.background.default} borderRadius={"16px"} p={2}>
          <Box display={"flex"} justifyContent={"space-between"} pb={1}>
            <Typography
              variant="h6"
              color={theme.palette.grey[500]}
              fontSize={"1.4rem"}
            >
              فروشات
            </Typography>
            <VectorIcon fill={"#EB5757"} />
          </Box>
          <Typography variant="h3" textAlign={"center"} p={2}>
            $856,100
          </Typography>
        </Box>
        <Box bgcolor={theme.palette.background.default} borderRadius={"16px"} p={2}>
          <Box display={"flex"} justifyContent={"space-between"} pb={1}>
            <Typography
              variant="h6"
              color={theme.palette.grey[500]}
              fontSize={"1.4rem"}
            >
              موجودی اجناس
            </Typography>
            <VectorIcon fill={"#EB5757"} />
          </Box>
          <Typography variant="h3" textAlign={"center"} p={2}>
            63,900
          </Typography>
        </Box>
        <Box bgcolor={theme.palette.background.default} borderRadius={"16px"} p={2}>
          <Box display={"flex"} justifyContent={"space-between"} pb={1}>
            <Typography
              variant="h6"
              color={theme.palette.grey[500]}
              fontSize={"1.4rem"}
            >
              مفاد غیر خالص
            </Typography>
            <VectorIcon fill={"#EB5757"} />
          </Box>
          <Typography variant="h3" textAlign={"center"} p={2}>
            $745,400
          </Typography>
        </Box>
        <Box bgcolor={theme.palette.background.default} borderRadius={"16px"} p={2}>
          <Box display={"flex"} justifyContent={"space-between"} pb={1}>
            <Typography
              variant="h6"
              color={theme.palette.grey[500]}
              fontSize={"1.4rem"}
            >
              مصارف
            </Typography>
            <VectorIcon fill={"#EB5757"} />
          </Box>
          <Typography variant="h3" textAlign={"center"} p={2}>
            $223,000
          </Typography>
        </Box>
      </Box>
      <Box
        display={"grid"}
        gridTemplateColumns={"auto 14rem"}
        mt={"2rem"}
        columnGap={"2rem"}
      >
        <Box >
          <Box
            sx={{
              boxShadow: "none",
              width: "100%",
              display: "grid",
              // marginTop: "2rem",
              padding: "2rem",
              borderRadius: "16px",
              backgroundColor:`${theme.palette.background.default} !important` 
            }}
          >
            <Box display="flex" justifyContent={"space-between"} pb={2}>
              <Box display={"flex"} alignItems={"center"}>
                <Typography>گزارش فروش سال</Typography>
                <Select
                  value={1401}
                //   size={"small"}
                  autoWidth
                  IconComponent={() => <ArrowDown2 size={30} />}
                  sx={{
                    direction: "rtl",
                    border: "none !important",
                    paddingRight: "1rem",
                    color: theme.palette.primary.main,
                    "& fieldset": {
                      border: "none",
                    },

                    "& .MuiSvgIcon-root": {
                      left: "0px !important",
                      right: "100%",
                    },
                    "& .MuiSelect-select": {
                      paddingRight: "0px !important",
                    },
                  }}
                >
                  <MenuItem value={1401}>1401</MenuItem>
                  <MenuItem value={1402}>1402</MenuItem>
                </Select>
                <Box display="flex" columnGap={"5px"} mr={2}>
                  <Typography
                    color="#04CE00"
                    variant="subtitle2"
                    // fontSize={"1rem"}
                  >
                    1.3%
                  </Typography>
                  <ArrowCircleUp2
                    color="#04CE00"
                    variant="Bold"
                    style={{
                      transform: "rotate(45deg)",
                    }}
                  />
                </Box>
                <Typography variant="overline" paddingRight={"1rem"}>
                  نسبت به سال گذشته
                </Typography>
              </Box>
              <Box
                p={1}
                sx={{
                  bgcolor: "#D9FFFA",
                  borderRadius: "10px",
                  columnGap: "1rem",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{
                    fontSize: "10px",
                    fontWeight: 400,
                    padding: "5.226px 7.839px 5.749px 7.839px",
                  }}
                >
                  سالانه
                </Button>
                <Button
                  variant="text"
                  color="primary"
                  size="small"
                  sx={{
                    fontSize: "10px",
                    fontWeight: 400,
                    color: "#4B5563",
                  }}
                >
                  ماهانه
                </Button>
                <Button
                  variant="text"
                  color="primary"
                  size="small"
                  sx={{
                    fontSize: "10px",
                    fontWeight: 400,
                    color: "#4B5563",
                  }}
                >
                  هفته ای
                </Button>
                <Button
                  variant="text"
                  color="primary"
                  size="small"
                  sx={{
                    fontSize: "10px",
                    fontWeight: 400,
                    color: "#4B5563",
                  }}
                >
                  روزانه
                </Button>
              </Box>
            </Box>
            <Box
              height={"40rem"}
              maxWidth={"100%"}
              display={"grid"}
              sx={{ direction: "ltr"}}
            >
              <ProfitLossChart />
            </Box>
          </Box>
        </Box>
        <Box>
          <Box
            dir="ltr"
            sx={{
              width: "100%",
              height: "47.5%",
              display: "grid",
              justifyContent: "center",
              alignItems: "start",
              padding: "1rem",
              // marginTop: "2rem",
              borderRadius: "16px",
              boxShadow: "none",
              backgroundColor:theme.palette.background.default
            }}
          >
            <Box
              width={"100%"}
              height={"fit-content"}
              display={"grid"}
              position={"relative"}
            >
              <ProfitLossChartPip
                color1="#7AD3FF"
                color2="#4fbaf01a"
                value1={50}
                value2={50}
              />
              <Typography
                variant="subtitle2"
                sx={{
                  position: "absolute",
                  top: "40%",
                  width: "100%",
                }}
                textAlign={"center"}
              >
                50%
              </Typography>
            </Box>
            <Typography variant="h5" textAlign={"center"}>
              مفاد خالص
            </Typography>
            <Typography variant="h3" textAlign={"center"}>
              $526,924
            </Typography>
          </Box>
          <Box
            dir="ltr"
            sx={{
              width: "100%",
              height: "47.5%",
              display: "grid",
              justifyContent: "center",
              alignItems: "start",
              padding: "1rem",
              marginTop: "2rem",
              boxShadow: "none",
              borderRadius: "16px",
               backgroundColor:theme.palette.background.default
            }}
          >
            <Box
              width={"100%"}
              height={"fit-content"}
              display={"grid"}
              position={"relative"}
            >
              <ProfitLossChartPip
                color2="#FF7A7A"
                color1="#ff7a7a1a"
                value1={80}
                value2={20}
              />
              <Typography
                variant="subtitle2"
                sx={{
                  position: "absolute",
                  top: "40%",
                  width: "100%",
                }}
                textAlign={"center"}
              >
                0%
              </Typography>
            </Box>
            <Typography variant="h5" textAlign={"center"}>
              ضرر
            </Typography>
            <Typography variant="h3" textAlign={"center"}>
              $0
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfitLossStatementPage;
