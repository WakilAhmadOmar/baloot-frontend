import { Box, Button, Typography } from "@mui/material";
import { EmptyProductPageIcon } from "@/icons";

interface IPropsEmptyPage {
  icon?: React.ReactNode;
  title: string;
  discription: string;
  onClick?: () => void;
  buttonText?: string;
}
const EmptyPage: React.FC<IPropsEmptyPage> = ({
  icon,
  title,
  discription,
  onClick,
  buttonText,
}) => {
  return (
    <Box display={"grid"} justifyContent={"center"}  mx="auto">
      {icon}
      <Typography textAlign={"center"} variant="h6" p={1}>
        {title}
      </Typography>
      <Typography maxWidth={"40rem"} variant="subtitle2" p={1}>
        {discription}
      </Typography>
     {buttonText && <Button variant="contained" color="primary" onClick={onClick}>
        {buttonText}
      </Button>}
    </Box>
  );
};
export default EmptyPage;
