import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Pagination,
    Stack,
    TextField,
    Typography,
    useTheme,
  } from "@mui/material";
  import CollapseComponent from "@/components/collapse/Collapse";
  import {  useState } from "react";
  import { useApolloClient } from "@apollo/client";
  import CircularProgressComponent from "@/components/loader/CircularProgressComponent";
  import SnackbarComponent from "@/components/snackbarComponent";
  import { DELETE_ENTREPOT } from "@/graphql/mutation/DELETE_ENTREPOT";
  import { Add, CloseSquare } from "iconsax-react";
  import { useForm } from "react-hook-form";
  import CustomSearch from "@/components/search/CustomSearch";
  import { GET_WARE_FROM_ENTREPOT } from "@/graphql/queries/GET_WARE_FROM_ENTREPOT";
  interface IProps {
    products?: any[];
    count: number;
    deleteProductFunction: (id: string) => void;
    handleUpdateProuct: (id: string) => void;
    t:any
  }
  const WarehouseList: React.FC<IProps> = ({
    products,
    count,
    deleteProductFunction,
    handleUpdateProuct,
    t
  }) => {
    const client = useApolloClient();
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
      getValues,
      setValue,
      getFieldState,
    } = useForm();
    const theme = useTheme();
    const [openDialog, setOpenDialog] = useState(false);
    const [loadingPage, setLoadingPage] = useState(false);
    const [handleError, setHandleError] = useState<{
      status: "success" | "info" | "warning" | "error";
      open: boolean;
      message: string;
    }>({
      status: "success",
      open: false,
      message: "",
    });
  
    const handleDelteProductFunction = async (id: string) => {
      setLoadingPage(true);
      try {
        const variables = {
          entrepotId: id,
        };
        const {
          data: { deleteEntrepot },
        } = await client.mutate({
          mutation: DELETE_ENTREPOT,
          variables,
        });
        if (deleteEntrepot?.message) {
          setLoadingPage(false);
          deleteProductFunction(id);
          setHandleError({
            open: true,
            status: "success",
            message: deleteEntrepot?.message,
          });
        }
      } catch (error: any) {
        setLoadingPage(false);
        setHandleError({
          open: true,
          status: "error",
          message: error.message,
        });
      }
    };
  
    const handleChangePage = (
      event: React.ChangeEvent<unknown>,
      page: number
    ) => {};
  
    const handleCloseError = () => {
      setHandleError((pre) => ({
        ...pre,
        open: false,
      }));
    };
  
    const getProductWarehouse = async (id: string) => {
      try {
        const variables = {
          enterpotId: id,
          existProdut: false,
        };
        const {
          data: { getWareFromEntrepot },
        } = await client.query({
          query: GET_WARE_FROM_ENTREPOT,
          variables,
        });
      } catch (error: any) {
        setHandleError({
          open: true,
          status: "error",
          message: error.message,
        });
      }
    };
    const handleOpenDialogFunction = (event: React.MouseEvent) => {
      if (event.currentTarget?.id) {
        getProductWarehouse(event.currentTarget?.id);
      }
      setOpenDialog(!openDialog);
      // if (canceleUpdageProduct) {
      //   canceleUpdageProduct();
      // }
    };
    const onSubmitFunction = () => {};
    return (
      <>
        {loadingPage && <CircularProgressComponent />}
        <SnackbarComponent
          status={handleError?.status}
          open={handleError?.open}
          message={handleError?.message}
          handleClose={handleCloseError}
        />
        <Dialog
          open={openDialog}
          // open={false}
          onClose={handleOpenDialogFunction}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          dir="rtl"
          fullWidth
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: `1px solid ${theme.palette.grey[200]}`,
            }}
          >
            <Typography>{t?.pages?.warehouse?.initial_period_registration}</Typography>
            <IconButton size="medium" onClick={handleOpenDialogFunction}>
              <CloseSquare />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Box
              sx={{
                display: "flex",
                maxWidth: "28rem",
                justifySelf: "flex-end",
                margin: "2rem auto 2rem 0",
              }}
            >
              <CustomSearch t={t} />
            </Box>
            <Box>
              <Box
                m={1}
                pl={1}
                pr={1}
                pt={0.5}
                pb={0.5}
                display={"grid"}
                gridTemplateColumns={"40% 30% 30%"}
                alignItems={"center"}
                bgcolor={theme.palette.grey[100]}
              >
                <Typography variant="overline">{t?.product?.product_name}</Typography>
                <Typography variant="overline">{t?.product?.units}</Typography>
                <Typography variant="overline">{t?.product?.product_quantity}</Typography>
              </Box>
              <Box
                display={"grid"}
                gridTemplateColumns={"40% 60%"}
                alignItems={"center"}
              >
                <Typography variant="overline">رب خرم نیم کیلو</Typography>
                <Box>
                  <Box display={"grid"} gridTemplateColumns={"50% 50%"} mb={0.5}>
                    <Box>دانه</Box>
                    <Box>
                      <TextField fullWidth size="small" />
                    </Box>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"50% 50%"} mb={0.5}>
                    <Box>بسته ای</Box>
                    <Box>
                      <TextField fullWidth size="small" />
                    </Box>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"50% 50%"} mb={0.5}>
                    <Box>کارتن</Box>
                    <Box>
                      <TextField fullWidth size="small" />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions
            sx={{ display: "flex", justifyContent: "start", columnGap: "1rem" }}
          >
            <Button
              color="primary"
              variant="contained"
              onClick={handleSubmit(onSubmitFunction)}
            >
              {t?.pages?.warehouse?.save}
            </Button>
            <Button variant="outlined" onClick={handleOpenDialogFunction}>
              {t?.pages?.warehouse?.cancel}
            </Button>
          </DialogActions>
        </Dialog>
        {products?.map((item, index) => {
          let units: any = {};
          item?.measures?.forEach((item: any) => {
            units[t.product.bought_price + " " + item?.measure?.name] =
              item?.boughtPrice;
            units[t.product.sale_price + " " + item?.measure?.name] =
              item?.salePrice;
          });
          return (
            <CollapseComponent
              key={`${index}`}
              name={item?.name}
              createdAt={item?.createdAt}
              id={item?._id}
              getIdToAddAction={handleDelteProductFunction}
              updateProductFunction={handleUpdateProuct}
              messageTitle={t?.pages?.warehouse?.delete_title}
              messageDescription={t?.pages?.warehouse?.delete_description}
              t={t}
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
                    <Typography variant="caption">{t?.pages?.warehouse?.warehouses}</Typography>
                    <Typography variant="caption">{item?.name}</Typography>
                    <Typography variant="caption">{t?.pages?.warehouse?.warehouse_responsible}</Typography>
                    <Typography variant="caption">
                      {item?.responsible?.name}
                    </Typography>
                    <Typography variant="caption">{t?.pages?.warehouse?.product_quantity}</Typography>
                    <Typography variant="caption"></Typography>
                    <Typography variant="caption">{t?.pages?.warehouse?.warehouse_address}</Typography>
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
                    <Button
                      startIcon={<Add />}
                      id={item?._id}
                      onClick={handleOpenDialogFunction}
                      variant="outlined"
                      sx={{
                        borderStyle: "dashed",
                      }}
                    >
                      {t?.pages?.warehouse?.initial_period_registration}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CollapseComponent>
          );
        })}
        <Stack spacing={2} p={2} display={"grid"} justifyContent={"end"}>
          <Pagination
            count={Math.ceil(count / 10)}
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
      </>
    );
  };
  
  export default WarehouseList;
  