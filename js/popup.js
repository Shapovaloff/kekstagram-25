import {createCommentTemplate} from './comments.js';
import {isEscapeKey} from './utils.js';

const COMMENTS_AMOUNT = 5;
const commentsLoaderButtonElement = document.body.querySelector('.comments-loader');
const commentsCurrentCountElement = document.querySelector('.social__comment-count').childNodes[0];

const renderComments = (commentsList, parent) => {
  const socialComments = parent.querySelector('.social__comments');
  socialComments.innerHTML = '';
  let startIndex = 0;
  let endIndex = startIndex + COMMENTS_AMOUNT;

  return () => {
    for (startIndex; startIndex < endIndex; startIndex++) {
      const commentItems = createCommentTemplate(commentsList[startIndex]);
      socialComments.insertAdjacentHTML('beforeend', commentItems);
    }

    endIndex = startIndex + COMMENTS_AMOUNT;
    if (endIndex > commentsList.length) {
      endIndex = commentsList.length;
    }

    if (startIndex >= endIndex) {
      commentsLoaderButtonElement.classList.add('hidden');
    }

    commentsCurrentCountElement.nodeValue = `${startIndex} из `;
  };
};

const changePopup = (images) => {
  const picturesElements = document.querySelector('.pictures');
  const popupElement = document.querySelector('.big-picture');
  const popupCloseButton = popupElement.querySelector('.big-picture__cancel');

  const onPicturesClick = (evt) => {
    const picture = evt.target.closest('.picture');
    if (!picture) {
      return;
    }

    const onPopupEscPress = (evtKey) => {
      if (isEscapeKey(evtKey)) {
        closePopup(); // eslint-disable-line
      }
    };

    evt.preventDefault();
    const id = +picture.id;
    const imageItem = images.find((item) => item.id === id);

    if (!imageItem) {
      return;
    }
    const {description, comments, likes, url} = imageItem;
    popupElement.querySelector('.big-picture__img img').src = url;
    popupElement.querySelector('.social__caption').textContent = description;
    popupElement.querySelector('.likes-count').textContent = likes;
    popupElement.querySelector('.comments-count').textContent = comments.length;
    const showMoreHandler = renderComments(comments, popupElement);
    showMoreHandler(comments, popupElement);

    const closePopup = () => {
      popupElement.classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscPress);
      commentsLoaderButtonElement.removeEventListener('click', showMoreHandler);
      commentsLoaderButtonElement.classList.remove('hidden');
    };

    const openPopup = () => {
      popupElement.classList.remove('hidden');
      document.addEventListener('keydown', onPopupEscPress);
      commentsLoaderButtonElement.addEventListener('click', showMoreHandler);
    };

    openPopup();
    popupCloseButton.addEventListener('click', closePopup);
  };

  picturesElements.addEventListener('click', onPicturesClick);
};

export {changePopup};
