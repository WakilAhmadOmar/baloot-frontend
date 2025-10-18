import { getDictionary } from "@/dictionaries";
import PartnerFinancialReport from "./_Components/container";

export default async function ProfitLossPage({params}:{ params: Promise<{ lang: 'en' | 'fa' }>}) {
  const lang = (await params).lang
  const tra = await getDictionary(lang)
  return (
    <div >
       <PartnerFinancialReport  />

    </div>
  );
}
