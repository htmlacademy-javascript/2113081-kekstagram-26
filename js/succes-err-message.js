const successTemplate = document.querySelector('#success').content;
const succesButton = document.querySelector('.success__button');


function openSuccessMessage () {
  const succesElement = successTemplate.cloneNode(true);

  succesElement.querySelector('.success__title').textContent = 'Изображение успешно загружено';
  succesElement.querySelector('.success__button').textContent = 'Круто';
  document.querySelector('body').append(succesElement);
}

//succesButton.addEventListener('click' )

export { openSuccessMessage };
