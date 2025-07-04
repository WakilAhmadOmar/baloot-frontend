"use client";
import CollapseComponent from "@/components/collapse/Collapse";
// import DateRangePickerComponent from "@/components/muiComponent/dateRangePickerComponent";
// import CustomSearch from "@/components/search/CustomSearch";
import {
  Box,
  IconButton,
  Pagination,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {  ExportSquare, Printer } from "iconsax-react";
import { useContext, useState } from "react";
import { CreateCreate } from "./Create";
import SkeletonComponent from "../../_components/Skeleton";
import { UpdateForm } from "./Update-form";
import { AppContext } from "@/provider/appContext";
import EmptyPage from "@/components/util/emptyPage";
import { EmptyProductPageIcon } from "@/icons";
import { useGetExternalIncomeListQuery } from "@/hooks/api/transactions/queries/use-get-external-incom-list";
import { useDeleteExternalIncomeMutation } from "@/hooks/api/transactions/mutations/use-delete-external-income";
import { useTranslations } from "next-intl";

const RegistrationExpensesPage = () => {
  const t = useTranslations("transactions")
  const {setHandleError} = useContext(AppContext)
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const { data: externalIncomeList, isLoading } = useGetExternalIncomeListQuery({
    page,
  });
  const {mutate:deleteExternalIncomeMutation , isLoading:isLoadingDelete} = useDeleteExternalIncomeMutation()

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
  };

  
const handleDeleteFunction = (id:string) => {
  deleteExternalIncomeMutation({
    externalIncomeId:id
  },{
    onSuccess:({message})=>{
      setHandleError({
        open:true,
        status:"success",
        message
      })
    },
    onError:(error:any)=>{
      setHandleError({
        open:true,
        status:"error",
        message:error?.message
      })
    }
  })
}
  return (
    <Box>
      <Box pb={3}>
        <Typography variant="h3" pb={3}>
          {t("add_external_income")}
        </Typography>
        <Box display={"flex"} justifyContent={"space-between"}>
          <CreateCreate/>

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
        {externalIncomeList?.externalIncome?.map((item: any) => (
          <CollapseComponent
            key={item?._id}
            name={item?.externalIncomeTypeId?.name}
            createdAt={item?.createdAt}
            messageDescription={t("this_external_income_will_be_deleted")}
            messageTitle={t("are_you_sure_to_delete_this_external_income")}
            id={item?._id}
            getIdToAddAction={handleDeleteFunction}
            UpdateComponent={<UpdateForm item={item} />}
            isLoading={isLoadingDelete}
          >
            <Box
              display={"grid"}
              gridTemplateColumns={"15rem auto"}
              rowGap={"1rem"}
            >
              <Typography variant="caption">
                {t("receipt_amount")}
              </Typography>
              <Typography variant="caption">
                {item?.amount} {item?.currencyId?.symbol}
              </Typography>
              <Typography variant="caption">
                {t("recipient")}
              </Typography>
              <Typography variant="caption">{item?.receiver?.name}</Typography>
              <Typography variant="caption">
                {t("description")}
              </Typography>
              <Typography variant="caption">{item?.description}</Typography>
            </Box>
          </CollapseComponent>
        ))}
      </Box>
      {isLoading && <SkeletonComponent />}
      <Box display="flex" justifyContent={"end"} mt={2}>
        <Stack spacing={2} p={1}>
          <Pagination 
            count={Math.ceil(externalIncomeList?.count / 10)}
            size={"medium"}
            shape="rounded"
            variant="outlined"
            color="primary"
            page={page}
            onChange={handleChangePage}
           sx={{
              fontSize: "2rem !important",
              direction:"ltr"
            }}
          />
        </Stack>
      </Box>
      {externalIncomeList?.count === 0 && !isLoading && (
        <Box mt={"10rem"}>
          {" "}
          <EmptyPage
            icon={<EmptyProductPageIcon />}
            discription=""
            title={t("no_income_has_been_recorded")}
          />
        </Box>
      )}
    </Box>
  );
};

export default RegistrationExpensesPage;
