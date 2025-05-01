"use client"
import { ADD_MEANSURE } from "@/graphql/mutation/ADD_MEANSURE";
import { UPDATE_MEASURE } from "@/graphql/mutation/UPDATE_MEASURE";
import { EmptyProductPageIcon } from "@/icons";
import CircularProgressComponent from "@/components/loader/CircularProgressComponent";
import EmptyPage from "@/components/util/emptyPage";
import SnackbarComponent from "@/components/snackbarComponent";
import ListOfUnitsProduct from "@/components/util/ListOfUnitsProduct";
import { useApolloClient } from "@apollo/client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputLabel,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { CloseSquare, InfoCircle } from "iconsax-react";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getProductMeansureFunction } from "@/components/util/getProductMeansureFunction";
import { AppContext } from "@/provider/appContext";

interface IProps {
    t:any
}
const DefinitionUnit:React.FC<IProps> = ({t}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const theme = useTheme();
  const client = useApolloClient();
  const {setHandleError} = useContext(AppContext)
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);

  const [productUnits, setProductUnits] = useState<any[]>([]);
  const [idItemShouldDelete, setIdItemShouldDelete] = useState("");
  const getProudctUnits = async () => {
    setLoadingPage(true);
    const units: any = await getProductMeansureFunction(client);
    setProductUnits(units?.getMeasures);
    setLoadingPage(false);
  };
  useEffect(() => {
    getProudctUnits();
  }, []);
  const handleOpenDialogFunction = () => {
    setValue("measureId", null);
    setOpenDialog(!openDialog);
  };
  const handleOpenDialogDeleteFunction = () => {
    setOpenDialogDelete(!openDialogDelete);
  };

  const onSubmitFunction = async (data: any) => {
    setLoadingPage(true);
    try {
      const variables = {
        ...data,
      };
      if (data?.measureId) {
        const {
          data: { updateMeasure },
        } = await client.mutate({
          mutation: UPDATE_MEASURE,
          variables,
        });
        const newState = productUnits?.map((item) => {
          if (item?._id === updateMeasure?._id) {
            return {
              ...item,
              name: data?.name,
              description: data?.description,
            };
          } else return item;
        });
        setProductUnits(newState);
        setLoadingPage(false);
        setOpenDialog(false), setValue("measureId", null);
        setValue("name", null);
        setValue("description", null);
        setHandleError({
          open: true,
          message: "Update successfully",
          status: "success",
        });
      } else {
        const {
          data: { addMeasure },
        } = await client.mutate({
          mutation: ADD_MEANSURE,
          variables,
        });
        setProductUnits([addMeasure, ...productUnits]);
        setLoadingPage(false);
        setOpenDialog(false);
      }
    } catch (error: any) {
      setLoadingPage(false);
      setHandleError({
        open: true,
        message: error?.message,
        status: "error",
      });
    }
  };

  const handleEditFunciton = (data: any) => {
    setOpenDialog(true);
    setValue("name", data?.name);
    setValue("measureId", data?._id);
  };

  const handleDeleteFunction = (id: string) => {
    setOpenDialogDelete(true);
    setIdItemShouldDelete(id);
  };
  const deleteFunction = async () => {
    try {
      setLoadingPage(true);
      const variables = {};
    } catch (error: any) {
      setLoadingPage(false);
      setHandleError({
        open: true,
        message: error?.message,
        status: "error",
      });
    }
  };

  return (
    <Box>
      {productUnits?.length > 0 && (
        <Typography variant="h3" mb={2}>
          {t?.pages?.unit.define_units}
        </Typography>
      )}
      
      <Dialog
        open={openDialogDelete}
        onClose={handleOpenDialogDeleteFunction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        dir="rtl"
        // fullWidth
      >
        {/* <DialogTitle
          id="alert-dialog-title"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            borderBottom: `1px solid ${theme.palette.grey[200]}`,
          }}
        >
          
        </DialogTitle> */}
        <DialogContent>
          <Box
            display="flex"
            justifyContent={"start"}
            alignItems={"center"}
            columnGap={1}
            mt={1.5}
          >
            <InfoCircle color={theme.palette.warning.main} />
            <Typography variant="h5">
             {t?.pages?.unit?.are_you_sure_to_delete_this_unit}
            </Typography>
          </Box>
          <Box pt={1} sx={{ paddingInlineStart: "3rem" }}>
            <Typography variant="body1">
             {t?.pages?.unit?.you_will_not_have_access_again} 
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "end", columnGap: "1rem" }}
        >
          <Button variant="outlined" onClick={handleOpenDialogDeleteFunction}>
            خیر
          </Button>
          <Button color="primary" variant="contained" onClick={deleteFunction}>
            بلی
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDialog}
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
          <Typography variant="button">{t?.pages?.unit?.new_unit}</Typography>
          <IconButton size="medium" onClick={handleOpenDialogFunction}>
            <CloseSquare />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <Grid container spacing={2} >
              <Grid item xs={12}>
                <InputLabel
                  sx={{ paddingBottom: "5px", marginTop: "10px" }}
                  required
                >
                 {t?.pages?.unit?.unit_name} 
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  {...register("name", { required: true })}
                  name="name"
                />
                {errors?.name?.type === "required" && (
                  <Typography color="error" p={1}>
                  {t?.pages?.unit?.unit_name_is_required}  
                  </Typography>
                )}
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "end", columnGap: "1rem" }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit(onSubmitFunction)}
            loading={loadingPage}
          >
           {t?.pages?.unit?.save} 
          </Button>
          <Button variant="outlined" onClick={handleOpenDialogFunction}>
          {t?.pages?.unit?.cancel} 
          </Button>
        </DialogActions>
      </Dialog>
      {productUnits?.length === 0 && loadingPage === false ? (
        <Box className={"empty_page_content"}>
          <EmptyPage
            buttonText={t?.pages?.unit?.add_new_unit}
            discription={t?.pages?.unit?.no_units_description}
            onClick={handleOpenDialogFunction}
            title={t?.pages?.unit?.no_unit_registered}
            icon={<EmptyProductPageIcon />}
          />
        </Box>
      ) : (
        <Box>
          {productUnits?.length > 0 && (
            <Box
              display={"grid"}
              gridTemplateColumns={"auto 30%"}
              justifyContent={"space-between"}
              mb={2}
            >
              <Button variant="contained" onClick={handleOpenDialogFunction}>
               {t?.pages?.unit?.add_new_unit}
              </Button>
              {/* <CustomSearch  getTextSearchFunction={getTextSearchFunction}/> */}
            </Box>
          )}
          <Box display={"flex"} flexWrap={"wrap"} columnGap={2} rowGap={2}>
            {productUnits?.map((item) => {
              return (
                <Box key={item?._id} display={"grid"}>
                  <ListOfUnitsProduct
                    item={item}
                    canDelete={false}
                    onEdit={handleEditFunciton}
                    onDelete={handleDeleteFunction}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default DefinitionUnit;
