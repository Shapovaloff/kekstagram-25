import {isEscapeKey} from './utils.js';
import {closeImageUploadModalHandler} from './upload.js';

const HASHTAGS_MAX_AMOUNT = 5;
const HASHTAG_MAX_LENGTH = 20;
const COMMENT_MAX_LENGTH = 140;

const HASHTAG_REGEX = /^#[A-Za-zА-Яа-яЁё0-9]+$/;

const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagsElement = uploadFormElement.querySelector('.text__hashtags');
const commentElement = uploadFormElement.querySelector('.text__description');

const pristine = new Pristine(uploadFormElement, {
  classTo: 'text__wrapper',
  errorTextParent: 'text__wrapper',
  errorTextClass: 'text__error-text'
}, false);

const isEmptyString = (value) => !value.length;
const checkFirstSymbol = (value) => isEmptyString(value) || value.split(' ').every((hashtag) => hashtag[0] === '#');
const validateHashtagsSymbols = (value) => isEmptyString(value) || value.split(' ').every((hashtag) => HASHTAG_REGEX.test(hashtag));
const checkSharp = (value) => value.split(' ').every((hashtag) => hashtag !== '#');
const validateHashtagsLength = (value) => value.split(' ').every((hashtag) => hashtag.length <= HASHTAG_MAX_LENGTH);
const validateHashtagsAmount = (value) => value.split(' ').length <= HASHTAGS_MAX_AMOUNT;
const validateCommentsLength = (value) => value.length < COMMENT_MAX_LENGTH;

const validateHashtagsUniq = (value) => {
  const hashtagsArray = value.split(' ').map((element) => element.toLowerCase());
  return hashtagsArray.every((element, index) => hashtagsArray.indexOf(element) === index);
};

const inputKeydownHandler = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

pristine.addValidator(hashtagsElement, checkFirstSymbol, 'Хэш-тег должен начинаться с символа #', 10);
pristine.addValidator(hashtagsElement, validateHashtagsAmount, 'Нельзя указать больше пяти хэш-тегов', 6);
pristine.addValidator(hashtagsElement, validateHashtagsSymbols, 'Хэш-тег должен состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.', 8);
pristine.addValidator(hashtagsElement, checkSharp, 'Хеш-тег не может состоять только из одной решётки', 9);
pristine.addValidator(hashtagsElement, validateHashtagsUniq, 'Один и тот же хэш-тег не может быть использован дважды', 7);
pristine.addValidator(hashtagsElement, validateHashtagsLength, 'Максимальная длина одного хэш-тега 20 символов, включая решётку', 6);
pristine.addValidator(commentElement, validateCommentsLength, 'Длина комментария не может составлять больше 140 символов');
hashtagsElement.addEventListener('keydown', inputKeydownHandler);
commentElement.addEventListener('keydown', inputKeydownHandler);

let popupMessageClass = '';

const closePopupMessage = () => {
  const popupElement = document.querySelector(`.${popupMessageClass}`);
  document.removeEventListener('click', clickOutsideMessagePopupHandler); // eslint-disable-line
  document.removeEventListener('keydown', documentKeydownHandler); // eslint-disable-line
  popupElement.remove();
};

const clickOutsideMessagePopupHandler = (evt) => {
  if (evt.target.matches(`.${popupMessageClass}__button`) || !evt.target.closest(`.${popupMessageClass}__inner`)) {
    closePopupMessage();
  }
};

const documentKeydownHandler = (evt) => {
  if (isEscapeKey(evt)) {
    closePopupMessage();
  }
};

const showMessage = () => {
  const errorElementTemplate = document.querySelector(`#${popupMessageClass}`).content.querySelector(`.${popupMessageClass}`);
  const errorElement = errorElementTemplate.cloneNode(true);
  document.body.appendChild(errorElement);

  const errorButtonElement = document.querySelector(`.${popupMessageClass}__button`);
  document.addEventListener('click', clickOutsideMessagePopupHandler);
  document.addEventListener('keydown', documentKeydownHandler);

  errorButtonElement.addEventListener('click', () => {
    document.removeEventListener('click', closePopupMessage);
    closePopupMessage();
  });
};

const setUploadFormSubmit = () => {
  uploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      const formData = new FormData(evt.target);

      fetch('https://25.javascript.pages.academy/kekstagram', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            closeImageUploadModalHandler();
            popupMessageClass = 'success';
            showMessage();
          } else {
            closeImageUploadModalHandler();
            popupMessageClass = 'error';
            showMessage();
          }
        })
        .catch(() => {
          closeImageUploadModalHandler();
          popupMessageClass = 'error';
          showMessage();
        });
    }
  });
};

export {setUploadFormSubmit};
