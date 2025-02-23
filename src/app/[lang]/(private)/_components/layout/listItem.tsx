import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
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
import { usePathname } from "next/navigation";
import { MouseEvent } from "react";

const ListItemButtonCss = {
  minHeight: 48,
  justifyContent: "initial",
  px: 2.5,
};
const ListItemIconCss = {
  minWidth: 0,
  marginInlineEnd: 3,
  justifyContent: "center",
  // marginRight: "0px",
};
const listItemTextCss = {
  opacity: 1,
  textAlign: "start",
  paddingInlineStart: "1.3rem",
  fontFamily: "Sans",
  fontWeight: "500",
};

const ListItemTextStyle = {
  textAlign: "start",
  "& .MuiListItemText-primary": { fontFamily: "Sans !important" },
};
const ListItemTextOpenStyle = {
  opacity: 1,
};
const ListItemTextCloseStyle = {
  opacity: 0,
};

interface IPropsListItem {
  t: any;
  text: string;
  handleOpenCollapse: (event: MouseEvent<HTMLElement>) => void;
  name: string;
  open?: boolean;
  selectedList: string;
}

const ListItemComponent: React.FC<IPropsListItem> = ({
  t,
  text,
  handleOpenCollapse,
  open,
  name,
  selectedList,
}) => {
  const pathname = usePathname();
  return (
    <ListItem
      disablePadding
      onClick={handleOpenCollapse}
      id={name}
      sx={{
        display: "block",
        background:
          pathname?.split("/")?.[2] === name
            ? `linear-gradient(90deg,${
                t.home.dir === "rtl"
                  ? "rgba(33,191,172,1) 0% , rgba(33,191,172,0.15) 1%"
                  : "rgba(33,191,172,0.15) 99%, rgba(33,191,172,1) 1%"
              } )`
            : "",
      }}
    >
      <ListItemButton sx={ListItemButtonCss}>
        <ListItemIcon sx={ListItemIconCss}>
          <Keyboard size={25} color="gray"/>
        </ListItemIcon>
        <ListItemText
          primary={text}
          sx={[
            ListItemTextStyle,
            open ? ListItemTextOpenStyle : ListItemTextCloseStyle,
          ]}
        />
        {name === selectedList ? <ArrowUp2 size={25} color="gray"/> : <ArrowDown2 size={25} color="gray"/>}
      </ListItemButton>
    </ListItem>
  );
};

export default ListItemComponent;
