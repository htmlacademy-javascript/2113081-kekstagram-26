import { getPhotos } from './server.js';

const photoContainer = document.querySelector('.pictures');
const userPictureTemplate = document.querySelector('#picture').content;
const filtersBlock = document.querySelector('.img-filters');

let usersPhotos;
const newPhotos = [];

function fillPhoto ({ likes, url, comments }, scale, filter) {
  const photoElement = userPictureTemplate.cloneNode(true);
  const photoImg = photoElement.querySelector('.picture__img');
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoImg.src = url;
  photoElement.querySelector('.picture__comments').textContent = comments.length;

  if (scale) {
    photoImg.style.transform = scale;
  }

  if (filter) {
    photoImg.style.filter = filter;
  }

  photoContainer.append(photoElement);
}

function fillWithPhotos (data) {
  const userPhotoFragment = document.createDocumentFragment();

  data.forEach((photo) => fillPhoto(photo));

  photoContainer.append(userPhotoFragment);
}

getPhotos().then((data) => {
  fillWithPhotos(data);
  filtersBlock.classList.remove('img-filters--inactive');
  usersPhotos = data;
}).catch(() => {
  document.querySelector('.fetch-error').classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
});

export { usersPhotos, newPhotos, fillWithPhotos, fillPhoto };
