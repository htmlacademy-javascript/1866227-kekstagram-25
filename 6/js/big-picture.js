const fillBigPicComments = (comments) => {
  //Выбираем блок с комментариями и очищаем содержимое
  const bigPicComments = document.querySelector('.big-picture').querySelector('.social__comments');
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

const showBigPic = ({url, likes, description, comments}) => {
  //Открываем модальное окно
  document.body.classList.add('modal-open');
  const bigPicSection = document.querySelector('.big-picture');
  bigPicSection.classList.remove('hidden');

  // Скрываем временно ненудные классы
  const bigPicSocialComments = bigPicSection.querySelector('.social__comment-count').classList.add('hidden');
  const bigPicCommentsLeader = bigPicSection.querySelector('.comments-loader').classList.add('hidden');

  // Выбираем нужные элементы для заполнения данными
  const bigPicImg = bigPicSection.querySelector('.big-picture__img').querySelector('img');
  const bigPicLikesCount = bigPicSection.querySelector('.likes-count');
  const bigPicCommentsCount = bigPicSection.querySelector('.comments-count');
  const bigPicCaption = bigPicSection.querySelector('.social__caption');
  const bigPicBtnCancel = bigPicSection.querySelector('.big-picture__cancel');

  //заполняем данным из объекта элементы DOM
  bigPicImg.src = url;
  bigPicLikesCount.textContent = likes;
  bigPicCommentsCount.textContent = comments.length;
  bigPicCaption.textContent = description;

  //Заполняем блок комментариев из массива
  fillBigPicComments(comments);

  //Добавляем функционал закрытия кона по esc и кнопке выхода
  bigPicBtnCancel.addEventListener('click', () => {
    document.body.classList.remove('modal-open');
    bigPicSection.classList.add('hidden');
  });

  //Добавляем закрытие окна по esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !bigPicSection.classList.contains('hidden')) {
      document.body.classList.remove('modal-open');
      bigPicSection.classList.add('hidden');
    }
  });
};

export {showBigPic};


