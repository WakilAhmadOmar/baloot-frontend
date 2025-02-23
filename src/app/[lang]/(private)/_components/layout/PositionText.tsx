"use client"
import { Box, Typography, useTheme } from "@mui/material";
import { usePathname } from "next/navigation";

interface IPropsPositionText {
    t:any
}
const PositionText:React.FC<IPropsPositionText> = ({t}) => {
  const theme = useTheme();
  const pathname = usePathname();
  return (
    <Box >
      {pathname?.split("/")?.map((item: string, index: number) => {
        if (index === 0) {
          return (
            <Typography component={"span"} key={item}>
              {t?.home?.home} /{" "}
            </Typography>
          );
        }
        if (pathname?.split("/")?.length - 1 === index) {
          return (
            <Typography
              component="p"
              
              variant="h5"
              key={item}
            >
              {
                //@ts-ignore
                t?.position_link?.[item]
              }
            </Typography>
          );
        }
        return (
          <Typography component="span"  key={item}>
            {
              //@ts-ignore
              t?.position_link?.[item]
            }{" "}
            {pathname?.split("/")?.length - 2 !== index && " /"}
          </Typography>
        );
      })}
    </Box>
  );
};
export default PositionText;
