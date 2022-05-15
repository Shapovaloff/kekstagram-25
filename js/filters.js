import {createSmallImages} from './paint.js';
import {getRandomArray, debounce} from './utils.js';
import {changePopup} from './popup.js';

const imageFiltersElement  = document.querySelector('.img-filters');

const activeFilters = () => imageFiltersElement.classList.remove('img-filters--inactive');
const sortMostDiscussedImages = (images) => images.slice().sort((a, b) => b.comments.length - a.comments.length);
const removeImages = () => document.querySelectorAll('.picture').forEach((picture) => picture.remove());

const activeBtn = (btn) => {
  const btnList = document.querySelectorAll('.img-filters__button');
  btnList.forEach((btnItem) => btnItem.classList.remove('img-filters__button--active'));
  btn.classList.add('img-filters__button--active');
};

const attachFiltersEvents = (images) => {
  let type = '';

  const filtersClickHandler = (evt) => {
    const btn = evt.target.closest('.img-filters__button');
    if (!btn) return; // eslint-disable-line
    let newImages = [];
    const btnType = btn.id;
    if (type === btnType) return; // eslint-disable-line

    switch(btnType) {
      case 'filter-default':
        newImages = images;
        break;
      case 'filter-random':
        newImages = getRandomArray(images);
        break;
      case 'filter-discussed':
        newImages = sortMostDiscussedImages(images);
        break;
      default:
        newImages = images;
    }

    removeImages();
    createSmallImages(newImages);
    changePopup(newImages);
    activeBtn(btn);
    type = btnType;
  };

  imageFiltersElement.addEventListener('click', debounce(filtersClickHandler));
};

export {activeFilters, attachFiltersEvents};

