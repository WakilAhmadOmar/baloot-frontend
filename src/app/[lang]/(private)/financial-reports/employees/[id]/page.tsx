import { getDictionary } from "@/dictionaries";
import CustomerDetailsFinancialReport from "./_Components/Container";

export default async function CustomerDetailsFinancialReportsPage({params}:{ params: Promise<{ lang: 'en' | 'fa' ,id:string}>}) {
  const lang = (await params).lang
  const id = (await params).id

  return (
    <div >
       <CustomerDetailsFinancialReport id={id} />

    </div>
  );
}
