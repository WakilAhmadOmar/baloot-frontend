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
    IconButton,
    Slide,
    Typography,
    useTheme,
  } from "@mui/material";
  import { TransitionProps } from "@mui/material/transitions";
  import { Edit, InfoCircle, Trash } from "iconsax-react";
  import React, { useState } from "react";
  import Moment from "react-moment";
  
  interface IProps {
    id?: string;
    getIdToAddAction?: (id: string) => void;
    updateProductFunction?: (id: string) => void;
    item?: any;
    t:any
  }
  
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const ConsumptionBox: React.FC<IProps> = ({
    getIdToAddAction,
    id,
    updateProductFunction,
    item,
    t
  }) => {
    const theme = useTheme();
    const [handleDeleteState, setHandleDeleteState] = useState(false);
  
    const handleDeleteFunction = () => {
      setHandleDeleteState(!handleDeleteState);
    };
    const handleDeleteThisItem = () => {
      if (getIdToAddAction && id) {
        getIdToAddAction(id);
      }
      handleDeleteFunction();
    };
    const handleClickUpdateItem = () => {
      if (updateProductFunction && id) {
        updateProductFunction(id);
      }
    };
    return (
      <Box display={"grid"}>
        <Dialog
          open={handleDeleteState}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleDeleteFunction}
          aria-describedby="alert-dialog-slide-description"
          dir={t?.home?.dir}
        >
          <DialogTitle className="dialogTitleDelete" display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
            <Typography variant="h5">{t?.pages?.income?.delete_title}</Typography>
            <InfoCircle size="32" color={theme.palette.warning.main} />
          </DialogTitle>
          <DialogContent className="dialogContentDelete">
            <DialogContentText id="alert-dialog-slide-description">
              <Typography variant="body1">
                {t?.pages?.income?.delete_description}
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions className="dialogActionDelete" sx={{display:"flex" , gap:"1rem"}}>
            <Button onClick={handleDeleteFunction} variant="outlined">{t?.pages?.Expenses?.Cancel}</Button>
            <Button
              onClick={handleDeleteThisItem}
              variant="contained"
              color="primary"
            >
              {t?.pages?.Expenses?.yes}
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
            backgroundColor:theme.palette.grey[50]
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
              <IconButton onClick={handleDeleteFunction}>
                <Trash color={theme.palette.grey["A700"]} size={25} />
              </IconButton>
              <IconButton onClick={handleClickUpdateItem}>
                <Edit color={theme.palette.grey["A700"]} size={25} />
              </IconButton>
            </Box>
          </Box>
        </Card>
      </Box>
    );
  };
  
  export default ConsumptionBox;
  