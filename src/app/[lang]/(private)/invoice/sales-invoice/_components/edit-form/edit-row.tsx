import { IconButton, useTheme } from "@mui/material";
import { Edit } from "iconsax-react";
import { useCallback} from "react";

export function EditRow({
  productId,
  getProductId,
  warehouse,
}: {
  productId: string;
  getProductId: (id: string  , warehouse: string) => void;
  warehouse: string;
}) {
  const theme = useTheme();
  const handleOpenDialogBox = useCallback(() => {
    if (productId && warehouse ){
      getProductId(productId , warehouse);
    }
  }, [getProductId, productId, warehouse]);
  return (
    <>
      <IconButton onClick={handleOpenDialogBox} >
        <Edit color={theme.palette.primary.main} size={22} />
      </IconButton>
    </>
  );
}
