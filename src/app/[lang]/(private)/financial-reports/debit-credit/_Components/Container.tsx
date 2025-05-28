"use client"
// import CircularProgressComponent from "@/components/muiComponent/CircularProgressComponent";
// import DateRangePickerComponent from "@/components/muiComponent/dateRangePickerComponent";
// import CustomSearch from "@/components/muiComponent/search";
import {
  Box,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { ExportSquare, Printer } from "iconsax-react";
import { useRouter } from "next/navigation";

import { useState } from "react";

const AllAccountsPage = ({t}:{t:any}) => {
  const theme = useTheme();

  const [loadingPage, setLoadingPage] = useState(false);
  const router = useRouter();
  const routeToDetailsPage = () => {
    // router?.push({
    //   pathname: "/financialReports/customerAccounts/details",
    //   query: { ID: "accountId" },
    // });
  };
  const handleGotoDetailsFunction = () => {
    router.push("/financial-reports/debit-credit/1");
  };
  return (
    <Box>
      {/* <Box>{loadingPage && <CircularProgressComponent />}</Box> */}
      <Typography variant="h3">دبت و کردیت از همه حساب ها</Typography>
      <Box
        display={"flex"}
        columnGap={"1rem"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        mb={2}
        mt={2}
      >
        <Box pt={1}>
          {/* <CustomSearch getTextSearchFunction={() => {}} /> */}
        </Box>
      </Box>
      <Box>
        <Box
          display={"grid"}
          gridTemplateColumns={"20% 20% 20% 20% 20%"}
          bgcolor={theme.palette.background.paper}
          pt={1}
          pb={1}
          pl={2.5}
          pr={2.5}
          borderRadius={"0.8rem"}
        >
          <Box>
            <Typography variant="subtitle2">نام</Typography>
          </Box>
          <Box
            sx={{ borderInlineStart: `1px solid ${theme.palette.grey[100]}` }}
          >
            <Typography variant="subtitle2" textAlign={"center"}>
              دبت
            </Typography>
          </Box>
          <Box
            sx={{ borderInlineStart: `1px solid ${theme.palette.grey[100]}` }}
          >
            <Typography variant="subtitle2" textAlign={"center"}>
              کردیت
            </Typography>
          </Box>
          <Box
            sx={{ borderInlineStart: `1px solid ${theme.palette.grey[100]}` }}
          >
            <Typography variant="subtitle2" textAlign={"center"}>
              ارز
            </Typography>
          </Box>
          <Box
            sx={{ borderInlineStart: `1px solid ${theme.palette.grey[100]}` }}
          >
            <Typography variant="subtitle2" textAlign={"center"}>
              الباقی
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "20% 80%",
            alignItems: "center",
            backgroundColor: theme.palette?.background.default,
            borderRadius: "0.8rem",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: theme.palette.grey[100],
            },
          }}
          pt={2}
          pb={2}
          pl={3}
          pr={3}
          mt={0.2}
          onClick={handleGotoDetailsFunction}
        >
          <Box>
            <Typography variant="h5">وکیل احمد عمری</Typography>
          </Box>
          <Box>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "25% 25% 25% 25%" }}
              pt={0.5}
              pb={0.5}
            >
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  3000
                </Typography>
              </Box>
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  3000
                </Typography>
              </Box>
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  افغانی
                </Typography>
              </Box>
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  3000
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "25% 25% 25% 25%" }}
              pt={0.5}
              pb={0.5}
            >
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  1000
                </Typography>
              </Box>
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  33000
                </Typography>
              </Box>
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  دالر
                </Typography>
              </Box>
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  25000
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "20% 80%",
            alignItems: "center",
            backgroundColor: theme.palette?.background.default,
            borderRadius: "0.8rem",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: theme.palette.grey[100],
            },
          }}
          pt={2}
          pb={2}
          pl={3}
          pr={3}
          mt={0.2}
          onClick={handleGotoDetailsFunction}
        >
          <Box>
            <Typography variant="h5">وکیل احمد عمری</Typography>
          </Box>
          <Box>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "25% 25% 25% 25%" }}
              pt={0.5}
              pb={0.5}
            >
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  3000
                </Typography>
              </Box>
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  3000
                </Typography>
              </Box>
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  افغانی
                </Typography>
              </Box>
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  3000
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "25% 25% 25% 25%" }}
              pt={0.5}
              pb={0.5}
            >
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  1000
                </Typography>
              </Box>
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  33000
                </Typography>
              </Box>
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  دالر
                </Typography>
              </Box>
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  25000
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "20% 80%",
            alignItems: "center",
            backgroundColor:theme.palette?.background.default,
            borderRadius: "0.8rem",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: theme.palette.grey[100],
            },
          }}
          pt={2}
          pb={2}
          pl={3}
          pr={3}
          mt={0.2}
          onClick={handleGotoDetailsFunction}
        >
          <Box>
            <Typography variant="h5">وکیل احمد عمری</Typography>
          </Box>
          <Box>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "25% 25% 25% 25%" }}
              pt={0.5}
              pb={0.5}
            >
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  3000
                </Typography>
              </Box>
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  3000
                </Typography>
              </Box>
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  افغانی
                </Typography>
              </Box>
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  3000
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "25% 25% 25% 25%" }}
              pt={0.5}
              pb={0.5}
            >
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  1000
                </Typography>
              </Box>
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  33000
                </Typography>
              </Box>
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  دالر
                </Typography>
              </Box>
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  25000
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "20% 80%",
            alignItems: "center",
            backgroundColor: theme.palette?.background.default,
            borderRadius: "0.8rem",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: theme.palette.grey[100],
            },
          }}
          pt={2}
          pb={2}
          pl={3}
          pr={3}
          mt={0.2}
          onClick={handleGotoDetailsFunction}
        >
          <Box>
            <Typography variant="h5">وکیل احمد عمری</Typography>
          </Box>
          <Box>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "25% 25% 25% 25%" }}
              pt={0.5}
              pb={0.5}
            >
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  3000
                </Typography>
              </Box>
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  3000
                </Typography>
              </Box>
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  افغانی
                </Typography>
              </Box>
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  3000
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "25% 25% 25% 25%" }}
              pt={0.5}
              pb={0.5}
            >
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  1000
                </Typography>
              </Box>
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  33000
                </Typography>
              </Box>
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  دالر
                </Typography>
              </Box>
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  25000
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "20% 80%",
            alignItems: "center",
            backgroundColor: theme.palette?.background.default,
            borderRadius: "0.8rem",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: theme.palette.grey[100],
            },
          }}
          pt={2}
          pb={2}
          pl={3}
          pr={3}
          mt={0.2}
          onClick={handleGotoDetailsFunction}
        >
          <Box>
            <Typography variant="h5">وکیل احمد عمری</Typography>
          </Box>
          <Box>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "25% 25% 25% 25%" }}
              pt={0.5}
              pb={0.5}
            >
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  3000
                </Typography>
              </Box>
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  3000
                </Typography>
              </Box>
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  افغانی
                </Typography>
              </Box>
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  3000
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "25% 25% 25% 25%" }}
              pt={0.5}
              pb={0.5}
            >
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  1000
                </Typography>
              </Box>
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  33000
                </Typography>
              </Box>
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  دالر
                </Typography>
              </Box>
              <Box
                sx={{
                  borderInlineStart: `1px solid #F5F5F5`,
                }}
              >
                <Typography variant="subtitle2" textAlign={"center"}>
                  25000
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Stack
        spacing={2}
        sx={{ justifyContent: "end", display: "grid", marginTop: "2rem" }}
      >
        {/* <Pagination count={10} shape="rounded" /> */}
        <Pagination
          count={10}
          variant="outlined"
          shape="rounded"
          color={"primary"}
        />
      </Stack>
    </Box>
  );
};
export default AllAccountsPage;
