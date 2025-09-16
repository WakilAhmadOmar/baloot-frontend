import { IconButton, useTheme } from "@mui/material";
import { Edit } from "iconsax-react";
import { useCallback} from "react";

export function EditRow({
  productId,
  getProductId,
  warehouse,
  isLoading
}: {
  productId: string;
  getProductId: (id: string  , warehouse: string) => void;
  warehouse: string;
  isLoading: boolean;
}) {
  const theme = useTheme();
  const handleOpenDialogBox = useCallback(() => {
    // Logic to open dialog box
    if (productId && warehouse ){
      getProductId(productId , warehouse);
    }
  }, [getProductId, productId, warehouse]);
  return (
    <>
      <IconButton onClick={handleOpenDialogBox} loading={isLoading}>
        <Edit color={theme.palette.primary.main} size={22} />
      </IconButton>
    </>
  );
}
