import { Box, IconButton } from "@mui/material";
import NightlightRoundOutlinedIcon from "@mui/icons-material/NightlightRoundOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useCallback, useContext } from "react";
import { AppContext } from "@/provider/appContext";
import { THEME_KEY } from "@/libs/constants";
const ThemeToggle = () => {
  const { isDarkMode, setIsDarkMode } = useContext(AppContext);
  
  const handleToggleTheme = useCallback(() => {
    localStorage.setItem(THEME_KEY , isDarkMode ? "light": "dark")
    setIsDarkMode(!isDarkMode)
  },[isDarkMode])

  return (
    <Box>
      <IconButton onClick={handleToggleTheme} size="large">
        {isDarkMode ? (
          <LightModeOutlinedIcon  fontSize="large"/>
        ) : (
          <NightlightRoundOutlinedIcon fontSize="large" />
        )}
      </IconButton>
    </Box>
  );
};

export default ThemeToggle;
