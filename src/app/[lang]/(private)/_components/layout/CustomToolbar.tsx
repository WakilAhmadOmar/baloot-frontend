"use client";
import { Box, IconButton, useTheme } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { Notification, HambergerMenu } from "iconsax-react";
import PositionText from "./PositionText";
import Language from "./language";
import CompanyMenuComponent from "./companyMenu";
import ThemeToggle from "./ThemeToggle";

interface IPropsCustomToolbar {
  lang: string;
  onMenuClick: () => void;
}
const CustomToolbar: React.FC<IPropsCustomToolbar> = ({
  lang,
  onMenuClick,
}) => {
  const theme = useTheme();

  return (
    <Toolbar>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box display="flex" alignItems={"center"} columnGap="1rem">
          <Box
            sx={{
              [theme.breakpoints.down("md")]: {
                display: "none",
              },
            }}
          >
            <PositionText />
          </Box>
          <Box sx={{
            [theme.breakpoints.up("md")]:{
              display:"none"
            }
          }}>
            <IconButton color="primary" edge="start" onClick={onMenuClick}>
              <HambergerMenu size={35} color="gray" />
            </IconButton>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent={"space-between"}
          justifySelf={"flex-end"}
          columnGap={2}
        >
          <Box>
            <Language lang={lang} />
          </Box>
          <Box>
            <ThemeToggle />
          </Box>
          <Box position={"relative"}>
            <IconButton>
              <Notification size="25" color="#0E6359" />
            </IconButton>
            <Box
              sx={{
                position: "absolute",
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                backgroundColor: theme.palette.error.main,
                color: "#FFF",
                top: 7,
                right: 7,
                fontWeight: 500,
                fontSize: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              10
            </Box>
          </Box>
          <Box>
            <CompanyMenuComponent />
          </Box>
        </Box>
      </Box>
    </Toolbar>
  );
};

export default CustomToolbar;
