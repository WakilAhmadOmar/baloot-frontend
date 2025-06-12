"use client";
import Link from "next/link";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ReactElement } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "@mui/material";
import { useTranslations } from "next-intl";

const ListItemButtonStyle = {
  minHeight: 48,
  px: 2.5,
};
const ListItemButtonOpenStyle = {
  justifyContent: "initial",
};
const ListItemButtonCloseStyle = {
  justifyContent: "center",
};

const ListItemIconStyle = {
  minWidth: 0,
  justifyContent: "center",
};
const ListItemIconOpenStyle = {
  marginInlineEnd: 3,
};
const ListItemIconCloseStyle = {
  m: "auto",
};

const ListItemTextStyle = {
  textAlign: "start",

  "& .MuiListItemText-primary": {
    fontFamily: "Sans !important",
    fontSize: "1.5rem !important",
  },
};
const ListItemTextOpenStyle = {
  opacity: 1,
};
const ListItemTextCloseStyle = {
  opacity: 0,
};

const rtlTrue = "rgba(33,191,172,0.15) 99%, rgba(33,191,172,1) 1%";
const rtlFalse = "rgba(33,191,172,1) 0% , rgba(33,191,172,0.15) 1%";
interface IPropsLinkLayout {
  open: boolean;
  text: string;
  Icon?: ReactElement;
  href: string;
  lang: string;

}

const LinkLayout: React.FC<IPropsLinkLayout> = ({
  open,
  text,
  Icon,
  lang,
  href,

}) => {
  const pathname = usePathname();
const t = useTranslations("home")
  return (
    <Link href={href}>
      <ListItem
        disablePadding
        sx={{
          display: "block",
          background:
            pathname === href
              ? `linear-gradient(90deg,${
                  t("dir") === "rtl" ? rtlTrue : rtlFalse
                } )`
              : "",
        }}
      >
        <ListItemButton
          sx={[
            ListItemButtonStyle,
            open ? ListItemButtonOpenStyle : ListItemButtonCloseStyle,
          ]}
        >
          {Icon && (
            <ListItemIcon
              sx={[
                ListItemIconStyle,
                open ? ListItemIconOpenStyle : ListItemIconCloseStyle,
              ]}
            >
              {Icon}
            </ListItemIcon>
          )}
          <ListItemText
            primary={text}
            sx={[
              Icon ? {} : { paddingInlineStart: 3 },
              ListItemTextStyle,
              open ? ListItemTextOpenStyle : ListItemTextCloseStyle,
            ]}
          />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};
export default LinkLayout;
