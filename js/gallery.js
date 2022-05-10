import {createImages} from './data.js';
import {createSmallImages} from './paint.js';
import {changePopup} from './popup.js';

const images = createImages();
createSmallImages(images);
changePopup(images);
