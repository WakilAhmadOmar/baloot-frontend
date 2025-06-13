import {
  Box,
  ListItemText,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import AfghanistanFlag from "../../../../../assets/images/Afghanistan-flag.jpg";
import UsaFlag from "../../../../../assets/images/usa-flag.jpg";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { useRouter } from "next/navigation";

interface IPropsLanguage {
  lang: string;
}

const Language: React.FC<IPropsLanguage> = ({ lang }) => {
  const t = useTranslations("home");
  const theme = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [language, setLanguage] = useState<string | null>(lang);

  const handleChange = (event: any) => {
    const local = event.target.value;
    setLanguage(local);

    const segments = pathname.split("/").filter(Boolean);
    const pathWithoutLocale = segments.slice(1).join("/");
    const newPath = `/${local}${
      pathWithoutLocale ? `/${pathWithoutLocale}` : ""
    }`;
    router.push(newPath);
  };

  return (
    <Select
      labelId="demo-multiple-checkbox-label"
      id="demo-multiple-checkbox"
      value={language}
      onChange={handleChange}
      size="small"
      sx={{
        width: "135px",
        fieldset: {
          border: `1px solid ${theme.palette.grey?.[50]}`,
        },
      }}
      renderValue={(selected: any) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1.5,
          }}
        >
          <Image
            src={language === "fa" ? AfghanistanFlag : UsaFlag}
            width={23}
            height={23}
            style={{ borderRadius: "50%" }}
            alt={"fa"}
          />
          <Typography>{language === "fa" ? t("fa") : t("en")}</Typography>
        </Box>
      )}
    >
      <MenuItem
        value={"fa"}
        dir={t("dir")}
        sx={{ display: "flex", columnGap: 1, justifyContent: "flex-start" }}
      >
        {/* <Link href={pathname} locale="fa"> */}
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <Image
            src={AfghanistanFlag}
            width={25}
            height={25}
            style={{ borderRadius: "50%" }}
            alt={"fa"}
          />
          <ListItemText primary={t("fa")} sx={{ textAlign: "start" }} />
        </Box>
        {/* </Link> */}
      </MenuItem>
      <MenuItem
        value={"en"}
        dir={t("dir")}
        sx={{ display: "flex", columnGap: 1, justifyContent: "flex-start" }}
      >
        {/* <Link href={pathname} locale="en"> */}
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <Image
            src={UsaFlag}
            width={25}
            height={25}
            style={{ borderRadius: "50%" }}
            alt={""}
          />
          <ListItemText primary={t("en")} sx={{ textAlign: "start" }} />
        </Box>
        {/* </Link> */}
      </MenuItem>
    </Select>
  );
};

export default Language;
