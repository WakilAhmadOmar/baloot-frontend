import { getDictionary } from "@/dictionaries";



export default async function Home({params}:{ params: Promise<{ lang: 'en' | 'fa' }>}) {
  const lang = (await params).lang
  const tra = await getDictionary(lang)
  return (
    <div >
      <main >
       {tra.home.company_profile} journal page
      </main>
      <footer >

      </footer>
    </div>
  );
}
