"use client"
import {
    Box,
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    Typography,
    useTheme,
  } from "@mui/material";
  import { TransitionProps } from "@mui/material/transitions";
  import { InfoCircle, Trash } from "iconsax-react";
  import React, { useState } from "react";
  import Moment from "react-moment";
import UpdateExternalIncomeType from "./Update";
import { useDeleteExternalIncomeTypeMutation } from "@/hooks/api/definitions/external-income/mutations/use-delete-mutation";
import { useTranslations } from "next-intl";
  
  interface IProps {
    item?: any;
  }
  
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const ExternalIncomeBox: React.FC<IProps> = ({
    item
  }) => {
    const t = useTranslations("pages")
    const theme = useTheme();
    const [handleDeleteState, setHandleDeleteState] = useState(false);
    const {mutate} = useDeleteExternalIncomeTypeMutation()
  
    const handleDeleteFunction = () => {
      setHandleDeleteState(!handleDeleteState);
    };
    const handleDeleteThisItem = () => {
      
    };
    
    return (
      <Box display={"grid"}>
        <Dialog
          open={handleDeleteState}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleDeleteFunction}
          aria-describedby="alert-dialog-slide-description"
          dir={t("dir")}
        >
          <DialogTitle className="dialogTitleDelete" display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
            <Typography variant="h5">{t("Expenses.Are_you_sure_you_want_to_delete_this_item")}</Typography>
            <InfoCircle size="32" color={theme.palette.warning.main} />
          </DialogTitle>
          <DialogContent className="dialogContentDelete">
            <DialogContentText id="alert-dialog-slide-description">
              <Typography variant="body1">
                {t("Expenses.Once_this_item_is_deleted")}
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions className="dialogActionDelete" sx={{display:"flex" , gap:"1rem"}}>
            <Button onClick={handleDeleteFunction} variant="outlined">{t("Expenses.Cancel")}</Button>
            <Button
              onClick={handleDeleteThisItem}
              variant="contained"
              color="primary"
            >
              {t("Expenses.yes")}
            </Button>
          </DialogActions>
        </Dialog>
        <Card
          sx={{
            borderRadius: "0.8rem",
            boxShadow: "none",
            height: "100%",
            alignItems: "center",
            display: "grid",
            background:theme.palette.background.default
          }}
        >
          <Box
            pt={3}
            pb={3}
            pr={4}
            pl={4}
            display="grid"
            justifyContent={"center"}
            alignContent="center"
            width={"17rem"}
          >
            <Typography textAlign={"center"}>
              <Moment format="YYYY/MM/DD">{item.createdAt}</Moment>
            </Typography>
            <Typography textAlign={"center"} variant={"h5"} pt={1.5} pb={1.5}>
              {item?.name}
            </Typography>
            <Box display="flex" justifyContent={"center"} columnGap="1rem">
              {/* <IconButton onClick={handleDeleteFunction}>
                <Trash color={theme.palette.grey["A700"]} size={25} />
              </IconButton> */}
              <UpdateExternalIncomeType  item={item} />
            </Box>
          </Box>
        </Card>
      </Box>
    );
  };
  
  export default ExternalIncomeBox;
  