import { isEscapeKey } from './util.js';

const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;
const uploadOverlay = document.querySelector('.img-upload__overlay');

function closeSuccessMessage () {
  const successElement = document.querySelector('.success');

  if (successElement) {
    document.querySelector('body').removeChild(successElement);
  }
}

function closeErrorMessage () {
  uploadOverlay.classList.remove('hidden');

  const errorModal = document.querySelector('.error');

  if (errorModal) {
    document.querySelector('body').removeChild(errorModal);
  }
}

function openSuccessMessage (onCloseCallback) {
  const successElement = successTemplate.cloneNode(true);
  const successContainer = successElement.querySelector('.success');
  const successButton = successElement.querySelector('.success__button');
  const successInnerBlock = successElement.querySelector('.success__inner');

  successElement.querySelector('.success__title').textContent = 'Изображение успешно загружено';
  successButton.textContent = 'Круто';
  successButton.addEventListener('click', () => {
    closeSuccessMessage();
    onCloseCallback();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeSuccessMessage();
      onCloseCallback();
    }
  });

  successContainer.addEventListener('click', () => {
    closeSuccessMessage();
    onCloseCallback();
  });

  successInnerBlock.addEventListener('click', (evt) => {
    evt.stopPropagation();
  });

  document.querySelector('body').append(successElement);
}

function openErrorMessage (onCloseCallback) {
  const errorElement = errorTemplate.cloneNode(true);
  const errorContainer = errorElement.querySelector('.error');
  const errorButton = errorElement.querySelector('.error__button');
  const errorInnerBlock = errorElement.querySelector('.error__inner');

  errorElement.querySelector('.error__title').textContent = 'Ошибка загрузки файла';
  errorButton.textContent = 'Загрузить другой файл';
  errorButton.addEventListener('click', closeErrorMessage);

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeErrorMessage();
      onCloseCallback();
    }
  });

  errorContainer.addEventListener('click', () => {
    closeErrorMessage();
    onCloseCallback();
  });

  errorInnerBlock.addEventListener('click', (evt) => {
    evt.stopPropagation();
  });

  document.querySelector('body').append(errorElement);
}

export { openSuccessMessage, openErrorMessage };
