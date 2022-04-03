import {isEscapeKey, isMouseClick, toggleClass} from './utils.js';

// Выбираем нужные элементы для заполнения данными
const bigPicSection = document.querySelector('.big-picture');
const bigPicCloseButton = bigPicSection.querySelector('.big-picture__cancel');
const bigPicImg = bigPicSection.querySelector('.big-picture__img img');
const bigPicLikesCount = bigPicSection.querySelector('.likes-count');
const bigPicCommentsCount = bigPicSection.querySelector('.comments-count');
const bigPicCaption = bigPicSection.querySelector('.social__caption');
//Выбираем блок с комментариями и очищаем содержимое
const bigPicComments = document.querySelector('.big-picture .social__comments');

let shownCommentsCount = 0;
let totalCommentList = [];
let totalCommentListLength = 0;

const fillBigPicComments = (comments) => {
  bigPicComments.innerHTML = '';

  //Генерим из массива комментариев HTML текс с данными из массива. Применяем метод reduce для конкатинации всех элементов.
  //, '' - задаем первый эелемент reduce, чтобы аккумулировать все эелементы массива с самого начала.
  const commentsList = comments.reduce((accumulator, currentComment) => {
    accumulator += `<li class="social__comment">
      <img class="social__picture" src="${currentComment.avatar}" alt="${currentComment.name}" width="35" height="35">
      <p class="social__text">${currentComment.message}</p>
    </li>`;
    return accumulator;
  }, '');

  //Добавляем полученный список элементов в список комментариев большой картинки.
  bigPicComments.insertAdjacentHTML('beforeend', commentsList);
};

const renderBigPic = ({url, likes, description, comments}) => {
  // Скрываем временно ненужные классы
  bigPicSection.querySelector('.social__comment-count').classList.add('hidden');
  bigPicSection.querySelector('.comments-loader').classList.add('hidden');

  //заполняем данным из объекта элементы DOM
  bigPicImg.src = url;
  bigPicLikesCount.textContent = likes;
  bigPicCommentsCount.textContent = comments.length;
  bigPicCaption.textContent = description;

  //Заполняем блок комментариев из массива
  fillBigPicComments(comments);
};

const tooglePictureModal = (isHidden) => {
  toggleClass(bigPicSection, 'hidden', !isHidden);
  toggleClass(document.body, 'modal-open', isHidden);
  bigPicComments.innerHTML = '';
};

const closeBigPicModal = (evt) => {
  evt.preventDefault();
  if (isEscapeKey(evt) || isMouseClick(evt)) {
    tooglePictureModal(false);
    document.removeEventListener('keydown', closeBigPicModal);
    bigPicCloseButton.removeEventListener('click', closeBigPicModal);
    //socialCommentsLoader.removeEventListener('click', loadMoreCommentHandler);
    //shownCommentsCount = 0;
    //socialCommentsLoader.classList.remove('hidden');
  }
};

const openBigPicModal = (element) => {
  //socialCommentsLoader.addEventListener('click', loadMoreCommentHandler);
  //totalCommentList = element.comments;
  //totalCommentListLength = totalCommentList.length;
  tooglePictureModal(true);
  renderBigPic(element);
  document.addEventListener('keydown', closeBigPicModal);
  bigPicCloseButton.addEventListener('click', closeBigPicModal);
};

export {openBigPicModal};


