function sum(array) {
  return array.reduce((a, b) => a + b);
}

function productAll(array) {
  return array.reduce(
    function(previousValue, currentValue) {
      return previousValue.concat(currentValue)
    },
    []
  ).reduce((a, b) => a * b);
}

function objectify(array) {
  return array.reduce(function(a, c) {
    a[c[0]] = c[1]
    return a
  }, {});
}

function luckyNumbers(array) {
  return array.reduce(function(previousValue, currentValue, index, arr) {
    if(index == arr.length - 1) return previousValue + ', and ' + currentValue;
    return index == 0 ? 'Your lucky numbers are: ' + currentValue : previousValue + ', ' + currentValue;
  }, '')
}

module.exports = {
  sum,
  productAll,
  objectify,
  luckyNumbers
};
