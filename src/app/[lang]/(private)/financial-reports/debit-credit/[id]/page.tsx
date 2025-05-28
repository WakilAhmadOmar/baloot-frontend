import { getDictionary } from "@/dictionaries";
import CustomerDetailsFinancialReport from "./_Components/Container";

export default async function CustomerDetailsFinancialReportsPage({params}:{ params: Promise<{ lang: 'en' | 'fa' }>}) {
  const lang = (await params).lang
  const tra = await getDictionary(lang)
  return (
    <div >
       <CustomerDetailsFinancialReport t={tra} />

    </div>
  );
}
