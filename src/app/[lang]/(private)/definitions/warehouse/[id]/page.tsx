import { getDictionary } from "@/dictionaries";
import { Box } from "@mui/material";
import ContainerAddProduct from "./_Components/Container";


export default async function  AddProductsPage  ({
    params,
  }: {
    params: Promise<{ lang: "en" | "fa" , id:string}>;
  })  {
     const lang = (await params).lang;
     const id = (await params).id
      const tra = await getDictionary(lang);
    return(
        <Box>
            <ContainerAddProduct t={tra} id={id}  />
        </Box>
    )

}