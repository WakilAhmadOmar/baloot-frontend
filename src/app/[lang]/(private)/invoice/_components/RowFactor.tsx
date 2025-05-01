"use client";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Slide, Typography, useTheme, } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Edit, Eye, InfoCircle, Trash } from "iconsax-react";
import Link from "next/link";
import React, { MouseEvent } from "react";
import Moment from "react-moment";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IPropsRow {
  name:string,
  billNumber:string,
  createdAt:string,
  id:string,
  onDelete: (event:MouseEvent) => void , 
  t:any
  lang:"en" | "fa"
}

const RowFactor:React.FC<IPropsRow> = ({name , billNumber , createdAt , id , onDelete , t , lang }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleOpenDialog = () => {
    setOpen(!open);
  };
  return (
    <>
    <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleOpenDialog}
            aria-describedby="alert-dialog-slide-description"
            dir={t?.home?.dir}
          >
            <DialogTitle className="dialogTitleDelete" display={"flex"} gap={1} alignItems={"center"}justifyContent={"space-between"}>
              <Typography variant="h5">{t.invoice.delete_title}</Typography>
              <InfoCircle size="32" color={theme.palette.warning.main} />
            </DialogTitle>
            <DialogContent className="dialogContentDelete">
              <DialogContentText id="alert-dialog-slide-description">
                <Typography variant="body1">
                  {t?.invoice?.delete_description}
                </Typography>
              </DialogContentText>
            </DialogContent>
            <DialogActions className="dialogActionDelete" sx={{ display:"flex" , gap:"1rem"}}>
              <Button onClick={handleOpenDialog} variant="outlined">{t?.product?.cancel}</Button>
              <Button
                onClick={onDelete}
                variant="contained"
                color="primary"
              >
                {t?.product?.yes}
              </Button>
            </DialogActions>
          </Dialog>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bgcolor={theme.palette.background.default}
        pt={1.7}
        pb={1.7}
        pl={2.5}
        pr={2.5}
        borderRadius={"8px"}
        marginTop={"3px"}
      >
        <Typography variant="h5">{name}</Typography>

        <Box display={"flex"} columnGap={"5rem"} alignItems={"center"}>
          <Box display="flex" columnGap={"5px"} alignItems={"center"}>
            <Typography variant="body2" component={"span"}>
              شماره فاکتور{" - "}
            </Typography>
            <Typography variant="h5" component={"span"}>
              {billNumber}
            </Typography>
          </Box>
          <Typography variant="body2">
            تاریخ صدور فاکتور - <Moment format="mm dd YYYY">{createdAt}</Moment>
          </Typography>
          <Box>
            <IconButton onClick={handleOpenDialog} id={id}>
              <Trash color={theme.palette.primary.main}  size={22}/>
            </IconButton>
            <Link href={`/${lang}/invoice/sales-invoice/${id}/edit` }>
            <IconButton>
              <Edit color={theme.palette.primary.main}  size={22}/>
            </IconButton>
            </Link>
            <IconButton>
              <Eye color={theme.palette.primary.main} size={22}/>{" "}
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>

  );
};

export default RowFactor;
