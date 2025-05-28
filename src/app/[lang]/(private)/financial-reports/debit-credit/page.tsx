import { getDictionary } from "@/dictionaries";
import DebitCreditFinancialReport from "./_Components/Container";

export default async function DebitCreditFinancialReportsPage({params}:{ params: Promise<{ lang: 'en' | 'fa' }>}) {
  const lang = (await params).lang
  const tra = await getDictionary(lang)
  return (
    <div >
       <DebitCreditFinancialReport t={tra} />

    </div>
  );
}
