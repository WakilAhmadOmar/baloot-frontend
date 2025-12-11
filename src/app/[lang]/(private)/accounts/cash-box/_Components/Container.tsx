"use client";
import AddCashboxAccounts from "./Create";
import CollapseComponent from "@/components/collapse/Collapse";
import { AppContext } from "@/provider/appContext";
import { Box, Pagination, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import SkeletonComponent from "./Skeleton";
import { EmptyProductPageIcon, NotFoundIcon } from "@/icons";

import { useGetSafeListQuery } from "@/hooks/api/definitions/safe/queries/use-get-safe-list-query";
import { useAddFirstPeriodOfCreditMutation } from "@/hooks/api/accounts/mutations/use-add-first-period-of-credit-mutation";
import { UpdateSafeAccounts } from "./Update";
import EmptyPage from "@/components/util/emptyPage";
import { useTranslations } from "next-intl";



const CashboxPage = () => {
  const t = useTranslations("pages")
  const { data: safeList, isLoading } = useGetSafeListQuery();
  const { mutate: addFirstPeriodMutation, isLoading: deleteLoading } =
    useAddFirstPeriodOfCreditMutation();
  const { setHandleError } = useContext(AppContext);

  const handleDeleteAccount = (id: string) => {
    const variables = {
      creditObject: [],
      accountType: "Safe",
      accountId: id,
    };

    addFirstPeriodMutation(variables, {
      onSuccess: ({ message }: any) => {
        setHandleError({
          message: message ?? "",
          status: "success",
          open: true,
        });
      },
      onError: (error: any) => {
        setHandleError({
          open: true,
          message: error?.message,
          status: "error",
        });
      },
    });
  };

  return (
    <Box>
      <Typography variant="h3">
        {t("cashbox.record_previous_cashbox_accounts")}
      </Typography>

      <Box display={"flex"} justifyContent={"space-between"} mt={4}>
        <Box display={"flex"} width={"100%"}>
          <AddCashboxAccounts
          />
        </Box>
        {/* {( safeList?.count > 0) && (
          <Box>
            <CustomSearch t={t} getTextSearchFunction={handleSearchItem} />
          </Box>
        )} */}
      </Box>
      {/* {textSearchState !== "" &&
        !loadingPage &&
        cashboxList?.data?.length === 0 && (
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

      {safeList?.count === 0 && isLoading === false && (
        <Box
          className={"empty_page_content"}
          width={"100%"}
          height={"70vh"}
          alignItems={"center"}
          display={"grid"}
        >
          <EmptyPage
            icon={<EmptyProductPageIcon />}
            title={t("cashbox.no_product_yet_title")}
            discription={t("cashbox.no_product_yet_discription")}
            // buttonText={t("cashbox.Create_new_Cashbox")}
            // onClick={handleOpenDialogFunction}
          />
        </Box>
      )}
      <Box mt={2}>
        {safeList?.map((item: any) => {
          return (
            <CollapseComponent
              key={item?._id}
              name={item?.name}
              createdAt={item?.createdAt}
              height="270px"
              messageDescription={t("cashbox.delete_description_account")}
              messageTitle={t("cashbox.delete_title_account")}
              id={item?._id}
              editTable={true}
              getIdToAddAction={handleDeleteAccount}
              isLoading={deleteLoading}
              UpdateComponent={<UpdateSafeAccounts item={item} />}
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
                  {t("cashbox.Cashier")}
                </Typography>
                <Typography variant="caption" pt={2}>
                  {item?.cashier?.name}
                </Typography>
              </Box>
              <Box display={"grid"} gridTemplateColumns={"15rem auto"}>
                <Typography variant="caption" pt={2}>
                  {t("bank.phone_number")}
                </Typography>
                <Typography variant="caption" pt={2}>
                  {item?.cashier?.phoneNumber}
                </Typography>
              </Box>
              <Box display={"grid"} gridTemplateColumns={"15rem auto"}>
                <Typography variant="caption" pt={2}>
                  {t("bank.description")}
                </Typography>
                <Typography variant="caption" pt={2}>
                  {item?.description}
                </Typography>
              </Box>
            </CollapseComponent>
          );
        })}
      </Box>
 
      {isLoading &&
        Array(8)
          .fill(null)
          .map((_, index) => <SkeletonComponent key={"skeleton" + index} />)}
    </Box>
  );
};
export default CashboxPage;
