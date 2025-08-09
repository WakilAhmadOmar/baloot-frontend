"use client";
import CollapseComponent from "@/components/collapse/Collapse";;
import {
  Box,
  IconButton,
  Pagination,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { ExportSquare, Printer } from "iconsax-react";
import { useContext, useState } from "react";
import { CreateCreate } from "./Create";
import { useGetConsumptionListQuery } from "@/hooks/api/transactions/queries/use-get-consumption-list";
import SkeletonComponent from "../../_components/Skeleton";
import { UpdateForm } from "./Update-form";
import { useDeleteConsumptionMutation } from "@/hooks/api/transactions/mutations/use-delete-consumption-mutation";
import { AppContext } from "@/provider/appContext";
import EmptyPage from "@/components/util/emptyPage";
import { EmptyProductPageIcon } from "@/icons";
import { useTranslations } from "next-intl";

const RegistrationExpensesPage = () => {
  const t = useTranslations("transactions")
  const {setHandleError} = useContext(AppContext)
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const { data: consumptionList, isLoading } = useGetConsumptionListQuery({
    page,
  });
  const {mutate:deleteConsumptionMutation , isLoading:deleteIsLoading} = useDeleteConsumptionMutation()

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
  };

  
const handleDeleteFunction = (id:string) => {
  deleteConsumptionMutation({
    consumptionId:id
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
          {t("consumptions")}
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
            {/* <CustomSearch t={t} /> */}
          </Box>
        </Box>
      </Box>
      <Box>
        {consumptionList?.consumption?.map((item: any) => (
          <CollapseComponent
            key={item?._id}
            name={item?.consumptionTypeId?.name}
            createdAt={item?.createdAt}
            messageDescription={t("this_expense_will_be_deleted")}
            messageTitle={t("are_you_sure_to_delete_this_expense")}
            id={item?._id}
            getIdToAddAction={handleDeleteFunction}
            UpdateComponent={<UpdateForm item={item} />}
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
              <Typography variant="caption">
                {item?.amount} {item?.currencyId?.symbol}
              </Typography>
              <Typography variant="caption">
                {t("payer")}
              </Typography>
              <Typography variant="caption">{item?.payer?.name}</Typography>
              <Typography variant="caption">
                {t("description")}
              </Typography>
              <Typography variant="caption">{item?.description}</Typography>
            </Box>
          </CollapseComponent>
        ))}
      </Box>
      {isLoading && <SkeletonComponent />}
     {consumptionList?.count > 9 && <Box display="flex" justifyContent={"end"} mt={2}>
        <Stack spacing={2} p={1}>
          <Pagination 
            count={Math.ceil(consumptionList?.count / 10)}
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
      </Box>}
      {consumptionList?.count === 0 && !isLoading && (
        <Box mt={"10rem"}>
          {" "}
          <EmptyPage
            icon={<EmptyProductPageIcon />}
            discription=""
            title={t("no_expenses_have_been_recorded")}
          />
        </Box>
      )}
    </Box>
  );
};

export default RegistrationExpensesPage;
