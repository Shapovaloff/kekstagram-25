import {isEscapeKey} from './utils.js';

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

uploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  // closeImageUploadModal(evt);
  // const successElement = document.querySelector('#success').content.querySelector('.success');
  // const errorElement = document.querySelector('#error').content.querySelector('.error');

  const isValid = pristine.validate();
  if (isValid) {
    // document.body.appendChild(successElement);
  } else {
    // document.body.appendChild(errorElement);
  }
});
