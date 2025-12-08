"use client"
import { useTranslations } from "next-intl";
import CreateProduct from "./Create";
import ProductList from "./List";
import { Box, Typography } from "@mui/material";

const ProductPage = () => {
  const t = useTranslations("product")
 

  return (
    <Box>
      
   
        <Typography variant="h3" mb={2}>
          {t("product_list")}
        </Typography>
    
      <Box
        mb={2}
        sx={{
          display: "flex",
          gap: 2,
          // ...(productsState?.count === 0 && loadingPage === false
          //   ? { justifyContent: "center" }
          //   : { justifyContent: "space-between" }),
        }}
      >
        <CreateProduct
          
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
        <ProductList/>
     
    </Box>
  );
};

export default ProductPage;

