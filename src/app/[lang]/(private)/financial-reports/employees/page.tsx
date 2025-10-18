
import EmployeesFinancialReport from "./_Components/Container";

export default async function EmployeesFinancialReportsPage({params}:{ params: Promise<{ lang: 'en' | 'fa' }>}) {
  const lang = (await params).lang

  return (
    <div >
       <EmployeesFinancialReport lang={lang} />

    </div>
  );
}
