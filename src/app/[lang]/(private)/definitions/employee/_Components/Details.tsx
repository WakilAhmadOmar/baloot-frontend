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
import { useTranslations } from "next-intl";
import React from "react";
import Moment from "react-moment";

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
}
const EmployeeDetails: React.FC<IPropsEmployeeDetails> = ({ item }) => {
  const t = useTranslations("pages");
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
        dir={t("dir")}
      >
        <DialogTitle
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          borderBottom={`1px solid ${theme.palette.grey[200]}`}
          mb={3}
        >
          <Typography variant="button">
            {t("employee.employee_details")}
          </Typography>
          <IconButton onClick={handleClickOpen}>
            <CloseSquare />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box display={"grid"} justifyContent={"center"}>
            {/* <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              variant="square"
              sx={{
                width: "15rem",
                height: "15rem",
                borderRadius: "1rem",
              }}
            /> */}
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
              {t("employee.id_number")}: {item?.idNumber}
            </Typography>
          </Box>
          <Box
            display={"grid"}
            gridTemplateColumns={"15rem auto"}
            rowGap={"1rem"}
            mt={3}
          >
            <Typography textAlign={"start"} variant="subtitle2">
              {t("employee.fathers_name")}:
            </Typography>
            <Typography textAlign={"start"} variant="subtitle2">
              {item?.fathersName}
            </Typography>
            <Typography textAlign={"start"} variant="subtitle2">
              {t("employee.phone_number")}:
            </Typography>
            <Typography textAlign={"start"} variant="subtitle2">
              {item?.contactNumber}
            </Typography>
            <Typography textAlign={"start"} variant="subtitle2">
              {t("employee.salary_amount")} :
            </Typography>
            <Typography textAlign={"start"} variant="subtitle2">
              {item?.salary?.amount}
            </Typography>
            <Typography textAlign={"start"} variant="subtitle2">
              {t("employee.date_of_birth")} :
            </Typography>
            <Typography textAlign={"start"} variant="subtitle2">
              <Moment format="DD/MM/YYYY">{item?.dateOfBirth}</Moment>
            </Typography>
            <Typography textAlign={"start"} variant="subtitle2">
              {t("employee.start_date")}:
            </Typography>
            <Typography textAlign={"start"} variant="subtitle2">
              <Moment format="DD/MM/YYYY">{item?.startDate}</Moment>
            </Typography>
            <Typography textAlign={"start"} variant="subtitle2">
              {t("employee.email")}:
            </Typography>
            <Typography textAlign={"start"} variant="subtitle2">
              {item?.email}
            </Typography>
            <Typography textAlign={"start"} variant="subtitle2">
              {t("employee.address")} :
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
            {t("employee.cancel")}
          </Button>
        </DialogActions>
      </Dialog>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {t("employee.more_info")}
      </Button>
    </Box>
  );
};
export default EmployeeDetails;
