import {
  Box,
  Typography,
  IconButton,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { ArrowDown2, Trash, Edit, ArrowUp2, InfoCircle } from "iconsax-react";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import Moment from "react-moment";
// height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms
interface IProps {
  children: React.ReactNode;
  name?: string;
  createdAt?: string;
  getIdToAddAction?: (id: string) => void;
  updateProductFunction?: (id: string) => void;
  id?: string;
  height?: string;
  messageTitle:string,
  messageDescription:string,
  editTable?:boolean,
  UpdateComponent?:React.ReactNode,
  isLoading?:boolean
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const CollapseComponent: React.FC<IProps> = ({
  children,
  name,
  createdAt,
  id,
  getIdToAddAction,
  updateProductFunction,
  height,
  messageDescription,
  messageTitle,
  editTable= true,
  UpdateComponent,
  isLoading= false
}) => {
  const t = useTranslations()
  const theme = useTheme();
  const [handleCollapseState, setHandleCollapseState] = useState(false);
  const [handleDeleteState, setHandleDeleteState] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState("0px");
  const handleCollapseFunction = () => {
    setHandleCollapseState(!handleCollapseState);
  };
  const handleDeleteFunction = () => {
    setHandleDeleteState(!handleDeleteState);
  };
  const handleDeleteThisItem = () => {
    if (getIdToAddAction && id) {
      getIdToAddAction(id);
      // handleDeleteFunction();
    }
  };


  useEffect(() => {
    if (handleCollapseState && contentRef.current) {
      setContentHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setContentHeight("0px");
    }
  }, [handleCollapseState, children]);
  useEffect(()=>{
    if(!isLoading){
      setHandleDeleteState(false);
    }
  },[isLoading])

  return (
    <Box mt={0.5} borderRadius={"8px"}>
      <Dialog
        open={handleDeleteState}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDeleteFunction}
        aria-describedby="alert-dialog-slide-description"
        dir={t("home.dir")}
      >
        <DialogTitle className="dialogTitleDelete" display={"flex"} gap={1} alignItems={"center"}justifyContent={"space-between"}>
          <Typography variant="h5">{messageTitle}</Typography>
          <InfoCircle size="32" color={theme.palette.warning.main} />
        </DialogTitle>
        <DialogContent className="dialogContentDelete">
          <DialogContentText id="alert-dialog-slide-description">
            <Typography variant="body1">
              {messageDescription}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="dialogActionDelete" sx={{ display:"flex" , gap:"1rem"}}>
          <Button onClick={handleDeleteFunction} variant="outlined">{t("product.cancel")}</Button>
          <Button
            onClick={handleDeleteThisItem}
            variant="contained"
            color="primary"
            loading={isLoading}
          >
            {t("product.yes")}
          </Button>
        </DialogActions>
      </Dialog>
      <Box
        pt={2}
        pb={2}
        pr={2}
        pl={2}
        sx={{
          display: "grid",
          gridTemplateColumns: "auto 17rem",
          alignItems: "center",
        }}
        bgcolor={theme.palette.background.default}
        borderRadius={"8px"}
      >
        <Box
          display="flex"
          alignItems={"center"}
          columnGap={"1rem"}
          color={"inherit"}
        >
          <IconButton onClick={handleCollapseFunction}>
            {handleCollapseState ? (
              <ArrowUp2 size={20} color={theme.palette.primary.contrastText} />
            ) : (
              <ArrowDown2
                size={20}
                color={theme.palette.primary.contrastText}
              />
            )}
          </IconButton>
          <Typography
            variant="h5"
            onClick={handleCollapseFunction}
            sx={{
              cursor: "pointer",
              width: "100%",
            }}
          >
            {name}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            columnGap: "1rem",
            justifyContent:"flex-end"
          }}
        >
          <Typography variant="body2">
            <Moment format="YYYY/MM/DD">{createdAt}</Moment>
          </Typography>
          {getIdToAddAction && <IconButton onClick={handleDeleteFunction}>
            <Trash size={20} color={theme.palette.primary.contrastText} />
          </IconButton>}
          {
            editTable && UpdateComponent 
          }
          {/* {editTable && <IconButton onClick={handleClickUpdateItem}>
            <Edit size={20} color={theme.palette.primary.contrastText} />
          </IconButton>} */}
        </Box>
      </Box>
      {true && (
        <Box
        ref={contentRef}
          pt={handleDeleteState ? 1 : 0}
          pb={handleDeleteState ? 1 : 0}
          pr={2}
          pl={2}
          sx={{
            overflow: "hidden",
            backgroundColor: theme.palette.grey[100],
            borderBottomLeftRadius: "8px",
            borderBottomRightRadius: "8px",
            // height: handleCollapseState ? height || "200px" : "0px",
            // transition: "height 0.25s",
            // transitionTimingFunction: "linear",
            maxHeight: contentHeight,
          transition: "max-height 0.25s ease-in-out",
          }}
        >
          <Box height={"100%"} p={2}>
            {children}
          </Box>
        </Box>
      )}
    </Box>
    
  );
};

export default CollapseComponent;
