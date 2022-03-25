function onlyEven(array) {
  return array.filter(n => (n%2) == 0);
}

function onlyOneWord(array) {
  return array.filter(word => !word.includes(" "));
}

function positiveRowsOnly(array) {
  return array.filter(row => row.every(n => n>0));
}

function allSameVowels(array) {
  // your code here
}

module.exports = {
  onlyEven,
  onlyOneWord,
  positiveRowsOnly,
  allSameVowels
};
