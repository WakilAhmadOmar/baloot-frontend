import { getDictionary } from "@/dictionaries";
import CustomerFinancialReport from "./_Components/Container";

export default async function CustomerFinancialReportsPage({params}:{ params: Promise<{ lang: 'en' | 'fa' }>}) {
  const lang = (await params).lang
  const tra = await getDictionary(lang)
  return (
    <div >
       <CustomerFinancialReport t={tra} />

    </div>
  );
}
