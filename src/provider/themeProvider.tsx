'use client'
import { ThemeProvider } from '@mui/material/styles';
import { themeLight  , themeDark } from './theme';
import { PropsWithChildren, useContext } from 'react';
import { AppContext } from './appContext';



const ThemeProviderComponent = (props:PropsWithChildren) =>{
    const {isDarkMode} = useContext(AppContext)
    return(
        <ThemeProvider theme={isDarkMode ? themeDark : themeLight}>
       {props?.children}
      </ThemeProvider>
    )
}

export default ThemeProviderComponent