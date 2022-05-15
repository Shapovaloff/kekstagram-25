const ALERT_SHOW_TIME = 5000;

const getRandomIntInclusive = (min, max) => {
  if (max <= min || min < 0) {
    return 'Unexpected data!';
  } else {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(min + Math.random() * (max - min + 1));
  }
};

const getRandomArray = (array) => {
  const results = [];
  const cloneArray = array.slice();
  const maxArrayNumber = array.length > 10 ? 10 : array.length;
  for (let i = 0; i < maxArrayNumber; i++) {
    const randomIndex = getRandomIntInclusive(0, cloneArray.length - 1);
    results.push(cloneArray.splice(randomIndex, 1)[0]);
  }

  return results;
};

const stringLength = (stringCheck, maxLength) => stringCheck.length <= maxLength;
const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.cssText = `
    z-index: 100;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    padding: 10px 3px;
    font-size: 30px;
    text-align: center;
    background-color: red;
  `;
  alertContainer.textContent = message;

  document.body.appendChild(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const throttle = (callback, delayBetweenFrames) => {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
};

export {stringLength, getRandomIntInclusive, getRandomArray, isEscapeKey, showAlert, debounce, throttle};
