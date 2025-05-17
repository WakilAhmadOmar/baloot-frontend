import { getDictionary } from "@/dictionaries";
import PaymentCashContainer from "./_Components/Container";

export default async function ReceiveCustomerPage({params}:{ params: Promise<{ lang: 'en' | 'fa' }>}) {
  const lang = (await params).lang
  const tra = await getDictionary(lang)
  return (
    <div >
       <PaymentCashContainer t={tra} />

    </div>
  );
}
