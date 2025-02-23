import { Box } from "@mui/material";
import { getDictionary } from "@/dictionaries";
import CashBoxContainer from "./_Components/Container";

export default async function CashboxPage({
  params,
}: {
  params: Promise<{ lang: "en" | "fa" }>;
}) {
  const lang = (await params).lang;
  const tra = await getDictionary(lang);
  return (
    <Box>
      <CashBoxContainer t={tra} />
    </Box>
  );
}
