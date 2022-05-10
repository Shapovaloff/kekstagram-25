const createCommentTemplate = ({avatar, id, name, message}) => (
  `<li class="social__comment" id="${id}">
    <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
    <p class="social__text">${message}</p>
  </li>`
);

export {createCommentTemplate};
