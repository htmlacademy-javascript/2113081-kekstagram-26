import { usersPhotos } from './upload-photo.js';
import { isEscapeKey } from './util.js';

const bigPictureContainer = document.querySelector('.big-picture');
const allPhotos = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture__img').querySelector('img');
const closeButton = document.querySelector('.big-picture__cancel');

function onPopupEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureContainer.classList.add('hidden');
  }
}
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

allPhotos.addEventListener('click', (evt) => {
  const selectedPicture = evt.target.closest('.picture');
  const imageSrc = selectedPicture.querySelector('.picture__img').getAttribute('src');
  const commentsBlock = bigPictureContainer.querySelector('.social__comments');
  const pictureInfo = usersPhotos.find((photo) => photo.url === imageSrc);

  bigPictureContainer.classList.remove('hidden');
  bigPicture.src = pictureInfo.url;
  bigPictureContainer.querySelector('.likes-count').textContent = pictureInfo.likes;
  bigPictureContainer.querySelector('.comments-count').textContent = pictureInfo.comment.length;

  commentsBlock.innerHTML = '';
  pictureInfo.comment.forEach((comment) => commentsBlock.appendChild(createComment(comment)));
  bigPictureContainer.querySelector('.social__caption').textContent = pictureInfo.description;
  bigPictureContainer.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureContainer.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');
});

closeButton.addEventListener('click', () => {
  bigPictureContainer.classList.add('hidden');
});


document.addEventListener('keydown', (evt) => {
  onPopupEscKeydown(evt);
});

