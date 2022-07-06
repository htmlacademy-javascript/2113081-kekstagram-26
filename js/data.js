import {getRandomPositiveInteger, getRandomArrElement} from './util.js';

const COMMENT_IDS = [];

const MIN_ID_COMMENT_VALUE = 1;
const MAX_ID_COMMENT_VALUE = 1000;

const MIN_AVATAR_SRC_VALUE = 1;
const MAX_AVATAR_SRC_VALUE = 6;

const DESCRIPTIONS_PHOTOS = [
  'Просто фото',
  'Ставьте лайки!',
  'Привет всем',
  'Сейчас я дома уже',
  'Как думаете, где это?',
  'Я',
  'Бывает и такое'
];

const NAMES_USERS = [
  'Повелитель 3000',
  'Саша',
  'Никита',
  'Сергей',
  'Странный пользователь',
  'Кукарача',
  'Тривиан',
  'Лонас',
  'Георгий',
  'Мария',
  'Пользователь123',
  'Тигр',
  'Настасия',
  'Доктор',
  'Пользователь1234 кто занял 123?',
  'Японец',
];

const DEFAULT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо.',
  'Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];

function getUniqueIDComment () {
  let ID = Math.floor(Math.random() * 1000);
  while (COMMENT_IDS.includes(ID)) {
    ID = Math.floor(Math.random() * 1000);
  }
  COMMENT_IDS.push(ID);
  return ID;
}

function createComment() {
  return {
    id: getUniqueIDComment(MIN_ID_COMMENT_VALUE, MAX_ID_COMMENT_VALUE),
    avatar: `img/avatar-${getRandomPositiveInteger(MIN_AVATAR_SRC_VALUE, MAX_AVATAR_SRC_VALUE)}.svg`,
    message: `${getRandomArrElement(DEFAULT_MESSAGES)} ${getRandomArrElement(DEFAULT_MESSAGES)}`,
    nameUser: getRandomArrElement(NAMES_USERS)
  };
}

function getRandomQuantityComment () {
  return Array.from({length:getRandomPositiveInteger(1, 5)}, createComment);
}

function createUsersPhoto(id) {
  return {
    id,
    url: `/photos/${id}.jpg`,
    description: getRandomArrElement(DESCRIPTIONS_PHOTOS),
    likes: getRandomPositiveInteger(15, 200),
    comment: getRandomQuantityComment()
  };
}

function giveIndexPhoto(_, id) {
  return createUsersPhoto(id + 1);
}

function getArrUsersPhotos () {
  const usersPhotos = Array.from({ length: 25 }).map(giveIndexPhoto);
  return usersPhotos;
}

export {getArrUsersPhotos};
