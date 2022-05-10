import {createCommentTemplate} from './comments.js';
import {isEscapeKey} from './utils.js';

const renderComments = (commentsList, parent) => {
  const socialComments = parent.querySelector('.social__comments');
  socialComments.innerHTML = '';
  const commentItems =  commentsList.map(createCommentTemplate).join('');
  socialComments.insertAdjacentHTML('beforeend', commentItems);
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

    const closePopup = () => {
      popupElement.classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscPress);
    };

    const openPopup = () => {
      popupElement.classList.remove('hidden');
      document.addEventListener('keydown', onPopupEscPress);
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
    renderComments(comments, popupElement);

    openPopup();
    popupCloseButton.addEventListener('click', closePopup);
  };

  picturesElements.addEventListener('click', onPicturesClick);
};

export {changePopup};
