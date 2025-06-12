
import { Box } from "@mui/material";
import ContainerAddProduct from "./_Components/Container";


export default async function  AddProductsPage  ({
    params,
  }: {
    params: Promise<{ id:string}>;
  })  {
     const id = (await params).id
    return(
        <Box>
            <ContainerAddProduct id={id}  />
        </Box>
    )

}