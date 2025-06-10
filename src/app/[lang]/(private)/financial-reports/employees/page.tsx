import { getDictionary } from "@/dictionaries";
import EmployeesFinancialReport from "./_Components/Container";

export default async function EmployeesFinancialReportsPage({params}:{ params: Promise<{ lang: 'en' | 'fa' }>}) {
  const lang = (await params).lang
  const tra = await getDictionary(lang)
  return (
    <div >
       <EmployeesFinancialReport t={tra} />

    </div>
  );
}
