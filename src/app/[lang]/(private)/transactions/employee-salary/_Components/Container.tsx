"use client";
import CollapseComponent from "@/components/collapse/Collapse";
// import DateRangePickerComponent from "@/components/muiComponent/dateRangePickerComponent";
import CustomSearch from "@/components/search/CustomSearch";
import {
  Box,
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
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { CreateCreate } from "./Create";
import { useGetPayToCustomerListQuery } from "@/hooks/api/transactions/queries/use-get-pay-to-customer-list-query";
import EmptyPage from "@/components/util/emptyPage";
import { EmptyProductPageIcon } from "@/icons";
import SkeletonComponent from "../../_components/Skeleton";
import { useTranslations } from "next-intl";
import { useGetEmployeeSalaryListQuery } from "@/hooks/api/transactions/queries/use-get-employee-salary-list";
import { UpdateEmployeeSalary } from "./Update";
import { useDeleteReceiveFromEmployeeMutation } from "@/hooks/api/transactions/mutations/use-delete-receive-from_employee";
import { AppContext } from "@/provider/appContext";

const RegistrationEmployeeSalaryPage = () => {
  const t = useTranslations("transactions")
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const { setHandleError } = useContext(AppContext);
  const { data: paySalaryList, isLoading } = useGetEmployeeSalaryListQuery({
    page,
    // receiverType: "Employee",
  });

  const { mutate: deleteSalaryMutation , isLoading: deleteIsLoading  } = useDeleteReceiveFromEmployeeMutation();

   const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
  };

  const handleDeleteSalaryFunction = (id: string) => {
    // Call the delete mutation here
    // For example:
    deleteSalaryMutation({ receiveId: id }, {
      onSuccess: ({ message }) => {
        setHandleError({
          open: true,
          status: "success",
          message,
        });
      },
      onError: (error:any) => {
        setHandleError({
          open: true,
          status: "error",
          message: error.message,
        });
      },
    });
  };
  return (
    <Box>
      <Box pb={3}>
        <Typography variant="h3" pb={3}>
          {t("monthly_employee_salary_entry")}
        </Typography>
        <Box display={"flex"} justifyContent={"space-between"}>
          <CreateCreate  />

          <Box display={"flex"} columnGap={"2rem"} alignItems={"center"}>
            <IconButton>
              <ExportSquare color={theme.palette.primary.main} />
            </IconButton>
            <IconButton>
              <Printer color={theme.palette.primary.main} />
            </IconButton>
            <Box> {/* <DateRangePickerComponent /> */}</Box>
            {/* <CustomSearch  /> */}
          </Box>
        </Box>
      </Box>
      <Box>
        {paySalaryList?.receive?.map((item: any) => {
          return (
            <CollapseComponent
              key={item?._id}
              name={item?.payerId?.name}
              createdAt={item?.createdAt}
              messageDescription={t("this_salary_will_be_deleted")}
              messageTitle={t("are_you_sure_to_delete_this_salary")}
              UpdateComponent={<UpdateEmployeeSalary salary={item} />}
              
              id={item?._id}
              getIdToAddAction={handleDeleteSalaryFunction}
              isLoading={deleteIsLoading}

            >
              <Box
                display={"grid"}
                gridTemplateColumns={"15rem auto"}
                rowGap={"1rem"}
              >
                <Typography variant="caption">
                  {t("salary_amount")}
                </Typography>
                <Typography variant="caption">
                  {item?.amount} {item?.currencyId?.symbol}
                </Typography>
                <Typography variant="caption">
                  {" "}
                  {t("recipient")}{" "}
                </Typography>
                <Typography variant="caption">{item?.receiver?.name}</Typography>
                <Typography variant="caption">
                  {t("description")}
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
            count={Math.ceil(paySalaryList?.count / 10)}
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
      {paySalaryList?.count === 0 && !isLoading && (
        <Box mt={"10rem"}>
          {" "}
          <EmptyPage
            icon={<EmptyProductPageIcon />}
            discription=""
            title={t("no_salary_has_been_recorded")}
          />
        </Box>
      )}
    </Box>
  );
};

export default RegistrationEmployeeSalaryPage;
