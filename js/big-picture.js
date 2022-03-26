const testArray = {
comments: [{id: 1, avatar: 'img/avatar-6.svg', message: 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', name: 'Катя'},
{id: 2, avatar: 'img/avatar-4.svg', message: 'Лица у людей на фотке перекошены, как будто их изб…. Как можно было поймать такой неудачный момент?!', name: 'Андрей'},
{id: 3, avatar: 'img/avatar-1.svg', message: 'Всё отлично!', name: 'Маша'},
{id: 4, avatar: 'img/avatar-1.svg', message: 'Лица у людей на фотке перекошены, как будто их изб…. Как можно было поймать такой неудачный момент?!', name: 'Катя'}],
description: "Одно из лучших фото",
id: 1,
likes: 98,
url: "photos/1.jpg"
}


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

const showBigPic = ({url, likes, id, description, comments}) => {
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

  //заполняем данным из объекта элементы DOM
  bigPicImg.src = url;
  bigPicLikesCount.textContent = likes;
  bigPicCommentsCount.textContent = comments.length;
  bigPicCaption.textContent = description;

  fillBigPicComments(comments);
};

showBigPic(testArray);


