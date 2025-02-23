import { Box } from "@mui/material";
import { getDictionary } from "@/dictionaries";
import Container from "./_Components/Container";

export default async function WarehousePage({
  params,
}: {
  params: Promise<{ lang: "en" | "fa" }>;
}) {
  const lang = (await params).lang;
  const tra = await getDictionary(lang);
  return (
    <Box>
      <Container t={tra} />
    </Box>
  );
}
