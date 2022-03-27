import {photos} from './gen-data.js';
import {showBigPic} from './big-picture.js';
//Получаем массив данных
const photosArray = photos();
//Находим секцию с картинками
const pictures = document.querySelector('.pictures');
//Находим темплейт для добавления картинок
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
//Создаем фрагмен для единовременного добавления всех картинок из массива
const fragment = document.createDocumentFragment();
//Перебираем массив картинок, для каждого лемента создаем клон темплейта и заполняем его данными
photosArray.forEach((element) => {
  //Создаем клон темплейта и выбираем елементы, в которые будем записывать данные
  const pictureTemplate = picturesTemplate.cloneNode(true);
  const pictureImg = pictureTemplate.querySelector('.picture__img');
  const pictureLikes = pictureTemplate.querySelector('.picture__likes');
  const pictureComments = pictureTemplate.querySelector('.picture__comments');
  //Записываем данные в нужные элементы
  pictureImg.src = element.url;
  pictureLikes.textContent = element.likes;
  pictureComments.textContent = element.comments.length;

  pictureTemplate.addEventListener('click', (e) => {
    e.preventDefault;
    showBigPic(element);
  });

  fragment.append(pictureTemplate);
});

const addPictures = () => pictures.appendChild(fragment);

export {addPictures};
