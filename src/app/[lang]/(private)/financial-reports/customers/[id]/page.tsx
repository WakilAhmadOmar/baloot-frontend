
import CustomerDetailsFinancialReport from "./_Components/Container";

export default async function CustomerDetailsFinancialReportsPage({params}:{ 
  params: 
  Promise<{ 
    id:string ,
    name:string
  }>}) {
  const  id = (await params).id

  return (
    <div >
       <CustomerDetailsFinancialReport id={id} />

    </div>
  );
}
