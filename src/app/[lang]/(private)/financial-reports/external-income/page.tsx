import { getDictionary } from "@/dictionaries";
import PartnerFinancialReport from "./_Components/Container";

export default async function PartnerFinancialReportsPage({params}:{ params: Promise<{ lang: 'en' | 'fa' }>}) {
  const lang = (await params).lang
  const tra = await getDictionary(lang)
  return (
    <div >
       <PartnerFinancialReport t={tra} />

    </div>
  );
}
