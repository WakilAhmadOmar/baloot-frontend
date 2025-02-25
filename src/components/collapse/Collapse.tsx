import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Collapse,
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
import React, { useState } from "react";
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
const CollapseComponent: React.FC<IProps> = ({
  children,
  name,
  createdAt,
  id,
  getIdToAddAction,
  updateProductFunction,
  height,
  t,
  messageDescription,
  messageTitle
}) => {
  const theme = useTheme();
  const [handleCollapseState, setHandleCollapseState] = useState(false);
  const [handleDeleteState, setHandleDeleteState] = useState(false);
  const handleCollapseFunction = () => {
    setHandleCollapseState(!handleCollapseState);
  };
  const handleDeleteFunction = () => {
    setHandleDeleteState(!handleDeleteState);
  };
  const handleDeleteThisItem = () => {
    if (getIdToAddAction && id) {
      getIdToAddAction(id);
      handleDeleteFunction();
    }
  };
  const handleClickUpdateItem = () => {
    if (updateProductFunction && id) {
      updateProductFunction(id);
    }
  };

  return (
    <Box mt={0.5} borderRadius={"8px"}>
      <Dialog
        open={handleDeleteState}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDeleteFunction}
        aria-describedby="alert-dialog-slide-description"
        dir={t?.home?.dir}
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
        <DialogActions className="dialogActionDelete">
          <Button onClick={handleDeleteFunction} variant="outlined">{t?.product?.cancel}</Button>
          <Button
            onClick={handleDeleteThisItem}
            variant="contained"
            color="primary"
          >
            {t?.product?.yes}
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
          // justifyContent: "space-between",
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
              <ArrowUp2 size={25} color={theme.palette.primary.contrastText} />
            ) : (
              <ArrowDown2
                size={25}
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
          }}
        >
          <Typography variant="body2">
            <Moment format="YYYY/MM/DD">{createdAt}</Moment>
          </Typography>
          <IconButton onClick={handleDeleteFunction}>
            <Trash size={25} color={theme.palette.primary.contrastText} />
          </IconButton>
          <IconButton onClick={handleClickUpdateItem}>
            <Edit size={25} color={theme.palette.primary.contrastText} />
          </IconButton>
        </Box>
      </Box>
      {true && (
        <Box
          pt={handleDeleteState ? 1 : 0}
          pb={handleDeleteState ? 1 : 0}
          pr={2}
          pl={2}
          sx={{
            overflow: "hidden",
            backgroundColor: theme.palette.grey[100],
            borderBottomLeftRadius: "8px",
            borderBottomRightRadius: "8px",
            height: handleCollapseState ? height || "200px" : "0px",
            transition: "height 0.25s",
            transitionTimingFunction: "linear",
          }}
        >
          <Box height={"100%"} p={2}>
            {children}
          </Box>
        </Box>
      )}
    </Box>
    // <Accordion
    //   sx={{
    //     boxShadow: "none",
    //     margin: "2px 0",
    //   }}
    // >
    //   <AccordionSummary
    //     expandIcon={<ArrowDown2 />}
    //     aria-controls="panel1a-content"
    //     id="panel1a-header"
    //     sx={{ display: "flex", width: "100%" }}
    //   >
    //     <Box
    //       sx={{
    //         display: "flex",
    //         justifyContent: "space-between",
    //         alignItems: "center",
    //         widht: "100%",
    //       }}
    //     >
    //       <Typography>نام محصول در اینجا نوشته میشود</Typography>
    //       <Box
    //         sx={{
    //           display: "flex",
    //           alignItems: "center",
    //           columnGap: "1rem",
    //         }}
    //       >
    //         <Trash />
    //         <Edit />
    //         <Typography>1402/2/23</Typography>
    //       </Box>
    //     </Box>
    //   </AccordionSummary>
    //   <AccordionDetails>
    //     <Typography>
    //       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
    //       malesuada lacus ex, sit amet blandit leo lobortis eget.
    //     </Typography>
    //   </AccordionDetails>
    // </Accordion>
  );
};

export default CollapseComponent;
