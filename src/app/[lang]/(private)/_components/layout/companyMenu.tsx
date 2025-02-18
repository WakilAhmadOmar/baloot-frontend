// import useTranslation from "@/components/utilFunction/useTranslation";
import {
  Avatar,
  Box,
  MenuItem,
  Popover,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface IPropsCompanyMenu {
    t:any
}

const CompanyMenuComponent:React.FC<IPropsCompanyMenu> = ({t}) => {
  const router = useRouter();
//   const { t } = useTranslation();
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
        <Box sx={{ width: "250px", position: "relative" }} dir={t?.home?.dir}>
          <Box
            sx={{
              display: "grid",
              justifyContent: "center",
              paddingTop: "2rem",
              pb: "2rem",
            }}
          >
            <Avatar variant="circular" sx={{ width: 70, height: 70 }} />
          </Box>
          <Box py={2} px={4}>
            <Box sx={{ borderTop: `2px solid ${theme.palette.grey[100]}` }}>
              <Link href={"/settings"} locale={`${pathname?.split("/")?.[0]}`}>
                <MenuItem>
                  <Typography variant="subtitle2">
                    {t?.home?.company_prfile}
                  </Typography>
                </MenuItem>
              </Link>
            </Box>
            <Box sx={{ borderTop: `2px solid ${theme.palette.grey[100]}` }}>
              <Link href={"/users"} locale={`${pathname?.split("/")?.[0]}`}>
                <MenuItem>
                  <Typography variant="subtitle2">
                    {t?.home?.users_permissions}
                  </Typography>
                </MenuItem>
              </Link>
            </Box>
            <Box sx={{ borderTop: `2px solid ${theme.palette.grey[100]}` }}>
              <Link href={"/settings"} locale={`${pathname?.split("/")?.[0]}`}>
                <MenuItem>
                  <Typography variant="subtitle2">
                    {t?.home?.team_info}
                  </Typography>
                </MenuItem>
              </Link>
            </Box>
            <Box sx={{ borderTop: `2px solid ${theme.palette.grey[100]}` }}>
              <Link href={"/settings"} locale={`${pathname?.split("/")?.[0]}`}>
                <MenuItem>
                  <Typography variant="subtitle2">
                    {t?.home?.about_alpha}
                  </Typography>
                </MenuItem>
              </Link>
            </Box>
            <Box sx={{ borderTop: `2px solid ${theme.palette.grey[100]}` }}>
              <Link href={"/settings"} locale={`${pathname?.split("/")?.[0]}`}>
                <MenuItem>
                  <Typography variant="subtitle2">{t?.home?.logout}</Typography>
                </MenuItem>
              </Link>
            </Box>
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: "-12px",
              height: "30px",
              width: "30px",
              backgroundColor: "#FFF",
              zIndex: 1000,
              transform: "rotate(45deg)",
              borderRadius: "8px",
              ...(t?.home?.dir === "rtl" ? { left: "20px" } : { right: "20px" }),
            }}
          ></Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default CompanyMenuComponent;
