"use client"
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

type EmployeeSalary = {
  t:any
}

const RegistrationEmployeeSalaryPage = ({t}:EmployeeSalary) => {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    setValue,
    getFieldState,
  } = useForm();
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialogFunction = () => {
    setOpenDialog(!openDialog);
  };
  const onSubmitFunction = (data: any) => {};
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
            <Box>
              {" "}
              {/* <DateRangePickerComponent /> */}
            </Box>
            <CustomSearch  t={t}/>
          </Box>
        </Box>
      </Box>
      <Box>
        <CollapseComponent
          key={`${1}`}
          name={"محمد رضا غلامی"}
          createdAt={"1402/2/23"}
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
            <Typography variant="caption">مقدار دریافتی</Typography>
            <Typography variant="caption">1250 دالر</Typography>
            <Typography variant="caption">ارز</Typography>
            <Typography variant="caption">دالر</Typography>
            <Typography variant="caption">دریافت کننده </Typography>
            <Typography variant="caption">صندوق مرکزی</Typography>
            <Typography variant="caption">توضیحات</Typography>
            <Typography variant="caption">
              ای مبلغ از جناب محمد رضا بهرامی گرفته شده و به صندوق مرکزی گذاشته
              شده
            </Typography>
          </Box>
        </CollapseComponent>
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
              direction:"ltr"
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default RegistrationEmployeeSalaryPage;

