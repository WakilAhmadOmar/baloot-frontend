"use client";
import CollapseComponent from "@/components/collapse/Collapse";
// import DateRangePickerComponent from "@/components/muiComponent/dateRangePickerComponent";
import CustomSearch from "@/components/search/CustomSearch";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputLabel,
  Pagination,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { CloseSquare, ExportSquare, Printer } from "iconsax-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateCreate } from "./Create";
import { useGetPayOffListQuery } from "@/hooks/api/transactions/queries/use-get-pay-of-list-query";
import EmptyPage from "@/components/util/emptyPage";
import { EmptyProductPageIcon } from "@/icons";
import SkeletonComponent from "../../_components/Skeleton";

type EmployeeSalary = {
  t: any;
};

const RegistrationEmployeeSalaryPage = ({ t }: EmployeeSalary) => {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const { data: payoffList, isLoading } = useGetPayOffListQuery({
    page,
    receiverType: "Employee",
  });

   const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
  };
  return (
    <Box>
      <Box pb={3}>
        <Typography variant="h3" pb={3}>
          {t?.transactions?.monthly_employee_salary_entry}
        </Typography>
        <Box display={"flex"} justifyContent={"space-between"}>
          <CreateCreate t={t} />

          <Box display={"flex"} columnGap={"2rem"} alignItems={"center"}>
            <IconButton>
              <ExportSquare color={theme.palette.primary.main} />
            </IconButton>
            <IconButton>
              <Printer color={theme.palette.primary.main} />
            </IconButton>
            <Box> {/* <DateRangePickerComponent /> */}</Box>
            <CustomSearch t={t} />
          </Box>
        </Box>
      </Box>
      <Box>
        {payoffList?.payOff?.map((item: any) => {
          return (
            <CollapseComponent
              key={item?._id}
              name={item?.receiver?.name}
              createdAt={item?.createdAt}
              messageDescription=""
              messageTitle=""
              t={t}
              // id={item?._id}
              // getIdToAddAction={handleDelteProductFunction}
              // updateProductFunction={handleUpdateProuct}
            >
              <Box
                display={"grid"}
                gridTemplateColumns={"15rem auto"}
                rowGap={"1rem"}
              >
                <Typography variant="caption">
                  {t?.transactions?.receipt_amount}
                </Typography>
                <Typography variant="caption">
                  {item?.amount} {item?.currencyId?.symbol}
                </Typography>
                <Typography variant="caption">
                  {" "}
                  {t?.transactions?.payer}{" "}
                </Typography>
                <Typography variant="caption">{item?.payerId?.name}</Typography>
                <Typography variant="caption">
                  {t?.transactions?.description}
                </Typography>
                <Typography variant="caption">{item?.description}</Typography>
              </Box>
            </CollapseComponent>
          );
        })}
      </Box>
      {isLoading && <SkeletonComponent />}
      <Box display="flex" justifyContent={"end"} mt={2}>
        <Stack spacing={2} p={1}>
          <Pagination
            count={Math.ceil(payoffList?.count / 10)}
            size={"medium"}
            shape="rounded"
            variant="outlined"
            color="primary"
            onChange={handleChangePage}
            sx={{
              fontSize: "2rem !important",
              direction: "ltr",
            }}
          />
        </Stack>
      </Box>
      {payoffList?.count === 0 && !isLoading && (
        <Box mt={"10rem"}>
          {" "}
          <EmptyPage
            icon={<EmptyProductPageIcon />}
            discription=""
            title={t?.transactions?.no_salary_has_been_recorded}
          />
        </Box>
      )}
    </Box>
  );
};

export default RegistrationEmployeeSalaryPage;
