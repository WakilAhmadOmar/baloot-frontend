"use client";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  drawerwidth: number;
}

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, drawerwidth }) => ({
  backgroundColor: theme.palette.background.default,
  backgroundImage:"none",
  boxShadow: "none",
  color:"inherit !important",
  height: "7rem",
  marginInlineStart:drawerwidth,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }: any) => open,
      style: {
        marginLeft: drawerwidth,
        width: `calc(100% - ${drawerwidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));
