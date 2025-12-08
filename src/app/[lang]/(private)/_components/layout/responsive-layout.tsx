"use client";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import LinkLayout from "./linkLayout";
import { Drawer, DrawerMobile } from "./Drawer";
import { DrawerHeader } from "./DrawerHeader";
import { AppBar } from "./AppBar";
import { ReactNode, useEffect, useState } from "react";
import CustomToolbar from "./CustomToolbar";
import { Book, Home, Wallet1 } from "iconsax-react";
import { LogoIcon } from "@/icons";
import CollapseContainer from "./collapseContainer";
import { useTranslations } from "next-intl";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import SideMenuMobile from "./sidebarMobile";
import { usePathname } from "next/navigation";
import CircularProgressComponent from "@/components/loader/CircularProgressComponent";

const drawerWidth = "36rem";

export default function MiniDrawerResponsive({
  children,
  lang,
}: {
  children: ReactNode;
  lang: "en" | "fa";
}) {
  const t = useTranslations();
  const theme = useTheme();
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading , setIsLoading] = useState(true)

  const isTablet = useMediaQuery(theme.breakpoints.down("md")); // 600px - 1200px
  const isDesktop = useMediaQuery(theme.breakpoints.up("md")); // >1200px

  const handleToggleDrawer = () => {
    setIsMobile(!isMobile);
  };
useEffect(()=>{
  setIsMobile(false)
  setIsLoading(false)
}, [pathname])
if(isLoading){
  return <CircularProgressComponent />
}
  return (
    <Box
      sx={{ display: "flex", position: "relative" }}
      // height={"calc(100vh - 8px)"}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        open={true}
        drawerwidth={isTablet ? "0px" : drawerWidth}
        
      >
        <CustomToolbar lang={lang} onMenuClick={handleToggleDrawer} />
      </AppBar>

      {/* Desktop and Tablet */}

      {isDesktop && (
        <Drawer
          variant="permanent"
          key={t("home.dir") === "rtl" ? "drawer-rtl" : "drawer-ltr"}
          open={true}
          drawerwidth={drawerWidth}
          anchor={t("home.dir") === "rtl" ? "right" : "left"}
          PaperProps={{
            sx:{
              bgcolor:theme.palette.background.default
            }
          }}
        >
          <DrawerHeader>
            <LogoIcon width={"150px"} />
          </DrawerHeader>
          <Divider />
          <List
            sx={{
              height: "100%",
              overflowY: "auto",
            }}
          >
            <LinkLayout
              Icon={<Home size={25} color="gray" />}
              href={"/" + lang}
              lang={lang}
              open
              text={t("layout.dashboard")}
              key={"Dashboard"}
            />
            <LinkLayout
              Icon={<Book size={25} color="gray" />}
              href={"/" + lang + "/journal"}
              lang={lang}
              open
              text={t("layout.journal_book")}
              key={"journal"}
            />
            <LinkLayout
              Icon={<Wallet1 size={25} color="gray" />}
              href={"/" + lang + "/currencies"}
              lang={lang}
              open
              text={t("layout.currencies")}
              key={"currencies"}
            />
            <CollapseContainer lang={lang} open />
          </List>
        </Drawer>
      )}
      {isTablet && isMobile && (
        <SideMenuMobile
          open={isMobile}
          toggleDrawer={handleToggleDrawer}
          drawerWidth={drawerWidth}
          lang={lang}
        />
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          // direction: t("home.dir")
        }}
      >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
