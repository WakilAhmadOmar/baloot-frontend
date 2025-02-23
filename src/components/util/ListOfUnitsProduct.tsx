
import { Box, Card, IconButton, Typography, useTheme } from "@mui/material";
import { Edit, Trash } from "iconsax-react";
import Moment from "react-moment";
interface IPropsUnitProduct {
  item: any;
  onEdit: (data: any) => void;
  onDelete: (id: string) => void;
  canDelete?: Boolean;
}
const ListOfUnitsProduct: React.FC<IPropsUnitProduct> = ({
  item,
  onEdit,
  onDelete,
  canDelete = true,
}) => {
  const theme = useTheme();

  return (
    <Card
      key={item?._id}
      sx={{
        width: "16rem",
        // minWidth: "15rem",
        p: 2,
        boxShadow: "none",
        borderRadius: "0.8rem",
        display: "grid",
        alignItems: "center",
        rowGap: 0,
        backgroundColor:theme.palette.grey[50]
      }}
    >
      <Typography textAlign={"center"} variant="body1">
        <Moment format="YYYY/MM/DD">{item?.createdAt}</Moment>
      </Typography>
      <Typography
        textAlign={"center"}
        variant="h5"
        pt={2}
        pb={2}
        lineHeight={1.5}
      >
        {item?.name}
      </Typography>
      <Box display="flex" justifyContent={"center"} columnGap={1}>
        {canDelete && (
          <IconButton onClick={() => onDelete(item?._id)}>
            <Trash color={theme.palette.grey["A700"]} size={25} />
          </IconButton>
        )}
        <IconButton onClick={() => onEdit(item)}>
          <Edit color={theme.palette.grey["A700"]} size={25} />
        </IconButton>
      </Box>
    </Card>
  );
};

export default ListOfUnitsProduct;
