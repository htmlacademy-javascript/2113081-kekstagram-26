// взято с сайта: https://learn.javascript.ru/task/random-int-min-max
function getRandomNumber (minNumber, maxNumber) {
  if (minNumber >= 0 && maxNumber >= 0) {
    const rand = minNumber + Math.random() * (maxNumber + 1 - minNumber);
    return Math.floor(rand);
  }
  return false;
}
getRandomNumber (1, 100);

let stringComment;
let maxLengthComment;
function compareString () {
  stringComment = stringComment.length;
  if (stringComment <= maxLengthComment) {
    return true;
  }
  return false;
}
compareString(stringComment, maxLengthComment);

// !модуль4-задание1!

// берем вспомогательные функции у Кекса

function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function checkStringLength (string, length) {
  return string.length <= length;
}
checkStringLength();

//Выполняю задание

const COMMENT_IDS = [];

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

function getRandomArrElement(elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

function createComment() {
  return {
    id: getUniqueIDComment(1, 1000),
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
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

const usersPhotos = Array.from({ length: 25 }).map(giveIndexPhoto);
