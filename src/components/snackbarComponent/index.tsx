import { Snackbar, Alert } from "@mui/material";
import { useTranslations } from "next-intl";

interface IPropsSnackbar {
  status: "success" | "info" | "warning" | "error";
  open: boolean;
  handleClose: () => void;
  message: string;
}
const SnackbarComponent: React.FC<IPropsSnackbar> = ({
  handleClose,
  message,
  open,
  status,
}) => {
  const t = useTranslations()
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        variant={"standard"}
        severity={status}
        sx={{
          width: "100%",
          fontSize: "1.7rem",
          display: "flex",
          gap:"2rem",
          justifyContent: "space-between",
          alignItems: "center",
          direction:t("home.dir"),
          "& .MuiAlert-action":{
            display:"flex",
            justifyContent:"flex-end",
            padding:0,
            "& .MuiSvgIcon-root":{
              fontSize:"2rem"
            }
          }
        }}
        //  sx={{
        //   width: "100%",
        //   fontSize: "1.5rem",
        //   textAlign: 'right', // Align text to right in RTL
        //   direction: 'rtl', // Set direction for the alert content
        //   '& .MuiAlert-message': {
        //     padding: '8px 0', // Adjust padding if needed
        //   }
        // }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
