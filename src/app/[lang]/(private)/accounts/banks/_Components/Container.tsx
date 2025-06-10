"use client";
import AddBanksAccounts from "./Create";
import CollapseComponent from "@/components/collapse/Collapse";
import { Box, Pagination, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import SkeletonComponent from "./Skeleton";
import { EmptyProductPageIcon, NotFoundIcon } from "@/icons";
import { useGetBankListQuery } from "@/hooks/api/definitions/bank/queries/use-get-bank-list-query";
import EmptyPage from "@/components/util/emptyPage";
import { useAddFirstPeriodOfCreditMutation } from "@/hooks/api/accounts/mutations/use-add-first-period-of-credit-mutation";
import { AppContext } from "@/provider/appContext";
import { UpdateBanksAccounts } from "./Update";

interface IPropsBankAccountPages {
  t: any;
}

const BanksAccountsPage: React.FC<IPropsBankAccountPages> = ({ t }) => {
  const [page, setPage] = useState(1);
  const { setHandleError } = useContext(AppContext);
  const { data: bankList, isLoading } = useGetBankListQuery({ page });

  const {mutate:addFirstPeriodMutation , isLoading:deleteLoading } = useAddFirstPeriodOfCreditMutation()

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleDeleteAccount = (id: string) => {
    // Implement the delete functionality here
          const variables = {
        creditObject: [],
        accountType: "Bank",
        accountId:id,
      };

      addFirstPeriodMutation(variables, {
        onSuccess: ({message}:any) => {
          setHandleError({
          message:message ?? "",
          type:"success",
          open:true
        })
        },
        onError: (error: any) => {
          setHandleError({
            open: true,
            message: error?.message,
            type: "error",
          });
        },
      })
    
  };

  return (
    <Box>
      <Typography variant="h3">
        {t?.pages?.bank?.list_of_previous_bank_accounts}
      </Typography>

      <Box display={"flex"} justifyContent={"space-between"} mt={4}>
        <Box display={"flex"} width={"100%"}>
          <AddBanksAccounts t={t} />
        </Box>
        {bankList?.count > 0 && (
          <Box>
            {/* <CustomSearch t={t} 
            getTextSearchFunction={handleSearchItem}
             /> */}
          </Box>
        )}
      </Box>
      {/* {
        !isLoading &&
        bankList?.bank?.length === 0 && (
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
      {bankList?.count === 0 && isLoading === false && (
        <Box
          className={"empty_page_content"}
          width={"100%"}
          height={"70vh"}
          alignItems={"center"}
          display={"grid"}
        >
          <EmptyPage
            icon={<EmptyProductPageIcon />}
            title={t.pages?.bank?.no_product_yet_title}
            discription={t.pages?.bank?.no_product_yet_discription}
            // buttonText={t.pages?.bank.Create_new_Bank}
            // onClick={handleOpenDialogFunction}
          />
        </Box>
      )}
     
      <Box mt={2}>
        {bankList?.bank?.map((item: any) => {
          return (
            <CollapseComponent
              editTable={true}
              key={item?._id}
              name={item?.name}
              createdAt={item?.createdAt}
              height="270px"
              t={t}
              messageDescription={t?.pages?.bank?.account_delete_description}
              messageTitle={t?.pages?.bank?.account_delete_title}
              id={item?._id}
              getIdToAddAction={handleDeleteAccount}
              isLoading={deleteLoading}
              UpdateComponent={<UpdateBanksAccounts t={t} item={item} />}
            >
              <Box display={"grid"} gridTemplateColumns={"15rem auto"}>
                <Typography variant="caption" pt={2}>
                  {t?.pages?.bank?.account_number}
                </Typography>
                <Typography variant="caption" pt={2}>
                  {" "}
                  {item?.accountNumber}
                </Typography>
              </Box>
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
                  {t?.pages?.bank?.phone_number}
                </Typography>
                <Typography variant="caption" pt={2}>
                  {item?.bankPhoneNumber}
                </Typography>
              </Box>
              <Box display={"grid"} gridTemplateColumns={"15rem auto"}>
                <Typography variant="caption" pt={2}>
                  {t?.pages?.bank?.description}
                </Typography>
                <Typography variant="caption" pt={2}>{item?.description}</Typography>
              </Box>
            </CollapseComponent>
          );
        })}
      </Box>
      
      {bankList?.count > 9 && (
        <Box display={"flex"} justifyContent={"flex-end"} mt={2}>
          <Stack spacing={2} p={1}>
            <Pagination
              count={bankList?.count / 10}
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
       {
        isLoading &&
        Array(8)
          .fill(null)
          .map((_, index) => <SkeletonComponent key={"skeleton" + index} />)}
    </Box>
  );
};
export default BanksAccountsPage;
