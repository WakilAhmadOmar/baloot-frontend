"use client"
import { Box, IconButton, useTheme } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";
import {
    Notification,
  } from "iconsax-react";
import { LogoIcon } from "@/icons";
import PositionText from "./PositionText";
import Language from "./language";
import CompanyMenuComponent from "./companyMenu";
import ThemeToggle from "./ThemeToggle";

 interface IPropsCustomToolbar {
    t:any
    lang:string
 }
const CustomToolbar:React.FC<IPropsCustomToolbar> = ({t , lang}) => {
    const theme = useTheme()
    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(!open);
      };
    return (
        <Toolbar  >
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
                <PositionText t={t} />
            </Box>
            <Box
              display="flex"
              justifyContent={"space-between"}
              justifySelf={"flex-end"}
              columnGap={2}
            >
              <Box>
                <Language t={t} lang={lang}/>
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
                <CompanyMenuComponent t={t} />
              </Box>
            </Box>
          </Box>
        </Toolbar>
    )
}

export default CustomToolbar