"use client"
import ProductReportRow from "./product-row";
// import DateRangePickerComponent from "@/components/muiComponent/dateRangePickerComponent";
// import CustomSearch from "@/components/muiComponent/search";
import {
  Box,
  IconButton,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { ExportSquare, Printer } from "iconsax-react";

export const ProductsWithDate = () => {
  const theme = useTheme();

  return (
    <Box>
      <Box pb={3}>
        <Typography variant="h3" pb={3}>
          لیست اجناس موجود با تاریخ
        </Typography>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          {/* <Box
            display={"grid"}
            // columnGap={"1rem"}
            alignItems={"center"}
            width={"30rem"}
            gridTemplateColumns={"7rem auto"}
          >
            <Typography
              variant="subtitle2"
              component={"div"}
              width={"fit-content"}
            >
              گدام ها
            </Typography>
            <Box width={"100%"}>
              <Select
                sx={{
                  bgcolor: "#FFF",
                }}
                size="small"
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                // onChange={handleChange}
              >
                <MenuItem value={10}>همه</MenuItem>
                <MenuItem value={20}>گدام مرکزی</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </Box>
          </Box> */}

          <Box display={"flex"} columnGap={"2rem"} alignItems={"center"}>
            <IconButton>
              <ExportSquare color={theme.palette.primary.main} />
            </IconButton>
            <IconButton>
              <Printer color={theme.palette.primary.main} />
            </IconButton>
            <Box display={"flex"} alignItems={"center"}>
              {/* <DateRangePickerComponent /> */}
            </Box>
            {/* <CustomSearch /> */}
          </Box>
        </Box>
      </Box>
      <Box>
        <ProductReportRow showHeader={true}/>
        <ProductReportRow showHeader={false}/>
      </Box>
      <Box display="flex" justifyContent={"end"} mt={2}>
        <Stack spacing={2} p={1}>
          <Pagination
            count={Math.ceil(100 / 10)}
            size={"medium"}
            shape="rounded"
            variant="outlined"
            color="primary"
            // onChange={handleChangePage}
            sx={{
              fontSize: "2rem !important",
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
};


