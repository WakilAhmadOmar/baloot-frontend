import { Box, Typography, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";

export function ProductItem({product}:{product:any}) {
  const theme = useTheme();
  const t = useTranslations("products_reports");
  return (
    <Box
      bgcolor={theme.palette.background.default}
      px={2}
      py={2}
      borderRadius={"8px"}
    >
      <Typography fontWeight={700} fontSize={"1.5rem"}>
        {product?.name}
      </Typography>
      <Box
        display={"flex"}
        justifyContent={"start"}
        columnGap={"1rem"}
        rowGap={"1rem"}
        flexWrap={"wrap"}
        mt={1}
      >
       {
        product?.productReportInfo?.map((price:any) => (
          <Box
          bgcolor={theme.palette.grey[50]}
          p={1}
          borderRadius={"8px"}
          maxWidth={"300px"}
          minWidth={"300px"}
          key={price._id}
        >
          <Typography  fontWeight={600} fontSize={"1.3rem"} >
              {t("sales_with")} {price?.totalPrice} {price?.currency?.symbol} 
          </Typography>
          <Typography  fontWeight={400} fontSize={"1.2rem"}>
            {t("total_sales_count")}: {price?.totalAmount}
          </Typography>
        </Box>
        ))
       }
      </Box>
    </Box>
  );
}
