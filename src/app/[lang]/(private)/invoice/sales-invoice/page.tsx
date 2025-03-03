import { Box } from "@mui/material";
import Container from "./_components/Container";
import { getDictionary } from "@/dictionaries";

export default async function SalesInvoicePage({
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
