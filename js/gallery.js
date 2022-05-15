import {createSmallImages} from './paint.js';
import {changePopup} from './popup.js';

import {setUploadFormSubmit} from './upload-form.js';

fetch('https://25.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Не удалось загрузить данные');
    }
  })
  .then((images) => {
    createSmallImages(images);
    changePopup(images);
  });

setUploadFormSubmit();
