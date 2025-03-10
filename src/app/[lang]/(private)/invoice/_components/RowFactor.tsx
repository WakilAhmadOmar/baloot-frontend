"use client";
import { Box, IconButton, Typography, useTheme, } from "@mui/material";
import { Edit, Eye, Trash } from "iconsax-react";

const RowFactor = () => {
  const theme = useTheme();
  return (

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bgcolor={theme.palette.background.default}
        pt={1.7}
        pb={1.7}
        pl={2.5}
        pr={2.5}
        borderRadius={"8px"}
        marginTop={"3px"}
      >
        <Typography variant="h5">محمود کریمی</Typography>

        <Box display={"flex"} columnGap={"5rem"} alignItems={"center"}>
          <Box display="flex" columnGap={"5px"} alignItems={"center"}>
            <Typography variant="body2" component={"span"}>
              شماره فاکتور{" - "}
            </Typography>
            <Typography variant="h5" component={"span"}>
              256585
            </Typography>
          </Box>
          <Typography variant="body2">
            تاریخ صدور فاکتور - 1402/2/23{" "}
          </Typography>
          <Box>
            <IconButton>
              <Trash color={theme.palette.primary.main}  size={22}/>
            </IconButton>
            <IconButton>
              <Edit color={theme.palette.primary.main}  size={22}/>
            </IconButton>
            <IconButton>
              <Eye color={theme.palette.primary.main} size={22}/>{" "}
            </IconButton>
          </Box>
        </Box>
      </Box>
  );
};

export default RowFactor;
