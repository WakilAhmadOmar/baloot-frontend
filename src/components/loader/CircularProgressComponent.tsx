import { Box, CircularProgress } from "@mui/material";
import React from "react";

const CircularProgressComponent = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        height: "100%",
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        top: 0,
        left: 0,
        background:"#8080804f",
        zIndex:10000000000
      }}
    >
      <CircularProgress />
    </Box>
  );
};
export default CircularProgressComponent;
