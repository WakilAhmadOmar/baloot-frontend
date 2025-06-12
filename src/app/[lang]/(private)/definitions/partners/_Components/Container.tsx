"use client";

import { Box, Grid, Typography } from "@mui/material";

import CreatePartner from "./Create";
import { EmptyProductPageIcon } from "@/icons";
import CollapseComponent from "@/components/collapse/Collapse";
import { useGetPartnerList } from "@/hooks/api/definitions/partner/queries/use-get-list";
import EmptyPage from "@/components/util/emptyPage";
import UpdatePartner from "./Update";
import { useDeletePartnerMutation } from "@/hooks/api/definitions/partner/mutations/use-delete-mutation";
import { useContext } from "react";
import { AppContext } from "@/provider/appContext";
import SkeletonComponent from "../../_Components/Skeleton";
import { useTranslations } from "next-intl";



const PartnersPage = () => {
  const t = useTranslations("pages")
  const { data: partnerList, isLoading } = useGetPartnerList({ page: 1 });
  const {setHandleError} = useContext(AppContext)
  const {mutate , isLoading:deleteIsLoading} = useDeletePartnerMutation()


  const handleDeleteFunction = (id:string) => {
        mutate({partnerId:id} , {
      onSuccess:({message}) =>{
        setHandleError({
          open:true,
          type:"success",
          message:message
        })
      },
      onError: (error:any)=> {
        setHandleError({
        open: true,
        message: error.message,
        status: "error",
      });
      }
    })
  }
  return (
    <Box>
      <Typography variant="h3" mb={2}>
        {t("partner.partners")}
      </Typography>

      <Box
        mb={2}
        sx={{
          display: "flex",
        }}
      >
        <CreatePartner  />
        {/* {productsState?.count > 0 && (
          <Box>
            <CustomSearch getTextSearchFunction={getTextSearchFunction} t={t}/>
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
              {t("partner.nothing_found")}
            </Typography>
          </Box>
        )} */}
      {partnerList?.partner?.map((item: any) => {
        return (
          <CollapseComponent
            key={item?._id}
            name={item?.firstName + ` ( ${item?.lastName} )`}
            createdAt={item?.createdAt}
            id={item?._id}
            getIdToAddAction={handleDeleteFunction}
            // updateProductFunction={handleUpdateProuct}
            height="150px"
            messageDescription={t("partner.delete_description")}
            messageTitle={t("partner.delete_title")}
            UpdateComponent={<UpdatePartner item={item} />}
            editTable
            isLoading={deleteIsLoading}
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
                  gridTemplateColumns={"25rem auto"}
                  rowGap={"1rem"}
                >
                  <Typography variant="caption">
                    {t("partner.percentage_of_equity")}
                  </Typography>
                  <Typography variant="caption">
                    {item?.investPercentage}%
                  </Typography>
                  <Typography variant="caption">
                    {t("partner.amount_of_money_in_cash")}
                  </Typography>
                  <Typography variant="caption">
                    {item?.invest?.amount} {item?.invest?.currencyId?.symbol}
                  </Typography>
                  <Typography variant="caption">
                    {" "}
                    {t("partner.phone_number")}
                  </Typography>
                  <Typography variant="caption">{item?.phoneNumber}</Typography>
                </Box>
              </Grid>
            </Grid>
          </CollapseComponent>
        );
      })}

      {partnerList?.count === 0 && !isLoading && (
        <Box className={"empty_page_content"}>
          <EmptyPage
            icon={<EmptyProductPageIcon />}
            title={t("partner.no_partner_yet_title")}
            discription={t("partner.no_partner_yet_description")}
            // buttonText={t("partner.add_new_partner_button")}
            // onClick={handleOpenDialogFunction}
          />
        </Box>
      )}
      {isLoading && <SkeletonComponent />}
    </Box>
  );
};

export default PartnersPage;
