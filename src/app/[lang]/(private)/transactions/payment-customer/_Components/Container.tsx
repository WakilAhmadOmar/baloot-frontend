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
import { useGetCustomerPayOffListQuery } from "@/hooks/api/transactions/queries/use-get-customer-pay-off-list-query";
import EmptyPage from "@/components/util/emptyPage";
import { EmptyProductPageIcon } from "@/icons";
import { useDeleteCustomerPayOffMutation } from "@/hooks/api/transactions/mutations/use-delete-customer-pay-off";

interface IProps {
  t: any;
}

const ReceiveCashContainer: React.FC<IProps> = ({ t }) => {
  const theme = useTheme();
  const { setHandleError } = useContext(AppContext);

  const { data, isLoading } = useGetCustomerPayOffListQuery({ page: 1 });
  const { mutate, isLoading: deleteIsLoading } = useDeleteCustomerPayOffMutation();

  const handleDeleteFunction = (id: string) => {
    mutate(
      {
        payOffId: id,
      },
      {
        onSuccess: ({ message }) => {
          setHandleError({
            open: true,
            type: "success",
            message,
          });
        },
      }
    );
  };

  return (
    <Box>
      <Box pb={3}>
        <Typography variant="h3" pb={3}>
          {t?.transactions?.cash_payment_to_customer}
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
            {/* <CustomSearch t={t} /> */}
          </Box>
        </Box>
      </Box>
      <Box>
        {data?.customerPayOff?.map((item: any) => {
          return (
            <CollapseComponent
              key={item?._id}
              name={item?.receiver?.fullName}
              createdAt={item?.createdAt}
              t={t}
              messageDescription={t?.transactions?.description_delete_message}
              messageTitle={t?.transactions?.title_delete_message}
              id={item?._id}
              getIdToAddAction={handleDeleteFunction}
              UpdateComponent={<UpdateForm t={t} item={item} />}
              isLoading={deleteIsLoading}
            >
              <Box
                display={"grid"}
                gridTemplateColumns={"15rem auto"}
                rowGap={"1rem"}
              >
                <Typography variant="caption">
                  {t?.transactions?.payed_amount}
                </Typography>
                <Typography variant="caption">
                  {item?.amount} {item?.currencyId?.symbol}
                </Typography>
                <Typography variant="caption">
                  {t?.transactions?.calculated_amount}
                </Typography>
                <Typography variant="caption">
                  {item?.amountCalculated} {item?.calculatedTo?.symbol}
                </Typography>
                <Typography variant="caption">
                  {t?.transactions?.recipient}
                </Typography>
                <Typography variant="caption">
                  {item?.receiver?.fullName}
                </Typography>
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
      {data?.count > 9 && (
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
                direction: "rtl",
              }}
            />
          </Stack>
        </Box>
      )}
      {data?.count === 0 && !isLoading && (
        <Box mt={"10rem"}>
          {" "}
          <EmptyPage
            icon={<EmptyProductPageIcon />}
            discription=""
            title={t?.transactions?.no_payments_have_been_recorded}
          />
        </Box>
      )}
    </Box>
  );
};

export default ReceiveCashContainer;
