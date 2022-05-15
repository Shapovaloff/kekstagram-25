import {activeFilters, attachFiltersEvents} from './filters.js';
import {createSmallImages} from './paint.js';
import {changePopup} from './popup.js';

import {setUploadFormSubmit} from './upload-form.js';
import {showAlert} from './utils.js';

fetch('https://25.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      showAlert('Не удалось загрузить данные');
    }
  })
  .then((images) => {
    activeFilters();
    createSmallImages(images);
    attachFiltersEvents(images);
    changePopup(images);
  });

setUploadFormSubmit();
