
import { Box, Button, Card, Dialog, DialogActions, DialogContent, IconButton, Typography, useTheme } from "@mui/material";
import { Edit, InfoCircle, Trash } from "iconsax-react";
import Moment from "react-moment";
import { UpdateUnit } from "./Update";
import { useState } from "react";
import { useTranslations } from "next-intl";
interface IPropsUnitProduct {
  item: any;
  canDelete?: Boolean;
}
export const UnitItem: React.FC<IPropsUnitProduct> = ({
  item,
  canDelete = true,
}) => {
  const t = useTranslations("pages")
  const theme = useTheme();
 const [openDialogDelete, setOpenDialogDelete] = useState(false);
 const handleOpenDialogDeleteFunction = () =>{
  setOpenDialogDelete(!openDialogDelete)
 }

 const deleteFunction = () =>{
  //i can't found delete query for deleting measure
  //TODO implement delete mutation
 }
  
  return (
    <>
    <Dialog
        open={openDialogDelete}
        onClose={handleOpenDialogDeleteFunction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        dir="rtl"
        // fullWidth
      >
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
             {t("unit.are_you_sure_to_delete_this_unit")}
            </Typography>
          </Box>
          <Box pt={1} sx={{ paddingInlineStart: "3rem" }}>
            <Typography variant="body1">
             {t("unit.you_will_not_have_access_again")} 
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "end", columnGap: "1rem" }}
        >
          <Button variant="outlined" onClick={handleOpenDialogDeleteFunction}>
            {t("unit.cancel")}
          </Button>
          <Button color="primary" variant="contained" onClick={deleteFunction}>
           {t("unit.yes")}
          </Button>
        </DialogActions>
      </Dialog>
      
    <Card
      key={item?._id}
      sx={{
        width: "16rem",
        // minWidth: "15rem",
        p: 2,
        boxShadow: "none",
        borderRadius: "0.8rem",
        display: "grid",
        alignItems: "center",
        rowGap: 0,
        backgroundColor:theme.palette.background.paper
      }}
    >
      <Typography textAlign={"center"} variant="body1">
        <Moment format="YYYY/MM/DD">{item?.createdAt}</Moment>
      </Typography>
      <Typography
        textAlign={"center"}
        variant="h5"
        pt={2}
        pb={2}
        lineHeight={1.5}
      >
        {item?.name}
      </Typography>
      <Box display="flex" justifyContent={"center"} columnGap={1}>
        {canDelete && (
          <IconButton  >
            <Trash color={theme.palette.grey["A700"]} size={25} />
          </IconButton>
        )}
       
       <UpdateUnit item={item} />
      </Box>
    </Card>
    </>
  );
};
