import {getArrUsersPhotos} from './data.js';


const photoContainer = document.querySelector('.pictures');
const userPictureTemplate = document.querySelector('#picture').content;
const usersPhotos = getArrUsersPhotos();

const userPhotoFragment = document.createDocumentFragment();


usersPhotos.forEach(({likes, url, comment}) => {
  const photoElement = userPictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__comments').textContent = comment.length;
  photoContainer.append(photoElement);
});

photoContainer.append(userPhotoFragment);

