"use client";
import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import { Box, List } from "@mui/material";
import { Book,Home, Wallet1 } from "iconsax-react";
import LinkLayout from "./linkLayout";
import CollapseContainer from "./collapseContainer";
import { useTranslations } from "next-intl";

interface SideMenuMobileProps {
  open: boolean | undefined;
  toggleDrawer: () => void;
  drawerWidth: string;
  lang: "en" | "fa";
}

export default function SideMenuMobile({
  open,
  toggleDrawer,
  drawerWidth,
  lang,
}: SideMenuMobileProps) {
  const t = useTranslations();
  

  return (
    <Drawer
      anchor={t("home.dir") === "rtl" ? "right": "left"}
      open={open}
      onClose={toggleDrawer}
      sx={{
        p: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: "none",
          backgroundColor: "background.paper",
        },
      }}
    >
      <Box width={drawerWidth}>
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
        <Divider />
      </Box>
    </Drawer>
  );
}
