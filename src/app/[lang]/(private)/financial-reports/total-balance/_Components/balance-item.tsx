import { BalanceIcon } from "@/icons";
import { Box,CircularProgress,Typography } from "@mui/material";

interface IPropsBalance {
  color1: string;
  color2: string;
  text: string;
  amount: string;
  isLoading?: boolean;
}
export const Balance: React.FC<IPropsBalance> = ({ color1, color2, text, amount, isLoading }) => {
  return (
    <Box
      width={"28rem"}
      p={2.5}
      sx={{
        borderRadius: "1.6rem",
        background: `linear-gradient(180deg, ${color1} 0%, ${color2} 100%)`,
        // justifyItems: "center",
        // display: "grid",
      }}
    >
      <Box
        sx={{
          background: color2,
          backgroundBlendMode: "overlay",
          display: "grid",
          padding: " 1.3rem",
          borderRadius: "1.2rem",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 500,
            fontSize: "1.8rem",
            lineHeight: "21.6px",
            letter: "-1.9%",
          }}
          justifySelf={"center"}
        >
          {text}
        </Typography>
      </Box>
      {isLoading? <Box display={"grid"} justifyContent={"center"} my={3}><CircularProgress size={20}/> </Box>:<>
      <Typography variant="h3" textAlign={"center"} pt={3.5} pb={3.5}>
        ${amount}
      </Typography>
     
      </> }
       <Box justifyContent={"center"} display={"grid"}>
        <BalanceIcon color={color2} />
      </Box>      
    </Box>
  );
};