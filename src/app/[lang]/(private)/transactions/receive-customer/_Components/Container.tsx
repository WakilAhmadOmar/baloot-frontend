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
import { useGetReceiveListQuery } from "@/hooks/api/transactions/queries/use-get-receive-list-query";
import { useDeleteReceiveMutation } from "@/hooks/api/transactions/mutations/use-delete-receive-mutation";
import { useContext, useState } from "react";
import { AppContext } from "@/provider/appContext";
import SkeletonComponent from "../../_components/Skeleton";
import UpdateForm from "./Update";

interface IProps {
  t: any;
}

const ReceiveCashContainer: React.FC<IProps> = ({ t }) => {
  const theme = useTheme();
  const {setHandleError} = useContext(AppContext)
  const [updateItem , setUpdateItem] = useState<any>()

  const {data , isLoading} = useGetReceiveListQuery({page:1})
  const {mutate } = useDeleteReceiveMutation()

  console.log("data" , data)


const handleDeleteFunction = (id:string) => {
  mutate({
    receiveId:id
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

// const handleUpdateFunction = (id:string) => {
//   const findReceive = data?.receive?.filter((item:any) => item?._id === id)
//   setUpdateItem(findReceive?.[0])
// }

  return (
    <Box>
      {/* { updateItem?._id && <UpdateForm t={t} receiveTransition={updateItem} closeDialog={()=>setUpdateItem(null)}/>} */}
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
        {
          data?.receive?.map((item:any) => {
            return(
        <CollapseComponent
          key={item?._id}
          name={item?.customerId?.fullName}
          createdAt={item?.createdAt}
          t={t}
          messageDescription={t?.transactions?.description_delete_message}
          messageTitle={t?.transactions?.title_delete_message}
          id={item?._id}
          getIdToAddAction={handleDeleteFunction}
          // updateProductFunction={handleUpdateFunction}
          UpdateComponent={<UpdateForm t={t} item={item} />}
        >
          <Box
            display={"grid"}
            gridTemplateColumns={"15rem auto"}
            rowGap={"1rem"}
          >
            <Typography variant="caption">
              {t?.transactions?.received_amount}
            </Typography>
            <Typography variant="caption">{item?.amount} {item?.currencyId?.symbol}</Typography>
            <Typography variant="caption">
              {t?.transactions?.calculated_amount}
            </Typography>
            <Typography variant="caption">{item?.amountCalculated} {item?.calculatedTo?.symbol}</Typography>
            <Typography variant="caption">
              {t?.transactions?.recipient}
            </Typography>
            <Typography variant="caption">{item?.receiver?.name}</Typography>
            <Typography variant="caption">
              {t?.transactions?.description}
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
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default ReceiveCashContainer;
