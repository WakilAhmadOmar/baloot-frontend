import { getDictionary } from "@/dictionaries";
import Container from "./_Components/Container";



export default async function JournalPage({params}:{ params: Promise<{ lang: 'en' | 'fa' }>}) {
  const lang = (await params).lang
  const tra = await getDictionary(lang)
  return (
    <div >
      <main >
       <Container />
      </main>
    </div>
  );
}
