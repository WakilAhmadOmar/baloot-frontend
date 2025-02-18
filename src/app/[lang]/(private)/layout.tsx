import Box from "@mui/material/Box";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import LinkLayout from "./_components/layout/linkLayout";
import { Drawer } from "./_components/layout/Drawer";
import { DrawerHeader } from "./_components/layout/DrawerHeader";
import { AppBar } from "./_components/layout/AppBar";
import { ReactNode } from "react";
import { getDictionary } from "@/dictionaries";
import CustomToolbar from "./_components/layout/CustomToolbar";
import {
  Activity,
  ArrowDown2,
  ArrowUp2,
  Book,
  CardCoin,
  HambergerMenu,
  Home,
  Keyboard,
  Note,
  Notification,
  UsdCoin,
  Wallet1,
  WalletAdd1,
} from "iconsax-react";
import { LogoIcon } from "@/icons";
import CollapseContainer from "./_components/layout/collapseContainer";

const drawerWidth = 320;

export default async function MiniDrawer({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: "en" | "fa" }>;
}) {
  const lang = (await params).lang;
  const tra = await getDictionary(lang);

  const isRTL = tra?.home?.dir === "rtl";

  return (
    <Box
      sx={{ display: "flex" , direction:tra?.home?.dir }}
      height={"calc(100vh - 8px)"}
    >
      <CssBaseline />
      <AppBar position="fixed" open={true} drawerwidth={drawerWidth} >
        <CustomToolbar t={tra} />
      </AppBar>
      <Drawer
        variant="permanent"
        key={isRTL ? "drawer-rtl" : "drawer-ltr"}
        open={true}
        drawerwidth={drawerWidth}
        anchor={isRTL ? "right" : "left"}
      >
        <DrawerHeader >
          <LogoIcon width={"150px"} />
        </DrawerHeader>
        <Divider />
        <List sx={{
          height:"100%",
          overflowY:"auto"
        }} >
          <LinkLayout
            Icon={ <Home size={25}  color="gray"/>}
            href={"/" + lang}
            lang={lang}
            open
            text={tra.layout.dashboard}
            key={"Dashboard"}
            t={tra}
          />
          <LinkLayout
            Icon={ <Book size={25} color="gray"/>}
            href={"/" + lang +"/journal"}
            lang={lang}
            open
            text={tra.layout.journal_book}
            key={"journal"}
            t={tra}
          />
          <LinkLayout
            Icon={  <Wallet1 size={25} color="gray"/>}
            href={"/" + lang +"/currencies"}
            lang={lang}
            open
            text={tra.layout.currencies}
            key={"currencies"}
            t={tra}
          />
        <CollapseContainer t={tra} lang={lang} open />
        </List>
      </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 , direction:tra?.home?.dir }}>
          <DrawerHeader />
          {children}
        </Box>
    </Box>
  );
}
