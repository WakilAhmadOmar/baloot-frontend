import { IconButton, useTheme } from "@mui/material";
import { AddCircle, } from "iconsax-react";

export function SaveRow({
  getProductId,
}: {

  getProductId: (id: string) => void;

}) {
  const theme = useTheme();
  
  const handleOpenDialogBox = () => {
    // Logic to open dialog box
    getProductId("");
  };
  return (
    <>
      <IconButton onClick={handleOpenDialogBox} loading={false} >
        <AddCircle color={theme.palette.primary.main} size={22} />
      </IconButton>
    </>
  );
}
