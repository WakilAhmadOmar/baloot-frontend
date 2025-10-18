
import CustomerFinancialReport from "./_Components/Container";
export default async function CustomerFinancialReportsPage({params}:{ params: Promise<{ lang: 'en' | 'fa' }>}) {
  const lang = (await params).lang
  return (
    <div >
       <CustomerFinancialReport lang={lang}  />

    </div>
  );
}
