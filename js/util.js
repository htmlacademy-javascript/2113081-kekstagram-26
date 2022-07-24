function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function checkStringLength (string, length) {
  return string.length <= length;
}

function getRandomArrElement(elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

function isEscapeKey (evt) {
  return evt.key === 'Escape';
}

export {getRandomPositiveInteger, checkStringLength, getRandomArrElement, isEscapeKey};
