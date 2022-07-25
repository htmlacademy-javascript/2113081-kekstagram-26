import { getPhotos } from './server.js';

const photoContainer = document.querySelector('.pictures');
const userPictureTemplate = document.querySelector('#picture').content;
const filtersBlock = document.querySelector('.img-filters');

let usersPhotos;

function fillWithPhotos (data) {
  const userPhotoFragment = document.createDocumentFragment();

  data.forEach(({likes, url, comments}) => {
    const photoElement = userPictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photoContainer.append(photoElement);
  });

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

export { usersPhotos, fillWithPhotos };
