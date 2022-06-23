// взято с сайта: https://learn.javascript.ru/task/random-int-min-max
function getRandomNumber (minNumber, maxNumber) {
  if (minNumber >= 0 && maxNumber >= 0) {
    const rand = minNumber + Math.random() * (maxNumber + 1 - minNumber);
    return Math.floor(rand);
  }
  console.log('Неверный диапазон');
}
getRandomNumber (1, 100);

function compareString (stringComment, maxLengthComment) {
  stringComment = stringComment.length;
  if (stringComment <= maxLengthComment) {
    return true;
  }
  return false;
}
compareString(stringComment, maxLengthComment);
