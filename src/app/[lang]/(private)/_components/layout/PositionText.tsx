"use client";
import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { usePathname , useSearchParams } from "next/navigation";

const PositionText = () => {
  const t = useTranslations("position_link");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const name = searchParams?.get("name");
  
  return (
    <Box>
      {pathname?.split("/")?.map((item: string, index: number) => {
        if (index === 0) {
          return (
            <Typography component={"span"} key={item}>
              {t("home")} /{" "}
            </Typography>
          );
        }
        if (
          pathname?.split("/")?.length === 5 &&
          pathname?.split("/")?.[3] === "warehouse" &&
          index === 4
        ) {
          return (
            <Typography component="p" variant="h5" key={item}>
              {t("initial_inventory_registration")}
            </Typography>
          );
        }
        if (
          pathname?.split("/")?.length === 5 &&
          (pathname?.split("/")?.[3] === "customers" || pathname?.split("/")?.[3] === "employees") &&
          index === 4
        ) {
          return (
            <Typography component="p" variant="h5" key={item}>
              {t("financial_statement")} ({name})
            </Typography>
          );
        }
        if (pathname?.split("/")?.length - 1 === index) {
          return (
            <Typography component="p" variant="h5" key={item}>
              {t(item)}
            </Typography>
          );
        }

        return (
          <Typography component="span" key={item}>
            {t(item)} {pathname?.split("/")?.length - 2 !== index && " /"}
          </Typography>
        );
      })}
    </Box>
  );
};
export default PositionText;
