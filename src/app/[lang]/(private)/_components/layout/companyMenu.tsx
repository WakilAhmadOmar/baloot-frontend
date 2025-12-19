"use client"
// import useTranslation from "@/components/utilFunction/useTranslation";
import { ACCESS_TOKEN_KEY } from "@/libs/constants";
import { deleteSession } from "@/utils/deleteSession";
import {
  Avatar,
  Box,
  MenuItem,
  Paper,
  Popover,
  Typography,
  useTheme,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";



const CompanyMenuComponent= () => {
  const session:any = useSession()
  const router = useRouter();
const t = useTranslations("home")
const pathname = usePathname()
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleLogout = async () => {
    await signOut()

    router.push("/login")
  }
  return (
    <Box>
      <Avatar
        variant="square"
        alt="Remy Sharp"
        // src="/static/images/avatar/1.jpg"
        onClick={handleClick}
        sx={{
          bgcolor: theme.palette.grey[200],
          borderRadius: "3px",
        }}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 75,
          horizontal: -10,
        }}
        sx={{
          // overflow: "inherit",
          // background: "green",
          "& .MuiPaper-root": {
            overflow: "inherit",
          },
        }}
      >
        <Box sx={{ width: "250px", position: "relative" }} dir={t("dir")}>
          <Box
            sx={{
              display: "grid",
              justifyContent: "center",
              paddingTop: "2rem",
              pb: "2rem",
            }}
          >
            <Avatar variant="circular" sx={{ width: 70, height: 70 }} />
            <Typography variant="subtitle1">{session?.data?.token?.profile?.name}</Typography>
          </Box>
          <Box py={2} >
            <Box sx={{ borderTop: `2px solid ${theme.palette.grey[100]}` }}>
              <Link href={"/settings"} locale={`${pathname?.split("/")?.[0]}`}>
                <MenuItem>
                  <Typography variant="subtitle2">
                    {t("company_profile")}
                  </Typography>
                </MenuItem>
              </Link>
            </Box>
            {/* <Box sx={{ borderTop: `2px solid ${theme.palette.grey[100]}` }}>
              <Link href={"/users"} locale={`${pathname?.split("/")?.[0]}`}>
                <MenuItem>
                  <Typography variant="subtitle2">
                    {t("users_permissions")}
                  </Typography>
                </MenuItem>
              </Link>
            </Box>
            <Box sx={{ borderTop: `2px solid ${theme.palette.grey[100]}` }}>
              <Link href={"/settings"} locale={`${pathname?.split("/")?.[0]}`}>
                <MenuItem>
                  <Typography variant="subtitle2">
                    {t("team_info")}
                  </Typography>
                </MenuItem>
              </Link>
            </Box>
            <Box sx={{ borderTop: `2px solid ${theme.palette.grey[100]}` }}>
              <Link href={"/settings"} locale={`${pathname?.split("/")?.[0]}`}>
                <MenuItem>
                  <Typography variant="subtitle2">
                    {t("about_alpha")}
                  </Typography>
                </MenuItem>
              </Link>
            </Box> */}
            <Box sx={{ borderTop: `2px solid ${theme.palette.grey[100]}` }}>
              {/* <Link href={"/settings"} locale={`${pathname?.split("/")?.[0]}`}> */}
                <MenuItem onClick={handleLogout}>
                  <Typography variant="subtitle2">{t("logout")}</Typography>
                </MenuItem>
              {/* </Link> */}
            </Box>
          </Box>
          {/* <Box
            sx={{
              position: "absolute",
              top: "-12px",
              height: "30px",
              width: "30px",
              backgroundColor: theme.palette.background?.default,
              zIndex: 1000,
              transform: "rotate(45deg)",
              borderRadius: "8px",
              ...(t("dir") === "rtl" ? { left: "20px" } : { right: "20px" }),
            }}
          ></Box> */}
        </Box>
      </Popover>
    </Box>
  );
};

export default CompanyMenuComponent;
