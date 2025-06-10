"use client"
import CreateProduct from "./Create";
import ProductList from "./List";
import { Box, Typography } from "@mui/material";

interface IProps {
    t:any
}

const ProductPage:React.FC<IProps> = ({t}) => {
 
 
  return (
    <Box>
      
   
        <Typography variant="h3" mb={2}>
          {t?.product?.product_list}
        </Typography>
    
      <Box
        mb={2}
        sx={{
          display: "flex",
          // ...(productsState?.count === 0 && loadingPage === false
          //   ? { justifyContent: "center" }
          //   : { justifyContent: "space-between" }),
        }}
      >
        <CreateProduct
          t={t}
        />
        {/* {productsState?.count > 0 && (
          <Box>
            <CustomSearch getTextSearchFunction={getTextSearchFunction} t={t}/>
          </Box>
        )} */}
      </Box>

      
          {/* <Box
            display={"grid"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"100%"}
            mt={7}
          >
            <NotFoundIcon />
            <Typography textAlign={"center"} variant="h6" mt={2}>
              {t?.product?.nothing_found}
            </Typography>
          </Box> */}
        <ProductList
          t={t}
        />
     
    </Box>
  );
};

export default ProductPage;

