"use client"
// import DateRangePickerComponent from "@/components/muiComponent/dateRangePickerComponent";
// import CustomSearch from "@/components/muiComponent/search";
import {
  Box,
  Pagination,
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

const ExpensesAccountsPage = ({t}:{t:any}) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography variant="h3">صورت حساب مصارفات</Typography>
      <Box
        display={"flex"}
        columnGap={"1rem"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        mb={2}
        mt={2}
      >
        <Box display={"flex"} justifyItems={"center"}>
          {/* <DateRangePickerComponent /> */}
        </Box>
        <Box pt={1}>
          {/* <CustomSearch getTextSearchFunction={() => {}} /> */}
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
            <TableHead sx={{ bgcolor: theme.palette.background.default }}>
              <TableRow>
                <TableCell align="right" width={"20%"}>
                  توضیحات
                </TableCell>
                <TableCell align="right">دبیت</TableCell>
                <TableCell align="right">کردیت</TableCell>
                <TableCell align="right">الباقی</TableCell>
                <TableCell align="right">ارز</TableCell>
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
                <TableCell align="right">1402/12/20</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box>دیبت و کردیت</Box>
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

export default ExpensesAccountsPage;
ExpensesAccountsPage.requireAuth = true;
