import { Box } from "@mui/material";
import { getDictionary } from "@/dictionaries";
import Consumption from "./_Components/Container";

export default async function ConsumptionPage({
  params,
}: {
  params: Promise<{ lang: "en" | "fa" }>;
}) {
  const lang = (await params).lang;
  const tra = await getDictionary(lang);
  return (
    <Box>
      <Consumption t={tra} />
    </Box>
  );
}
