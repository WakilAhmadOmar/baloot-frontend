'use client'
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';

const openedMixin = (theme: Theme , drawerWidth:string): CSSObject => ({
  dir: "ltr",
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme , width?:number): CSSObject => ({
  direction: "ltr",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing( width || 7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing( width || 8)} + 1px)`,
  },
});

export const  Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })<{drawerwidth:string , open:boolean}>(
    ({ theme , drawerwidth  ,  open}) => ({

      width: drawerwidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
      boxSizing: "border-box",
      ...(open && {
        ...openedMixin(theme , drawerwidth),
        "& .MuiDrawer-paper": openedMixin(theme , drawerwidth),
      }),
      ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      }),
    }),
  );
export const  DrawerMobile = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })<{drawerwidth:string , open:boolean}>(
    ({ theme , drawerwidth  ,  open}) => ({

      width: drawerwidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
      boxSizing: "border-box",
      ...(open && {
        ...openedMixin(theme , drawerwidth),
        "& .MuiDrawer-paper": openedMixin(theme , drawerwidth),
      }),
      ...(!open && {
        ...closedMixin(theme  , 0),
        "& .MuiDrawer-paper": closedMixin(theme, 0 ),
      }),
    }),
  );