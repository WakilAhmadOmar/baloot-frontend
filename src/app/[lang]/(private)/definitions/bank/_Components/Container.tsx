"use client";
import CreateBank from "../_Components/createBank";
import { EmptyProductPageIcon, NotFoundIcon } from "@/icons";
import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useGetBankListQuery } from "@/hooks/api/definitions/bank/queries/use-get-bank-list-query";
import CollapseComponent from "@/components/collapse/Collapse";
import SkeletonComponent from "../../_Components/Skeleton";
import EmptyPage from "@/components/util/emptyPage";
import UpdateBank from "./Update";
import { useDeleteBankMutation } from "@/hooks/api/definitions/bank/mutations/use-delete-mutation";
import { AppContext } from "@/provider/appContext";
import { useTranslations } from "next-intl";


const BankContainer= () => {
  const t = useTranslations("pages")
  const { setHandleError } = useContext(AppContext);
  const [page, setPage] = useState(1);
  const { data: bankList, isLoading } = useGetBankListQuery();
  const { mutate, isLoading: deleteIsLoading } = useDeleteBankMutation();

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
  };

  const handleDeleteFunction = (bankId: string) => {
    mutate(
      { bankId },
      {
        onSuccess: () => {
          setHandleError({
            open: true,
            message: t("bank.bank_deleted_successfully"),
            status: "success",
          });
        },
        onError: (error: any) => {
          setHandleError({
            open: true,
            message: error.message,
            status: "error",
          });
        },
      }
    );
  };
  return (
    <Box>
      <Typography variant="h3" mb={2}>
        {t("bank.Banks")}
      </Typography>

      <Box
        mb={2}
        sx={{
          display: "flex",
        }}
      >
        <CreateBank />
        
      </Box>
      {/* {textSearchState !== "" &&
        !loadingPage &&
        productsState?.products?.length === 0 && (
          <Box
            display={"grid"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"100%"}
            mt={7}
          >
            <NotFoundIcon />
            <Typography textAlign={"center"} variant="h6" mt={2}>
              {t("bank.Nothing_Found")}
            </Typography>
          </Box>
        )} */}
      {bankList?.map((item: any) => {
        return (
          <CollapseComponent
            key={item?._id}
            name={item?.name}
            createdAt={item?.createdAt}
            id={item?._id}
            getIdToAddAction={handleDeleteFunction}

            messageTitle={t("bank.delete_title")}
            messageDescription={t("bank.delete_description")}
            UpdateComponent={<UpdateBank item={item} />}
            editTable
            isLoading={deleteIsLoading}
            isUsed={item?.isUsed}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                display="grid"
                gridTemplateColumns={"auto 1rem"}
              >
                <Box
                  display={"grid"}
                  gridTemplateColumns={"20rem auto"}
                  rowGap={"1rem"}
                >
                  <Typography variant="caption">
                    {" "}
                    {t("bank.Account_Number")}
                  </Typography>
                  <Typography variant="caption">
                    {item?.accountNumber}
                  </Typography>
                  <Typography variant="caption">
                    {t("bank.Current_Balance")}
                  </Typography>
                  <Typography variant="caption">
                    {item?.cridet?.[0]?.amount}
                    {item?.cridet?.[0]?.currencyId?.name}
                  </Typography>
                  <Typography variant="caption">
                    {t("bank.Bank_Contact_Number")}
                  </Typography>
                  <Typography variant="caption">
                    {item?.bankPhoneNumber}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CollapseComponent>
        );
      })}
      {isLoading && <SkeletonComponent />}

      {bankList?.length === 0 && !isLoading && (
        <Box className={"empty_page_content"}>
          <EmptyPage
            icon={<EmptyProductPageIcon />}
            title={t("(bank.no_product_yet_title")}
            discription={t("(bank.no_product_yet_discription")}
            // buttonText={t.pages?.bank?.Create_new_Bank}
            // onClick={handleOpenDialogFunction}
          />
        </Box>
      )}
    </Box>
  );
};

export default BankContainer;
