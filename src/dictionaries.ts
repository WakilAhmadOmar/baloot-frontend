 'use server'
 
const dictionaries = {
  en: () => import('../messages/en.json').then((module) => module.default),
  fa: () => import('../messages/fa.json').then((module) => module.default),
}
export const getDictionary = async (locale: 'en' | 'fa') => {
  if (!dictionaries[locale]) throw new Error(`Locale ${locale} not found`);
  return dictionaries[locale](); // Ensure it's a function call
};