

export function numberToWords(number: number , t:any) {
  
  function numberToWords(number: number): string {
    const ones = [
      t.numberToWord.zero,
      t.numberToWord.one,
      t.numberToWord.two,
      t.numberToWord.three,
      t.numberToWord.four,
      t.numberToWord.five,
      t.numberToWord.six,
      t.numberToWord.seven,
      t.numberToWord.eight,
      t.numberToWord.nine,
    ];
    const teens = [
      t.numberToWord.ten,
      t.numberToWord.eleven,
      t.numberToWord.twelve,
      t.numberToWord.thirteen,
      t.numberToWord.fourteen,
      t.numberToWord.fifteen,
      t.numberToWord.sixteen,
      t.numberToWord.seventeen,
      t.numberToWord.eighteen,
      t.numberToWord.nineteen,
    ];
    const tens = [
      "",
      "",
      t.numberToWord.twenty,
      t.numberToWord.thirty,
      t.numberToWord.forty,
      t.numberToWord.fifty,
      t.numberToWord.sixty,
      t.numberToWord.seventy,
      t.numberToWord.eighty,
      t.numberToWord.ninety,
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
        t.numberToWord.hundred +
        (number % 100 !== 0 ? " " + numberToWords(number % 100) : "")
      );
    } else if (number < 1000000) {
      return (
        numberToWords(Math.floor(number / 1000)) +
        t.numberToWord.thousand +
        (number % 1000 !== 0 ? " " + numberToWords(number % 1000) : "")
      );
    } else if (number < 1000000000) {
      return (
        numberToWords(Math.floor(number / 1000000)) +
        t.numberToWord.million +
        (number % 1000000 !== 0 ? " " + numberToWords(number % 1000000) : "")
      );
    } else if (number < 1000000000000) {
      return (
        numberToWords(Math.floor(number / 1000000000)) +
        t.numberToWord.billion +
        (number % 1000000000 !== 0
          ? " " + numberToWords(number % 1000000000)
          : "")
      );
    } else {
      return t.numberToWord.number_is_too_large_to_convert_to_words;
    }
  }

  // Example usage:
  return numberToWords(number);
}
