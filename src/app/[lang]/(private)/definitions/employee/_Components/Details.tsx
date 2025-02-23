import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Slide,
    Typography,
    useTheme,
  } from "@mui/material";
  import { TransitionProps } from "@mui/material/transitions";
  import { CloseSquare } from "iconsax-react";
  import React from "react";
  
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
  interface IPropsEmployeeDetails {
    item: any; 
    t:any
  }
  const EmployeeDetails: React.FC<IPropsEmployeeDetails> = ({ item , t }) => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
  
    const handleClickOpen = () => {
      setOpen(!open);
    };
    return (
      <Box>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClickOpen}
          aria-describedby="alert-dialog-slide-description"
          fullWidth
          dir="rtl"
        >
          <DialogTitle
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            borderBottom={`1px solid ${theme.palette.grey[200]}`}
            mb={3}
          >
            <Typography variant="button">{t?.pages?.employee?.employee_details}</Typography>
            <IconButton onClick={handleClickOpen}>
              <CloseSquare />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Box display={"grid"} justifyContent={"center"}>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                variant="square"
                sx={{
                  width: "15rem",
                  height: "15rem",
                  borderRadius: "1rem",
                }}
              />
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "2rem",
                  color: "#000",
                }}
                textAlign={"center"}
                mt={2}
              >
                {item?.name}
              </Typography>
              <Typography textAlign={"center"} variant="subtitle2">
                {item?.jobTitle}
              </Typography>
              <Typography textAlign={"center"} variant="subtitle2">
                 {t?.pages?.employee?.id_number}: {item?.idNumber}
              </Typography>
            </Box>
            <Box
              display={"grid"}
              gridTemplateColumns={"15rem auto"}
              rowGap={"1rem"}
              mt={3}
            >
              <Typography textAlign={"start"} variant="subtitle2">
                {t?.pages?.employee?.fathers_name}:
              </Typography>
              <Typography textAlign={"start"} variant="subtitle2">
                {item?.fathersName}
              </Typography>
              <Typography textAlign={"start"} variant="subtitle2">
               {t?.pages?.employee?.phone_number}: 
              </Typography>
              <Typography textAlign={"start"} variant="subtitle2">
                {item?.phoneNumber}
              </Typography>
              <Typography textAlign={"start"} variant="subtitle2">
               {t?.pages?.employee?.salary_amount} : 
              </Typography>
              <Typography textAlign={"start"} variant="subtitle2">
                {item?.salary?.amount}
              </Typography>
              <Typography textAlign={"start"} variant="subtitle2">
               {t?.pages?.employee?.date_of_birth} : 
              </Typography>
              <Typography textAlign={"start"} variant="subtitle2">
                {item?.dateOfBirth}
              </Typography>
              <Typography textAlign={"start"} variant="subtitle2">
               {t?.pages?.employee?.start_date}: 
              </Typography>
              <Typography textAlign={"start"} variant="subtitle2">
                {item?.startDate}
              </Typography>
              <Typography textAlign={"start"} variant="subtitle2">
               {t?.pages?.employee?.email}: 
              </Typography>
              <Typography textAlign={"start"} variant="subtitle2">
                {item?.email}
              </Typography>
              <Typography textAlign={"start"} variant="subtitle2">
              {t?.pages?.employee?.address} : 
              </Typography>
              <Typography textAlign={"start"} variant="subtitle2">
                {item?.address}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions
            sx={{
              borderTop: `1px solid ${theme.palette.grey[200]}`,
              p: "1.5rem",
              justifyContent: "start",
            }}
          >
            <Button onClick={handleClickOpen} variant="outlined" color="primary">
             {t?.pages?.employee?.cancel} 
            </Button>
          </DialogActions>
        </Dialog>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
         {t?.pages?.employee?.more_info}
        </Button>
      </Box>
    );
  };
  export default EmployeeDetails;
  