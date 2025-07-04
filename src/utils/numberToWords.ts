import { useTranslations } from "next-intl";


export function numberToWords(number: number , ) {
  const t = useTranslations("numberToWord")
  function numberToWords(number: number): string {
    const ones = [
      t("zero"),
      t("one"),
      t("two"),
      t("three"),
      t("four"),
      t("five"),
      t("six"),
      t("seven"),
      t("eight"),
      t("nine"),
    ];
    const teens = [
      t("ten"),
      t("eleven"),
      t("twelve"),
      t("thirteen"),
      t("fourteen"),
      t("fifteen"),
      t("sixteen"),
      t("seventeen"),
      t("eighteen"),
      t("nineteen"),
    ];
    const tens = [
      "",
      "",
      t("twenty"),
      t("thirty"),
      t("forty"),
      t("fifty"),
      t("sixty"),
      t("seventy"),
      t("eighty"),
      t("ninety"),
    ];

    if (number < 10) {
      return ones[number];
    } else if (number < 20) {
      return teens[number - 10];
    } else if (number < 100) {
      return (
        tens[Math.floor(number / 10)] +
        (number % 10 !== 0 ? " " + ones[number % 10] : "")
      );
    } else if (number < 1000) {
      return (
        ones[Math.floor(number / 100)] +
        t("hundred") +
        (number % 100 !== 0 ? " " + numberToWords(number % 100) : "")
      );
    } else if (number < 1000000) {
      return (
        numberToWords(Math.floor(number / 1000)) +
        t("thousand") +
        (number % 1000 !== 0 ? " " + numberToWords(number % 1000) : "")
      );
    } else if (number < 1000000000) {
      return (
        numberToWords(Math.floor(number / 1000000)) +
        t("million") +
        (number % 1000000 !== 0 ? " " + numberToWords(number % 1000000) : "")
      );
    } else if (number < 1000000000000) {
      return (
        numberToWords(Math.floor(number / 1000000000)) +
        t("billion") +
        (number % 1000000000 !== 0
          ? " " + numberToWords(number % 1000000000)
          : "")
      );
    } else {
      return t("number_is_too_large_to_convert_to_words");
    }
  }

  // Example usage:
  return numberToWords(number);
}
