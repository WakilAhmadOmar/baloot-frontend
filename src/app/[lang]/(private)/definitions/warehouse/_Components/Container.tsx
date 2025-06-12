"use client";

import { EmptyProductPageIcon } from "@/icons";
import CreateWarehouse from "./Create";
import { Box, Button, Grid,  Typography } from "@mui/material";
import { useGetWarehouseList } from "@/hooks/api/definitions/warehouse/queries/use-get-list";
import CollapseComponent from "@/components/collapse/Collapse";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Add } from "iconsax-react";
import EmptyPage from "@/components/util/emptyPage";
import UpdateWarehouse from "./Update";
import { useDeleteWarehouseMutation } from "@/hooks/api/definitions/warehouse/mutations/use-delete-mutation";
import { useContext } from "react";
import { AppContext } from "@/provider/appContext";
import SkeletonComponent from "../../_Components/Skeleton";
import { useTranslations } from "next-intl";



const WarehousePage = () => {
  const t= useTranslations("pages")
  const pathname = usePathname();
  const {setHandleError} = useContext(AppContext)
  const lang = pathname.split("/")[1];

  const { data: warehouseList, isLoading } = useGetWarehouseList({ page: 1 });
  const {mutate , isLoading:deleteIsLoading} = useDeleteWarehouseMutation()

  const handleDeleteFunction = (id:string) =>{
    mutate({entrepotId:id},{
      onSuccess: () => {
        setHandleError({
          open: true,
          message: t("warehouse.warehouse_deleted_successfully"),
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
    } )
  }

  return (
    <Box>
      <Typography variant="h3" mb={2}>
        {t("warehouse.warehouses")}
      </Typography>
      <Box
        mb={2}
        sx={{
          display: "flex",
        }}
      >
        <CreateWarehouse
        />
        {/* {productsState?.products?.length > 0 && (
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
              {t("warehouse.nothing_found")}
            </Typography>
          </Box>
        )} */}
      {warehouseList?.entrepot?.map((item: any) => {
        return (
          <CollapseComponent
            key={item?._id}
            name={item?.name}
            createdAt={item?.createdAt}
            id={item?._id}
            getIdToAddAction={handleDeleteFunction}
            // updateProductFunction={handleUpdateProuct}
            messageTitle={t("warehouse.delete_title")}
            messageDescription={t("warehouse.delete_description")}
            UpdateComponent={<UpdateWarehouse  item={item} />}
            isLoading={deleteIsLoading}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={8}
                display="grid"
                gridTemplateColumns={"auto 1rem"}
              >
                <Box
                  display={"grid"}
                  gridTemplateColumns={"17rem auto"}
                  rowGap={"1rem"}
                >
                  <Typography variant="caption">
                    {t("warehouse.warehouses")}
                  </Typography>
                  <Typography variant="caption">{item?.name}</Typography>
                  <Typography variant="caption">
                    {t("warehouse.warehouse_responsible")}
                  </Typography>
                  <Typography variant="caption">
                    {item?.responsible?.name}
                  </Typography>
                  <Typography variant="caption">
                    {t("warehouse.product_quantity")}
                  </Typography>
                  <Typography variant="caption"></Typography>
                  <Typography variant="caption">
                    {t("warehouse.warehouse_address")}
                  </Typography>
                  <Typography variant="caption">{item?.address}</Typography>
                </Box>
              </Grid>

              <Grid
                item
                xs={4}
                justifyContent={"flex-end"}
                display="grid"
                alignItems={"flex-end"}
              >
                <Box>
                  <Link
                    href={
                      `/${lang}/definitions/warehouse/` +
                      item?._id +
                      "?name=" +
                      item?.name
                    }
                    lang={lang}
                  >
                    <Button
                      startIcon={<Add />}
                      id={item?._id}
                      variant="outlined"
                      sx={{
                        borderStyle: "dashed",
                      }}
                    >
                      {t("warehouse.initial_period_registration")}
                    </Button>
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </CollapseComponent>
        );
      })}
      {warehouseList?.count === 0 && !isLoading && (
        <Box className={"empty_page_content"}>
          <EmptyPage
            icon={<EmptyProductPageIcon />}
            discription={t("warehouse.no_warehouse")}
            title={t("warehouse.no_warehouse_registered")}
            // buttonText={t("warehouse.add_warehouse")}
            // onClick={handleOpenDialogFunction}
          />
        </Box>
      )}
      {isLoading &&  <SkeletonComponent/>}
    </Box>
  );
};

export default WarehousePage;
