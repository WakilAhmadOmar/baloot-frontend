import { Box, Checkbox, Divider, Typography, useTheme } from "@mui/material";

interface IPropsProductReport {
    showHeader:Boolean
}
const ProductReportRow:React.FC<IPropsProductReport> = ({showHeader}) => {
    const theme = useTheme()
  return (
    <Box >
        {showHeader && <Box bgcolor={theme.palette.background.default} borderRadius={"0.8rem"} height={"4.5rem"} display={"grid"} alignItems={"center"} gridTemplateColumns={"30% 15% 15% 40%"}>
            <Box display={"flex"} gap={"5px"} alignItems={"center"} sx={{paddingInlineStart:"2.5rem" , height:"100%"}}>
                <Checkbox size="medium"/>
                <Divider orientation="vertical" sx={{height :"50%" , display:"grid" , marginInlineEnd:"5px"}}/>
                <Typography variant="subtitle2">نام محصول</Typography>
            </Box>
            <Typography variant="subtitle2">واحدات</Typography>
            <Typography variant="subtitle2">تعداد هر واحد</Typography>
            <Typography variant="subtitle2">قیمت هر واحد</Typography>
        </Box>}
      <Box bgcolor={theme.palette.background.paper} display={"grid"} gridTemplateColumns={"30% 15% 15% 40%"}mt={0.5} p={3} borderRadius={"0.8rem"} alignItems={"center"}>
        <Box>
            <Box display={"flex"} alignItems={"center"}pb={0.7}>
            <Checkbox size="medium" />
            <Typography sx={{fontSize:"1.4rem" , fontWeight:700}}>بیسکویت کریمدار</Typography>
            </Box>
            <Box display={"flex"} bgcolor={theme.palette.grey[100]} pl={4} pr={4} width={"fit-content"} pt={0.3} pb={0.3} borderRadius={"8px"}>
                <Typography variant="overline">تاریخ انقضاء:</Typography>
                <Typography variant="overline">1402/2/23 </Typography>
            </Box>
           <Typography sx={{fontSize:"1.2rem" , fontWeight:400 , paddingInlineStart:"3rem"}} pt={1} >موجود در: گدام شماره 5</Typography>
        </Box>
        <Box display={"grid"} alignItems={"center"}>
            <Typography bgcolor={theme.palette.grey[100]} width={"fit-content"} sx={{fontSize:"1.2rem" , fontWeight:400}}p={1} borderRadius={"1rem"} mt={1}>کارتن</Typography>
            <Typography bgcolor={theme.palette.grey[100]} width={"fit-content"} sx={{fontSize:"1.2rem" , fontWeight:400}}p={1} borderRadius={"1rem"} mt={1}>بسته</Typography>
            <Typography bgcolor={theme.palette.grey[100]} width={"fit-content"} sx={{fontSize:"1.2rem" , fontWeight:400}}p={1} borderRadius={"1rem"} mt={1}>دانه</Typography>
            <Typography bgcolor={theme.palette.grey[100]} width={"fit-content"} sx={{fontSize:"1.2rem" , fontWeight:400}}p={1} borderRadius={"1rem"} mt={1}>کیلو</Typography>
            <Typography bgcolor={theme.palette.grey[100]} width={"fit-content"} sx={{fontSize:"1.2rem" , fontWeight:400}}p={1} borderRadius={"1rem"} mt={1}>سیر</Typography>
        </Box>
        <Box display={"grid"} alignItems={"center"} >
        <Typography variant="overline" mt={1}>23 </Typography>
        <Typography variant="overline"mt={1}>23 </Typography>
        <Typography variant="overline" mt={1}>23 </Typography>
        <Typography variant="overline" mt={1}>23 </Typography>
        <Typography variant="overline"mt={1}>23 </Typography>
        </Box>
        <Box display={"grid"} alignItems={"center"} >
        <Typography variant="overline" mt={1}>2600 افغانی </Typography>
        <Typography variant="overline"mt={1}>2600 افغانی </Typography>
        <Typography variant="overline" mt={1}>2600 افغانی </Typography>
        <Typography variant="overline" mt={1}>2600 افغانی </Typography>
        <Typography variant="overline"mt={1}>2600 افغانی </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductReportRow;
