import { usersPhotos } from './upload-photo.js';
import { isEscapeKey } from './util.js';

const AMOUNT_COMMENTS = 5;

const bigPictureContainer = document.querySelector('.big-picture');
const allPhotos = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture__img').querySelector('img');
const closeButton = document.querySelector('.big-picture__cancel');
const commentLoader = bigPictureContainer.querySelector('.comments-loader');
const commentCountVisible = bigPictureContainer.querySelector('.comments-count-visible');
const commentsBlock = bigPictureContainer.querySelector('.social__comments');

let visibleCommentsArray = [];
let openNextCommentsFunc = undefined;

function createComment ({ avatar, message, nameUser }) {
  const comment = document.createElement('li');
  const avatarImg = document.createElement('img');
  const commentText = document.createElement('p');

  avatarImg.classList.add('social__picture');
  commentText.classList.add('social__text');
  comment.classList.add('social__comment');
  avatarImg.src = avatar;
  avatarImg.alt = nameUser;
  commentText.textContent = message;

  comment.appendChild(avatarImg);
  comment.appendChild(commentText);

  return comment;
}

function openChosenPhoto (evt) {
  const selectedPicture = evt.target.closest('.picture');
  if (!selectedPicture) {
    return;
  }

  const imageSrc = selectedPicture.querySelector('.picture__img').getAttribute('src');
  const pictureInfo = usersPhotos.find((photo) => photo.url === imageSrc);
  const commentCount = bigPictureContainer.querySelector('.comments-count');

  bigPictureContainer.classList.remove('hidden');
  bigPicture.src = pictureInfo.url;
  bigPictureContainer.querySelector('.likes-count').textContent = pictureInfo.likes;
  commentCount.textContent = pictureInfo.comments.length;

  if (pictureInfo.scale) {
    bigPicture.style.transform = pictureInfo.scale;
  }

  if (pictureInfo.filter) {
    bigPicture.style.filter = pictureInfo.filter;
  }

  commentsBlock.innerHTML = '';
  openNextCommentsFunc = openNextComments(pictureInfo.comments);
  openNextCommentsFunc();
  commentLoader.addEventListener('click', openNextCommentsFunc);

  bigPictureContainer.querySelector('.social__caption').textContent = pictureInfo.description;
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
}

function openNextComments (comments) {
  return function() {
    const startIndex = visibleCommentsArray.length;
    const endIndex = startIndex + AMOUNT_COMMENTS;
    const nextComments = comments.slice(startIndex, endIndex);

    visibleCommentsArray = visibleCommentsArray.concat(nextComments);
    commentCountVisible.textContent = visibleCommentsArray.length;
    nextComments.forEach((comment) => commentsBlock.appendChild(createComment(comment)));

    if (comments.length === visibleCommentsArray.length) {
      commentLoader.classList.add('hidden');
    } else {
      commentLoader.classList.remove('hidden');
    }
  };
}

function onClose () {
  bigPictureContainer.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('click', onClose);
  commentLoader.removeEventListener('click', openNextCommentsFunc);
  visibleCommentsArray = [];
  bigPicture.style.transform = '';
  bigPicture.style.filter = '';
}

function onPopupEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onClose();
  }
}

allPhotos.addEventListener('click', openChosenPhoto);
closeButton.addEventListener('click', onClose);
