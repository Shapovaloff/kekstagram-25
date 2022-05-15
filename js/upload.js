import {isEscapeKey} from './utils.js';
import './upload-form.js';

const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const SCALE_STEP = 25;

const imageUploadModalElement = document.querySelector('.img-upload__overlay');
const imageUploadElement = document.querySelector('#upload-file');
const imageUploadModalCloseElement = imageUploadModalElement.querySelector('.img-upload__cancel');
const imageUploadPreviewElement = imageUploadModalElement.querySelector('.img-upload__preview img');
const uploadFormElement = document.querySelector('.img-upload__form');
const buttonScaleList = document.querySelectorAll('button.scale__control');
const scaleValueElement = document.querySelector('.scale__control--value');
const sliderElement = document.querySelector('.effect-level__slider');

const documentKeydownHandler = (evt) => {
  if (isEscapeKey(evt)) {
    closeImageUploadModalHandler(); // eslint-disable-line
  }
};

const uploadPreviewChangeScale = (value) => {
  imageUploadPreviewElement.style = `transform: scale(${value / 100})`;
  scaleValueElement.value = `${value}%`;
};

const getCurrentScaleValue = () => Number(scaleValueElement.value.replace('%',''));

const openImageUploadModalHandler = () => {
  imageUploadModalElement.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', documentKeydownHandler);
  sliderElement.classList.add('hidden');
  const scaleCurrentValue = MAX_SCALE_VALUE;
  uploadPreviewChangeScale(scaleCurrentValue);
};

const closeImageUploadModalHandler = () => {
  imageUploadModalElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', documentKeydownHandler);
  uploadFormElement.reset(); //обнуляет поля формы
  imageUploadPreviewElement.className = null;
  imageUploadPreviewElement.style = null;
};

const zoomIntOutImageHandler = (evt) => {
  evt.preventDefault();
  const button = evt.target;
  let scaleCurrentValue = getCurrentScaleValue();
  const scale = button.classList.contains('scale__control--smaller') ? 'smaller' : 'bigger';

  switch (scale) {
    case 'smaller':
      scaleCurrentValue -=SCALE_STEP;
      break;
    case 'bigger':
      scaleCurrentValue +=SCALE_STEP;
      break;
  }

  scaleCurrentValue = scaleCurrentValue > MAX_SCALE_VALUE ? MAX_SCALE_VALUE : scaleCurrentValue;
  scaleCurrentValue = scaleCurrentValue < MIN_SCALE_VALUE ? MIN_SCALE_VALUE : scaleCurrentValue;
  uploadPreviewChangeScale(scaleCurrentValue);
};

buttonScaleList.forEach((button) => button.addEventListener('click', zoomIntOutImageHandler));
imageUploadElement.addEventListener('change', openImageUploadModalHandler);
imageUploadModalCloseElement.addEventListener('click', closeImageUploadModalHandler);

export {closeImageUploadModalHandler};
