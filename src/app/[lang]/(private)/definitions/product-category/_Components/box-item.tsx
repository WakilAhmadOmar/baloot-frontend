import { Box, Card, Typography, useTheme } from "@mui/material";

import Moment from "react-moment";
import { UpdateCategory } from "./Updage";
// import { DeleteCategory } from "./Delete";
interface IPropsUnitProduct {
  item: any;
  t: any;
}
const BoxItemCategory: React.FC<IPropsUnitProduct> = ({ item, t }) => {
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
        backgroundColor: theme.palette.grey[50],
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
        {/* <DeleteCategory t={t} id={item?._id} /> */}

        <UpdateCategory t={t} item={item} />
      </Box>
    </Card>
  );
};

export default BoxItemCategory;
