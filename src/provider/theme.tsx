import { createTheme } from "@mui/material/styles";
// 0785932891
const themeLight = createTheme({

  palette: {
    mode:"light",
    grey: {
     
      "100": "#FAFAFA",
      "200": "#D9D9D9",
      "300": "#E8E8E8",
      "500": "#8C8C8C",
      "900": "rgba(67, 67, 67, 1)",
      A700: "#0E6359",
    },
    primary: {
      light: "#21bfac80",
      main: "#21BFAC",
      dark: "#17b19f",
      contrastText: "#121212bf",
      "100": "#0E6359",
    },
    secondary: {
      light: "#ba68c8",
      main: "#9c27b0",
      dark: "#7b1fa2",
      contrastText: "#FFF",
    },
    error: {
      light: "#ef5350",
      main: "#d32f2f",
      dark: "#c62828",
      contrastText: "#FFF",
    },
    warning: {
      light: "#ff9800",
      main: "#ed6c02",
      dark: "#e65100",
      contrastText: "#FFF",
    },
    info: {
      light: "#03a9f4",
      main: "#0288d1",
      dark: "#01579b",
      contrastText: "#FFF",
    },
    success: {
      light: "#4caf50",
      main: "#2e7d32",
      dark: "#1b5e20",
      contrastText: "#FFF",
    },
    // Provide every color token (light, main, dark, and contrastText) when using
    // custom colors for props in Material UI's components.
    // Then you will be able to use it like this: `<Button color="custom">`
    // (For TypeScript, you need to add module augmentation for the `custom` value)
    // custom: {
    //   light: "#ffa726",
    //   main: "#f57c00",
    //   dark: "#ef6c00",
    //   contrastText: "rgba(0, 0, 0, 0.87)",
    // },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    // contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    // tonalOffset: 0.2,
    background:{
      default:"#F5F5F5",
      paper:"#FFF"
    }
  },

  typography: {
    h1: {
      fontWeight: 700,
      fontFamily: "Sans",
      fontSize: "4rem",
    },
    h2: {
      fontWeight: 700,
      fontFamily: "Sans",
      fontSize: "3.2rem",
    },
    h3: {
      fontWeight: 700,
      fontFamily: "Sans",
      fontSize: "2.4rem",
    },
    h4: {
      fontWeight: 700,
      fontFamily: "Sans",
      fontSize: "2rem",
    },
    h5: {
      fontWeight: 700,
      fontFamily: "Sans",
      fontSize: "1.6rem",
    },
    h6: {
      fontWeight: 400,
      fontFamily: "Sans",
      fontSize: "2rem",
    },
    subtitle1: {
      fontWeight: 300,
      fontFamily: "Sans",
      fontSize: "1.8rem",
    },
    subtitle2: {
      fontWeight: 400,
      fontFamily: "Sans",
      fontSize: "1.6rem",
    },
    body1: {
      fontFamily: "Sans",
      fontWeight: 300,
      fontSize: "1.4rem",
    },
    body2: {
      fontWeight: 300,
      fontFamily: "Sans",
      fontSize: "1.2rem",
    },
    button: {
      fontWeight: 500,
      // fontFamily: "IRANSans",
      fontFamily: "Sans",
      fontSize: "1.6rem",
    },
    caption: {
      fontWeight: 500,
      // fontFamily: "IRANSans",
      fontFamily: "Sans",
      fontSize: "1.4rem",
    },
    overline: {
      fontFamily: "Sans",
      textTransform: "none",
      fontWeight: 400,
      fontSize: "1.4rem",
    },

  },
  components: {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          paddingInlineStart: "40px",
          paddingInlineEnd: "40px",
          weight: 500,
          size: "1.2rem",
          borderRadius: "8px",
        },
        outlined: {
          paddingInlineStart: "40px",
          paddingInlineEnd: "40px",
        },
        root: {
          fontWeight: 600,
          fontSize: "1.5rem",
          textTransform: "none",
        },
        
      },
    },

  },
});
const themeDark = createTheme({

  palette: {
    mode:"dark",
    grey: {
      50: "#ffffff0d",
      "100": "rgba(67, 67, 67, 1)",
      "200": "#D9D9D9",
      "300": "#E8E8E8",
      "500": "#8C8C8C",
      "900": "rgba(67, 67, 67, 1)",
      A700: "#0E6359",
    },
    primary: {
      light: "#21bfac80",
      main: "#21BFAC",
      dark: "#17b19f",
      contrastText: "#FFF",
      "100": "#0E6359",
    },
    secondary: {
      light: "#ba68c8",
      main: "#9c27b0",
      dark: "#7b1fa2",
      contrastText: "#FFF",
    },
    error: {
      light: "#ef5350",
      main: "#d32f2f",
      dark: "#c62828",
      contrastText: "#FFF",
    },
    warning: {
      light: "#ff9800",
      main: "#ed6c02",
      dark: "#e65100",
      contrastText: "#FFF",
    },
    info: {
      light: "#03a9f4",
      main: "#0288d1",
      dark: "#01579b",
      contrastText: "#FFF",
    },
    success: {
      light: "#4caf50",
      main: "#2e7d32",
      dark: "#1b5e20",
      contrastText: "#FFF",
    },
 
    background:{
      default:"#121212",
      paper:"#121212"
    }
  },

  typography: {
    h1: {
      fontWeight: 700,
      fontFamily: "Sans",
      fontSize: "4rem",
    },
    h2: {
      fontWeight: 700,
      fontFamily: "Sans",
      fontSize: "3.2rem",
    },
    h3: {
      fontWeight: 700,
      fontFamily: "Sans",
      fontSize: "2.4rem",
    },
    h4: {
      fontWeight: 700,
      fontFamily: "Sans",
      fontSize: "2rem",
    },
    h5: {
      fontWeight: 700,
      fontFamily: "Sans",
      fontSize: "1.6rem",
    },
    h6: {
      fontWeight: 400,
      fontFamily: "Sans",
      fontSize: "2rem",
    },
    subtitle1: {
      fontWeight: 300,
      fontFamily: "Sans",
      fontSize: "1.8rem",
    },
    subtitle2: {
      fontWeight: 400,
      fontFamily: "Sans",
      fontSize: "1.6rem",
    },
    body1: {
      fontFamily: "Sans",
      fontWeight: 300,
      fontSize: "1.4rem",
    },
    body2: {
      fontWeight: 300,
      fontFamily: "Sans",
      fontSize: "1.2rem",
    },
    button: {
      fontWeight: 500,
      // fontFamily: "IRANSans",
      fontFamily: "Sans",
      fontSize: "1.6rem",
    },
    caption: {
      fontWeight: 500,
      // fontFamily: "IRANSans",
      fontFamily: "Sans",
      fontSize: "1.4rem",
    },
    overline: {
      fontFamily: "Sans",
      textTransform: "none",
      fontWeight: 400,
      fontSize: "1.4rem",
    },
  },
  components: {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          paddingInlineStart: "40px",
          paddingInlineEnd: "40px",
          weight: 500,
          size: "1.2rem",
          borderRadius: "8px",
        },
        outlined: {
          paddingInlineStart: "40px",
          paddingInlineEnd: "40px",
        },
        root: {
          fontWeight: 600,
          fontSize: "1.5rem",
          textTransform: "none",
        },
      },
    },
  },
});

export { themeLight , themeDark };
