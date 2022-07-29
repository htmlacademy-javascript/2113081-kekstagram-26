import { usersPhotos, fillWithPhotos } from './upload-photo.js';
import { getRandomPositiveInteger, debounce } from './util.js';

const form = document.querySelector('.img-filters__form');


function getDefaultPhotos () {
  return usersPhotos;
}

function getRandomPhotos () {
  const randomIndexes = [];
  const randomPhotos = [];
  let indexPhoto = 0;

  for (indexPhoto; indexPhoto < 10; indexPhoto++) {
    let newIndex = getRandomPositiveInteger(0, usersPhotos.length - 1);

    while (randomIndexes.includes(newIndex)) {
      newIndex = getRandomPositiveInteger(0, usersPhotos.length - 1);
    }

    randomPhotos.push(usersPhotos[newIndex]);
    randomIndexes.push(newIndex);
  }

  return randomPhotos;
}

function getDiscussedPhotos () {
  return [...usersPhotos].sort((photo1, photo2) => photo2.comments.length - photo1.comments.length);
}

const sortFuncs ={
  'filter-default': getDefaultPhotos,
  'filter-random': getRandomPhotos,
  'filter-discussed': getDiscussedPhotos,
};

form.addEventListener('click', debounce((evt) => {
  const selectedButton = evt.target.closest('button');

  if (!selectedButton) {
    return;
  }

  const buttonId = selectedButton.getAttribute('id');

  form.querySelectorAll('button').forEach((element) => element.classList.remove('img-filters__button--active'));
  selectedButton.classList.add('img-filters__button--active');
  document.querySelectorAll('.picture').forEach((e) => e.remove());
  fillWithPhotos(sortFuncs[buttonId]());
}));
