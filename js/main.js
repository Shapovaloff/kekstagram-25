const DESCRIPTIONS = [
  'Следуй за своим сердцем, но не забывай брать с собой мозг.',
  'Успех следует за упорным трудом.',
  'Вперед к новым вершинам.',
  'Только цель, никаких препятствий.',
  'Что делать, когда не знаешь, что делать? В любой непонятной ситуации немедленно начинай обнимать кота…',
  'Люблю хэштеги, они напоминают вафельки',
  'Ошибки являются доказательством того, что вы пытались.',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Аанг',
  'Зуко',
  'Катара',
  'Сокка',
  'Айро',
  'Азула',
  'Озай',
  'Азулон',
  'Мэй',
  'Джао',
];

const IMAGES_COUNT = 25;

const getRandomIntInclusive = (min, max) => {
  if (max <= min || min < 0) {
    return 'Unexpected data!';
  } else {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(min + Math.random() * (max - min + 1));
  }
};

const stringLength = (stringCheck, maxLength) => stringCheck.length <= maxLength;

stringLength('Привет', 5);

const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];

const createComments = (index) => {
  const lengthComments = getRandomIntInclusive(2, 4);

  return new Array(lengthComments).fill(null).map((_, i) => ({
    id: index * 100 + i,
    avatar: `img/avatar-${getRandomIntInclusive(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  }));
};

const createImage = (index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomIntInclusive(15, 200),
  comments: createComments(index),
});

const createImages = () => new Array(IMAGES_COUNT).fill(null).map((_, index) => createImage(index));

createImages();
