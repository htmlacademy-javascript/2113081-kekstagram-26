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

function getArrRange (currentArray, range, part) {
  const start = range * (part - 1);
  const end = (range * part);
  return currentArray.slice(start, end);
}

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

function isCorrectFileExtension (file) {
  const fileName = file.name.toLowerCase();
  const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  return FILE_TYPES.some((it) => fileName.endsWith(it));
}

export { getRandomPositiveInteger, checkStringLength, getRandomArrElement, isEscapeKey, getArrRange, debounce, isCorrectFileExtension };
