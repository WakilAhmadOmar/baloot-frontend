import { getDictionary } from "@/dictionaries";
import ExpensesContainer from "./_Components/Container";

export default async function ReceiveEmployeePage({params}:{ params: Promise<{ lang: 'en' | 'fa' }>}) {
  const lang = (await params).lang
  const tra = await getDictionary(lang)
  return (
    <div >
       <ExpensesContainer t={tra} />

    </div>
  );
}
