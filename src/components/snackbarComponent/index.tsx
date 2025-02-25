import { Snackbar, Alert } from "@mui/material";
import { useEffect } from "react";

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
        sx={{ width: "100%", fontSize:"1.3rem" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;