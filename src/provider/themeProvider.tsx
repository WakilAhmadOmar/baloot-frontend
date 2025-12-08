'use client'
import { ThemeProvider } from '@mui/material/styles';
import { themeLight  , themeDark } from './theme';
import { PropsWithChildren, useContext } from 'react';
import { AppContext } from './appContext';
import { Box } from '@mui/material';



const ThemeProviderComponent = (props:PropsWithChildren) =>{
    const {isDarkMode} = useContext(AppContext)

    return(
        <Box >

        <ThemeProvider theme={isDarkMode ? themeDark : themeLight}>
       {props?.children}
      </ThemeProvider>
        </Box>
    )
}

export default ThemeProviderComponent