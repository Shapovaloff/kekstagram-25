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

export {stringLength, getRandomIntInclusive};
