"use client"
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
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { ArrowRight2, ExportSquare, Printer } from "iconsax-react";
import { useRouter } from "next/router";

interface IPropsDetailsOfAccountEmployeePage {
    t:any
}


const DetailsOfAccountEmployeePage = ({t}:IPropsDetailsOfAccountEmployeePage) => {
  const theme = useTheme();
//   const router = useRouter();
  const handleBackFunction = () => {
    // router.push({ pathname: "/financialReports/employeeAccounts" });
  };
  return (
    <Box>
      <Box
        display={"flex"}
        columnGap={2}
        alignItems={"center"}
        sx={{ cursor: "pointer" }}
        onClick={handleBackFunction}
      >
        <ArrowRight2 size={20}/>
        <Typography variant="h3">صورت حساب فریدون سادات</Typography>
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
          <InputLabel>ارز</InputLabel>
          <Select size="small" value={1} sx={{ bgcolor: theme.palette.background.default, }}>
            <MenuItem value={1}>همه</MenuItem>
            <MenuItem>دالر</MenuItem>
            <MenuItem>افغانی</MenuItem>
          </Select>
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
        </Box>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table
            sx={{
              minWidth: 650,
              fontWeight: 400,
              fontSize: "1.4rem",
              boxShadow: "none",
            }}
            aria-label="simple table"
          >
            <TableHead sx={{ bgcolor: theme.palette.background.default, }}>
              <TableRow>
                <TableCell align="right" width={"20%"}>
                  توضیحات
                </TableCell>
                <TableCell align="right">دبیت</TableCell>
                <TableCell align="right">کردیت</TableCell>
                <TableCell align="right">الباقی</TableCell>
                <TableCell align="right">ارز</TableCell>
                <TableCell align="right">ارز محاسبه شده</TableCell>
                <TableCell align="right">تاریخ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {rows.map((row) => ( */}
              <TableRow
                // key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">فاکتور فروش</TableCell>
                <TableCell align="right">4000</TableCell>
                <TableCell align="right">0</TableCell>
                <TableCell align="right">1000</TableCell>
                <TableCell align="right">افغانی </TableCell>
                <TableCell align="right">افغانی </TableCell>
                <TableCell align="right">1402/12/20</TableCell>
              </TableRow>
              <TableRow
                // key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">فاکتور فروش</TableCell>
                <TableCell align="right">4000</TableCell>
                <TableCell align="right">0</TableCell>
                <TableCell align="right">1000</TableCell>
                <TableCell align="right">افغانی </TableCell>
                <TableCell align="right">افغانی </TableCell>
                <TableCell align="right">1402/12/20</TableCell>
              </TableRow>
              <TableRow
                // key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">فاکتور فروش</TableCell>
                <TableCell align="right">4000</TableCell>
                <TableCell align="right">0</TableCell>
                <TableCell align="right">1000</TableCell>
                <TableCell align="right">افغانی </TableCell>
                <TableCell align="right">افغانی </TableCell>
                <TableCell align="right">1402/12/20</TableCell>
              </TableRow>
              <TableRow
                // key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">فاکتور فروش</TableCell>
                <TableCell align="right">4000</TableCell>
                <TableCell align="right">0</TableCell>
                <TableCell align="right">1000</TableCell>
                <TableCell align="right">افغانی </TableCell>
                <TableCell align="right">افغانی </TableCell>
                <TableCell align="right">1402/12/20</TableCell>
              </TableRow>
              <TableRow
                // key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">فاکتور فروش</TableCell>
                <TableCell align="right">4000</TableCell>
                <TableCell align="right">0</TableCell>
                <TableCell align="right">1000</TableCell>
                <TableCell align="right">افغانی </TableCell>
                <TableCell align="right">افغانی </TableCell>
                <TableCell align="right">1402/12/20</TableCell>
              </TableRow>
              <TableRow
                // key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">فاکتور فروش</TableCell>
                <TableCell align="right">4000</TableCell>
                <TableCell align="right">0</TableCell>
                <TableCell align="right">1000</TableCell>
                <TableCell align="right">افغانی </TableCell>
                <TableCell align="right">افغانی </TableCell>
                <TableCell align="right">1402/12/20</TableCell>
              </TableRow>
              <TableRow
                // key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">فاکتور فروش</TableCell>
                <TableCell align="right">4000</TableCell>
                <TableCell align="right">0</TableCell>
                <TableCell align="right">1000</TableCell>
                <TableCell align="right">افغانی </TableCell>
                <TableCell align="right">افغانی </TableCell>
                <TableCell align="right">1402/12/20</TableCell>
              </TableRow>
              <TableRow
                // key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">فاکتور فروش</TableCell>
                <TableCell align="right">4000</TableCell>
                <TableCell align="right">0</TableCell>
                <TableCell align="right">1000</TableCell>
                <TableCell align="right">افغانی </TableCell>
                <TableCell align="right">افغانی </TableCell>
                <TableCell align="right">1402/12/20</TableCell>
              </TableRow>
              <TableRow
                // key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">فاکتور فروش</TableCell>
                <TableCell align="right">4000</TableCell>
                <TableCell align="right">0</TableCell>
                <TableCell align="right">1000</TableCell>
                <TableCell align="right">افغانی </TableCell>
                <TableCell align="right">افغانی </TableCell>
                <TableCell align="right">1402/12/20</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
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
      <Box
        display={"grid"}
        gridTemplateColumns={"6rem auto"}
        alignItems={"center"}
        mt={2}
      >
        <Typography variant="subtitle2">افغانی</Typography>
        <Box
          display={"grid"}
          gridTemplateColumns={"32.5% 32.5% 32.5%"}
          justifyContent={"space-between"}
        >
          <Box
            display={"grid"}
            gridTemplateColumns={"50% 50%"}
            alignItems={"center"}
            sx={{
              border: `1px solid ${theme.palette.grey[200]}`,
              overflow: "hidden",
            }}
            borderRadius={"8px"}
          >
            <Typography p={1.5} variant="subtitle2">
              موجودی دیبت
            </Typography>
            <Box bgcolor={theme.palette.background.default} height={"100%"} p={1.5}>
              <Typography variant="subtitle2">8050</Typography>
            </Box>
          </Box>
          <Box
            display={"grid"}
            gridTemplateColumns={"50% 50%"}
            alignItems={"center"}
            sx={{
              border: `1px solid ${theme.palette.grey[200]}`,
              overflow: "hidden",
            }}
            borderRadius={"8px"}
          >
            <Typography p={1.5} variant="subtitle2">
              موجودی کریدت
            </Typography>
            <Box bgcolor={theme.palette.background.default} height={"100%"} p={1.5}>
              <Typography variant="subtitle2">8050</Typography>
            </Box>
          </Box>
          <Box
            display={"grid"}
            gridTemplateColumns={"50% 50%"}
            alignItems={"center"}
            sx={{
              border: `1px solid ${theme.palette.grey[200]}`,
              overflow: "hidden",
            }}
            borderRadius={"8px"}
          >
            <Typography p={1.5} variant="subtitle2">
              الباقی
            </Typography>
            <Box bgcolor={theme.palette.background.default} height={"100%"} p={1.5}>
              <Typography variant="subtitle2">8050</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        display={"grid"}
        gridTemplateColumns={"6rem auto"}
        alignItems={"center"}
        mt={2}
      >
        <Typography variant="subtitle2">دالر</Typography>
        <Box
          display={"grid"}
          gridTemplateColumns={"32.5% 32.5% 32.5%"}
          justifyContent={"space-between"}
        >
          <Box
            display={"grid"}
            gridTemplateColumns={"50% 50%"}
            alignItems={"center"}
            sx={{
              border: `1px solid ${theme.palette.grey[200]}`,
              overflow: "hidden",
            }}
            borderRadius={"8px"}
          >
            <Typography p={1.5} variant="subtitle2">
              موجودی دیبت
            </Typography>
            <Box bgcolor={theme.palette.background.default} height={"100%"} p={1.5}>
              <Typography variant="subtitle2">8050</Typography>
            </Box>
          </Box>
          <Box
            display={"grid"}
            gridTemplateColumns={"50% 50%"}
            alignItems={"center"}
            sx={{
              border: `1px solid ${theme.palette.grey[200]}`,
              overflow: "hidden",
            }}
            borderRadius={"8px"}
          >
            <Typography p={1.5} variant="subtitle2">
              موجودی کریدت
            </Typography>
            <Box bgcolor={theme.palette.background.default} height={"100%"} p={1.5}>
              <Typography variant="subtitle2">8050</Typography>
            </Box>
          </Box>
          <Box
            display={"grid"}
            gridTemplateColumns={"50% 50%"}
            alignItems={"center"}
            sx={{
              border: `1px solid ${theme.palette.grey[200]}`,
              overflow: "hidden",
            }}
            borderRadius={"8px"}
          >
            <Typography p={1.5} variant="subtitle2">
              الباقی
            </Typography>
            <Box bgcolor={theme.palette.background.default} height={"100%"} p={1.5}>
              <Typography variant="subtitle2">8050</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailsOfAccountEmployeePage;
DetailsOfAccountEmployeePage.requireAuth = true;
