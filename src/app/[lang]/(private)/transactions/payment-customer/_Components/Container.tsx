"use client";
import CollapseComponent from "@/components/collapse/Collapse";
// import DateRangePickerComponent from "@/components/muiComponent/dateRangePickerComponent";
import CustomSearch from "@/components/search/CustomSearch";
import {
  Box,
  IconButton,
  Pagination,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { ExportSquare, Printer } from "iconsax-react";
import CreateComponent from "./Create";

interface IProps {
  t: any;
}

const PaymentCashContainer: React.FC<IProps> = ({ t }) => {
  const theme = useTheme();

  return (
    <Box>
      <Box pb={3}>
        <Typography variant="h3" pb={3}>
          {t?.transactions?.cash_receipt_from_customer}
        </Typography>
        <Box display={"flex"} justifyContent={"space-between"}>
          <CreateComponent t={t} />

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
        <CollapseComponent
          key={`${1}`}
          name={"محمد رضا غلامی"}
          createdAt={"1402/2/23"}
          t={t}
          messageDescription={t?.transactions?.description_delete_message}
          messageTitle={t?.transactions?.title_delete_message}
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
              {t?.transactions?.received_amount}
            </Typography>
            <Typography variant="caption">1250 دالر</Typography>
            <Typography variant="caption">
              {t?.transactions?.calculated_amount}
            </Typography>
            <Typography variant="caption">334$</Typography>
            <Typography variant="caption">
              {t?.transactions?.recipient}
            </Typography>
            <Typography variant="caption">صندوق مرکزی</Typography>
            <Typography variant="caption">
              {t?.transactions?.description}
            </Typography>
            <Typography variant="caption">
              ای مبلغ از جناب محمد رضا بهرامی گرفته شده و به صندوق مرکزی گذاشته
              شده
            </Typography>
          </Box>
        </CollapseComponent>
        <CollapseComponent
          key={`${1}`}
          name={"محمد رضا غلامی"}
          createdAt={"1402/2/23"}
          t={t}
          messageDescription={t?.transactions?.description_delete_message}
          messageTitle={t?.transactions?.title_delete_message}
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
              {t?.transactions?.received_amount}
            </Typography>
            <Typography variant="caption">1250 دالر</Typography>
            <Typography variant="caption">
              {t?.transactions?.calculated_amount}
            </Typography>
            <Typography variant="caption">334$</Typography>
            <Typography variant="caption">
              {t?.transactions?.recipient}
            </Typography>
            <Typography variant="caption">صندوق مرکزی</Typography>
            <Typography variant="caption">
              {t?.transactions?.description}
            </Typography>
            <Typography variant="caption">
              ای مبلغ از جناب محمد رضا بهرامی گرفته شده و به صندوق مرکزی گذاشته
              شده
            </Typography>
          </Box>
        </CollapseComponent>
        <CollapseComponent
          key={`${1}`}
          name={"محمد رضا غلامی"}
          createdAt={"1402/2/23"}
          t={t}
          messageDescription={t?.transactions?.description_delete_message}
          messageTitle={t?.transactions?.title_delete_message}
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
              {t?.transactions?.received_amount}
            </Typography>
            <Typography variant="caption">1250 دالر</Typography>
            <Typography variant="caption">
              {t?.transactions?.calculated_amount}
            </Typography>
            <Typography variant="caption">334$</Typography>
            <Typography variant="caption">
              {t?.transactions?.recipient}
            </Typography>
            <Typography variant="caption">صندوق مرکزی</Typography>
            <Typography variant="caption">
              {t?.transactions?.description}
            </Typography>
            <Typography variant="caption">
              ای مبلغ از جناب محمد رضا بهرامی گرفته شده و به صندوق مرکزی گذاشته
              شده
            </Typography>
          </Box>
        </CollapseComponent>
        <CollapseComponent
          key={`${1}`}
          name={"محمد رضا غلامی"}
          createdAt={"1402/2/23"}
          t={t}
          messageDescription={t?.transactions?.description_delete_message}
          messageTitle={t?.transactions?.title_delete_message}
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
              {t?.transactions?.received_amount}
            </Typography>
            <Typography variant="caption">1250 دالر</Typography>
            <Typography variant="caption">
              {t?.transactions?.calculated_amount}
            </Typography>
            <Typography variant="caption">334$</Typography>
            <Typography variant="caption">
              {t?.transactions?.recipient}
            </Typography>
            <Typography variant="caption">صندوق مرکزی</Typography>
            <Typography variant="caption">
              {t?.transactions?.description}
            </Typography>
            <Typography variant="caption">
              ای مبلغ از جناب محمد رضا بهرامی گرفته شده و به صندوق مرکزی گذاشته
              شده
            </Typography>
          </Box>
        </CollapseComponent>
        <CollapseComponent
          key={`${1}`}
          name={"محمد رضا غلامی"}
          createdAt={"1402/2/23"}
          t={t}
          messageDescription={t?.transactions?.description_delete_message}
          messageTitle={t?.transactions?.title_delete_message}
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
              {t?.transactions?.received_amount}
            </Typography>
            <Typography variant="caption">1250 دالر</Typography>
            <Typography variant="caption">
              {t?.transactions?.calculated_amount}
            </Typography>
            <Typography variant="caption">334$</Typography>
            <Typography variant="caption">
              {t?.transactions?.recipient}
            </Typography>
            <Typography variant="caption">صندوق مرکزی</Typography>
            <Typography variant="caption">
              {t?.transactions?.description}
            </Typography>
            <Typography variant="caption">
              ای مبلغ از جناب محمد رضا بهرامی گرفته شده و به صندوق مرکزی گذاشته
              شده
            </Typography>
          </Box>
        </CollapseComponent>
        <CollapseComponent
          key={`${1}`}
          name={"محمد رضا غلامی"}
          createdAt={"1402/2/23"}
          t={t}
          messageDescription={t?.transactions?.description_delete_message}
          messageTitle={t?.transactions?.title_delete_message}
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
              {t?.transactions?.received_amount}
            </Typography>
            <Typography variant="caption">1250 دالر</Typography>
            <Typography variant="caption">
              {t?.transactions?.calculated_amount}
            </Typography>
            <Typography variant="caption">334$</Typography>
            <Typography variant="caption">
              {t?.transactions?.recipient}
            </Typography>
            <Typography variant="caption">صندوق مرکزی</Typography>
            <Typography variant="caption">
              {t?.transactions?.description}
            </Typography>
            <Typography variant="caption">
              ای مبلغ از جناب محمد رضا بهرامی گرفته شده و به صندوق مرکزی گذاشته
              شده
            </Typography>
          </Box>
        </CollapseComponent>
        <CollapseComponent
          key={`${1}`}
          name={"محمد رضا غلامی"}
          createdAt={"1402/2/23"}
          t={t}
          messageDescription={t?.transactions?.description_delete_message}
          messageTitle={t?.transactions?.title_delete_message}
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
              {t?.transactions?.received_amount}
            </Typography>
            <Typography variant="caption">1250 دالر</Typography>
            <Typography variant="caption">
              {t?.transactions?.calculated_amount}
            </Typography>
            <Typography variant="caption">334$</Typography>
            <Typography variant="caption">
              {t?.transactions?.recipient}
            </Typography>
            <Typography variant="caption">صندوق مرکزی</Typography>
            <Typography variant="caption">
              {t?.transactions?.description}
            </Typography>
            <Typography variant="caption">
              ای مبلغ از جناب محمد رضا بهرامی گرفته شده و به صندوق مرکزی گذاشته
              شده
            </Typography>
          </Box>
        </CollapseComponent>
        <CollapseComponent
          key={`${1}`}
          name={"محمد رضا غلامی"}
          createdAt={"1402/2/23"}
          t={t}
          messageDescription={t?.transactions?.description_delete_message}
          messageTitle={t?.transactions?.title_delete_message}
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
              {t?.transactions?.received_amount}
            </Typography>
            <Typography variant="caption">1250 دالر</Typography>
            <Typography variant="caption">
              {t?.transactions?.calculated_amount}
            </Typography>
            <Typography variant="caption">334$</Typography>
            <Typography variant="caption">
              {t?.transactions?.recipient}
            </Typography>
            <Typography variant="caption">صندوق مرکزی</Typography>
            <Typography variant="caption">
              {t?.transactions?.description}
            </Typography>
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
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default PaymentCashContainer;
