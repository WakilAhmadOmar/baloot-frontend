import { Box } from "@mui/material";
import { getDictionary } from "@/dictionaries";
import CategoryProduct from "./_Components/Container";

export default async function CategoryProductPage({
  params,
}: {
  params: Promise<{ lang: "en" | "fa" }>;
}) {
  const lang = (await params).lang;
  const tra = await getDictionary(lang);
  return (
    <Box>
      <CategoryProduct t={tra} />
    </Box>
  );
}
