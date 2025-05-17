import { getDictionary } from "@/dictionaries";
import ReceiveCashContainer from "./_Components/Container";

export default async function ReceiveEmployeePage({params}:{ params: Promise<{ lang: 'en' | 'fa' }>}) {
  const lang = (await params).lang
  const tra = await getDictionary(lang)
  return (
    <div >
       <ReceiveCashContainer t={tra} />

    </div>
  );
}
