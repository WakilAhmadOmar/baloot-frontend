import { Box } from "@mui/material";
import EmployeeContainer from "./_Components/Container";
import { getDictionary } from "@/dictionaries";

export default async function BankPage({
  params,
}: {
  params: Promise<{ lang: "en" | "fa" }>;
}) {
  const lang = (await params).lang;
  const tra = await getDictionary(lang);
  return (
    <Box>
      <EmployeeContainer t={tra} />
    </Box>
  );
}
