"use client";
import SnackbarComponent from "@/components/snackbarComponent";
import { THEME_KEY } from "@/libs/constants";
import { createContext, PropsWithChildren, useCallback, useEffect, useState } from "react";

export const AppContext = createContext<any>({});

const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [handleError, setHandleError] = useState<{
    status: "success" | "info" | "warning" | "error";
    open: boolean;
    message: string;
  }>({
    status: "success",
    open: false,
    message: "",
  });
  useEffect(() => {
    const theme = localStorage.getItem(THEME_KEY);
    if (theme === "light") {
      setIsDarkMode(false);
    }
  }, []);
  
  const handleCloseError = useCallback(() => {
    setHandleError((prev)=>({...prev , open:false}))
  },[handleError?.open])
  return (
    <AppContext.Provider
      value={{ isDarkMode, setIsDarkMode, handleError, setHandleError }}
    >
      <SnackbarComponent
        status={handleError?.status}
        open={handleError?.open}
        message={handleError?.message}
        handleClose={handleCloseError}
      />
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
