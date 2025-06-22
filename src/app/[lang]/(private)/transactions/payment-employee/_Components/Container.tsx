"use client";
import CollapseComponent from "@/components/collapse/Collapse";
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
import { useContext } from "react";
import { AppContext } from "@/provider/appContext";
import SkeletonComponent from "../../_components/Skeleton";
import UpdateForm from "./Update";
import EmptyPage from "@/components/util/emptyPage";
import { EmptyProductPageIcon } from "@/icons";
import { useGetPayToEmployeeListQuery } from "@/hooks/api/transactions/queries/use-get-employee-pay-off-list-query";
import { useDeletePayToEmployeeMutation } from "@/hooks/api/transactions/mutations/use-delete-employee-pay-off";
import { useTranslations } from "next-intl";



const ReceiveCashContainer = () => {
  const t = useTranslations("transactions")
  const theme = useTheme();
  const {setHandleError} = useContext(AppContext)

  const {data , isLoading} = useGetPayToEmployeeListQuery({page:1})
  const {mutate , isLoading:deleteIsLoading } = useDeletePayToEmployeeMutation()

const handleDeleteFunction = (id:string) => {
  mutate({
    payOffId:id
  },{
    onSuccess:({message})=>{
      setHandleError({
        open:true,
        type:"success",
        message
      })
    }
  })
}

  return (
    <Box>
      <Box pb={3}>
        <Typography variant="h3" pb={3}>
          {t("cash_payment_to_employees")}
        </Typography>
        <Box display={"flex"} justifyContent={"space-between"}>
          <CreateComponent  />

          <Box display={"flex"} columnGap={"2rem"} alignItems={"center"}>
            <IconButton>
              <ExportSquare color={theme.palette.primary.main} />
            </IconButton>
            <IconButton>
              <Printer color={theme.palette.primary.main} />
            </IconButton>
            <Box> {/* <DateRangePickerComponent /> */}</Box>
            {/* <CustomSearch t={t} /> */}
          </Box>
        </Box>
      </Box>
      <Box>
        {
          data?.employeePayOff?.map((item:any) => {
            return(
        <CollapseComponent
          key={item?._id}
          name={item?.receiver?.name}
          createdAt={item?.createdAt}
          messageDescription={t("description_delete_message")}
          messageTitle={t("title_delete_message")}
          id={item?._id}
          getIdToAddAction={handleDeleteFunction}
          UpdateComponent={<UpdateForm  item={item} />}
          isLoading={deleteIsLoading}
        >
          <Box
            display={"grid"}
            gridTemplateColumns={"15rem auto"}
            rowGap={"1rem"}
          >
            <Typography variant="caption">
              {t("payed_amount")}
            </Typography>
            <Typography variant="caption">{item?.amount} {item?.currencyId?.symbol}</Typography>
            <Typography variant="caption">
              {t("calculated_amount")}
            </Typography>
            <Typography variant="caption">{item?.amountCalculated} {item?.calculatedTo?.symbol}</Typography>
            <Typography variant="caption">
              {t("recipient")}
            </Typography>
            <Typography variant="caption">{item?.payerId?.name}</Typography>
            <Typography variant="caption">
              {t("description")}
            </Typography>
            <Typography variant="caption">
              {item?.description}
            </Typography>
          </Box>
        </CollapseComponent>

            )
          })
        }
      </Box>
      {isLoading && <SkeletonComponent />}
      <Box display="flex" justifyContent={"end"} mt={2}>
        <Stack spacing={2} p={1}>
          <Pagination
            count={Math.ceil(data?.count / 10)}
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
      {data?.count===0  && !isLoading && (
        <Box mt={"10rem"}>
          {" "}
          <EmptyPage
            icon={<EmptyProductPageIcon />}
            discription=""
            title={t("no_payments_have_been_recorded")}
          />
        </Box>
      )}
    </Box>
  );
};

export default ReceiveCashContainer;
