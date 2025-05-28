"use client";
import AddCashboxAccounts from "./Create";
import CollapseComponent from "@/components/collapse/Collapse";
import CustomSearch from "@/components/search/CustomSearch";
import { AppContext } from "@/provider/appContext";
import { Box, Pagination, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import SkeletonComponent from "./Skeleton";
import { useGetCustomerListQuery } from "@/hooks/api/definitions/customer/queries/use-get-customer-list-query";
import { useAddFirstPeriodOfCreditMutation } from "@/hooks/api/accounts/mutations/use-add-first-period-of-credit-mutation";
import EmptyPage from "@/components/util/emptyPage";
import { EmptyProductPageIcon } from "@/icons";
import { UpdateCustomerAccounts } from "./Update";

interface IPropsBankAccountPages {
  t: any;
}

const CashboxPage: React.FC<IPropsBankAccountPages> = ({ t }) => {
  const { setHandleError } = useContext(AppContext);

  const [page, setPage] = useState(1);
  const { data: customerList, isLoading } = useGetCustomerListQuery({ page });

  const { mutate: addFirstPeriodMutation, isLoading: deleteLoading } =
    useAddFirstPeriodOfCreditMutation();

  const handleDeleteAccount = (id: string) => {
    const variables = {
      creditObject: [],
      accountType: "Customer",
      accountId: id,
    };

    addFirstPeriodMutation(variables, {
      onSuccess: ({ message }: any) => {
        setHandleError({
          message: message ?? "",
          type: "success",
          open: true,
        });
      },
      onError: (error: any) => {
        setHandleError({
          open: true,
          message: error?.message,
          type: "error",
        });
      },
    });
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  return (
    <Box>
      <Typography variant="h3">
        {t?.pages?.Customers?.list_of_customer_accounts}
      </Typography>

      <Box display={"flex"} justifyContent={"space-between"} mt={4}>
        <Box display={"flex"} width={"100%"}>
          <AddCashboxAccounts t={t} />
        </Box>
        {/* {( customerDetails?.count > 0) && (
          <Box>
            <CustomSearch t={t} getTextSearchFunction={handleSearchItem} />
          </Box>
        )} */}
      </Box>
      {/* {textSearchState !== "" &&
        !loadingPage &&
        customerDetails?.data?.length === 0 && (
          <Box
            display={"grid"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"100%"}
            mt={7}
          >
            <NotFoundIcon />
            <Typography textAlign={"center"} variant="h6" mt={2}>
              {t?.product?.nothing_found}
            </Typography>
          </Box>
        )} */}

      {customerList?.count === 0 && isLoading === false && (
        <Box
          className={"empty_page_content"}
          width={"100%"}
          height={"70vh"}
          alignItems={"center"}
          display={"grid"}
        >
          <EmptyPage
            icon={<EmptyProductPageIcon />}
            title={t.pages?.Customers?.no_product_yet_title}
            discription={t.pages?.Customers?.no_product_yet_discription}
            //  buttonText={t.pages?.Customers.add_new_customer}
            //  onClick={handleOpenDialogFunction}
          />
        </Box>
      )}
      <Box mt={2}>
        {customerList?.customer.map((item: any) => {
          return (
            <CollapseComponent
              key={item?._id}
              name={item?.fullName}
              createdAt={item?.createdAt}
              height="270px"
              t={t}
              messageDescription={t?.pages?.Customers?.delete_description_account}
              messageTitle={t?.pages?.Customers?.delete_title_account}
              id={item?._id}
              editTable={true}
              getIdToAddAction={handleDeleteAccount}
              isLoading={deleteLoading}
              UpdateComponent={<UpdateCustomerAccounts t={t} item={item}/>}
              
            >
              {item?.firstPeriodCredit?.map((credit: any, index: number) => {
                return (
                  <Box
                    display={"grid"}
                    gridTemplateColumns={"15rem auto"}
                    key={credit?.amount + index}
                  >
                    <Typography variant="caption" pt={2}>
                      {credit?.creditType}
                    </Typography>
                    <Typography variant="caption" pt={2}>
                      {" "}
                      {credit?.amount} {credit?.currencyId?.symbol}{" "}
                    </Typography>
                  </Box>
                );
              })}
              <Box display={"grid"} gridTemplateColumns={"15rem auto"}>
                <Typography variant="caption" pt={2}>
                  {t?.pages?.Customers?.contact_number}
                </Typography>
                <Typography variant="caption" pt={2}>
                  {item?.contactNumber}
                </Typography>
              </Box>
              <Box display={"grid"} gridTemplateColumns={"15rem auto"}>
                <Typography variant="caption" pt={2}>
                  {t?.pages?.Customers?.address}
                </Typography>
                <Typography variant="caption" pt={2}>
                  {item?.address}
                </Typography>
              </Box>
              <Box display={"grid"} gridTemplateColumns={"15rem auto"}>
                <Typography variant="caption" pt={2}>
                  {t?.pages?.bank?.description}
                </Typography>
                <Typography variant="caption"pt={2} >{item?.description}</Typography>
              </Box>
            </CollapseComponent>
          );
        })}
      </Box>
      {customerList?.count > 9 && (
        <Box display={"flex"} justifyContent={"flex-end"} mt={2}>
          <Stack spacing={2} p={1}>
            <Pagination
              count={customerList?.count / 10}
              size={"medium"}
              onChange={handleChangePage}
              variant="outlined"
              color="primary"
              shape="rounded"
              sx={{
                fontSize: "2rem !important",
              }}
            />
          </Stack>
        </Box>
      )}
      {isLoading &&
        Array(8)
          .fill(null)
          .map((_, index) => <SkeletonComponent key={"skeleton" + index} />)}
    </Box>
  );
};
export default CashboxPage;
