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
const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export {stringLength, getRandomIntInclusive, isEscapeKey};
