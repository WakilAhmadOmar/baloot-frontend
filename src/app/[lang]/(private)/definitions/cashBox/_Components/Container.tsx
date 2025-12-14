"use client";

import CreateCashBox from "./CreateCashbox";
import { EmptyProductPageIcon } from "@/icons";
import { Box, Pagination, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useGetSafeListQuery } from "@/hooks/api/definitions/safe/queries/use-get-safe-list-query";
import CollapseComponent from "@/components/collapse/Collapse";
import EmptyPage from "@/components/util/emptyPage";
import UpdateCashBox from "./Update";
import { useDeleteSafeMutation } from "@/hooks/api/definitions/safe/mutations/use-delete-mutation";
import { AppContext } from "@/provider/appContext";
import SkeletonComponent from "../../_Components/Skeleton";
import { useTranslations } from "next-intl";

const CashBoxContainer = () => {
  const t = useTranslations("pages");
  const [page, setPage] = useState(1);
  const { setHandleError } = useContext(AppContext);

  const { data: safeList, isLoading } = useGetSafeListQuery();
  const { mutate, isLoading: deleteIsLoading } = useDeleteSafeMutation();

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
  };

  const handleDeleteFunction = (safeId: string) => {
    mutate(
      { safeId },
      {
        onSuccess: () => {
          setHandleError({
            open: true,
            message: t("cashbox.safe_deleted_successfully"),
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
        {t("cashbox.safes")}
      </Typography>

      <Box
        mb={2}
        sx={{
          display: "flex",
        }}
      >
        <CreateCashBox />
        {/* {productsState?.count > 0 && (
          <Box>
            <CustomSearch getTextSearchFunction={getTextSearchFunction} t={t} />
          </Box>
        )} */}
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
              {t("cashbox.Nothing_Found")}
            </Typography>
          </Box>
        )} */}
      {safeList?.map((item: any) => {
        return (
          <CollapseComponent
            key={item?._id}
            name={item?.name}
            createdAt={item?.createdAt}
            id={item?._id}
            getIdToAddAction={handleDeleteFunction}
            UpdateComponent={<UpdateCashBox item={item} />}
            editTable
            height="150px"
            messageDescription={t("cashbox.delete_description")}
            messageTitle={t("cashbox.delete_title")}
            isLoading={deleteIsLoading}
            isUsed={item?.isUsed}
          >
            <Box display={"grid"} gridTemplateColumns={"20rem auto"} mb={1}>
              <Typography variant="caption">{t("cashbox.Cashier")} </Typography>
              <Typography variant="caption">{item?.cashier?.name}</Typography>
            </Box>
            <Box display={"grid"} gridTemplateColumns={"20rem auto"}>
              <Typography variant="caption">
                {" "}
                {t("cashbox.Current_Balance")}
              </Typography>
              <Typography variant="caption">
                {item?.credit?.[0]?.amount}{" "}
                {item?.credit?.[0]?.currencyId?.name}
              </Typography>
            </Box>
            <Box display={"grid"} gridTemplateColumns={"20rem auto"}>
              <Typography variant="caption">
                {" "}
                {t("cashbox.Cashier_Contact_Number")}
              </Typography>
              <Typography variant="caption">
                {item?.cashier?.phoneNumber}{" "}
              </Typography>
            </Box>
          </CollapseComponent>
        );
      })}
      {safeList?.length === 0 && !isLoading && (
        <Box className={"empty_page_content"}>
          <EmptyPage
            icon={<EmptyProductPageIcon />}
            title={t("cashbox.no_product_yet_title")}
            discription={t("cashbox.no_product_yet_discription")}
            // buttonText={t.pages?.cashbox?.Create_new_Cashbox}
            // onClick={handleOpenDialogFunction}
          />
        </Box>
      )}
      {isLoading && <SkeletonComponent />}
    </Box>
  );
};

export default CashBoxContainer;
