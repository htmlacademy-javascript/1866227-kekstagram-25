import {photos} from './gen-data.js';
const photosArray = photos();

const pictures = document.querySelector('.pictures');

const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');

const fragment = document.createDocumentFragment();

photosArray.forEach(({url, likes, comments}) => {
  const pictureTemplate = picturesTemplate.cloneNode(true);
  const pictureImg = pictureTemplate.querySelector('.picture__img');
  const pictureLikes = pictureTemplate.querySelector('.picture__likes');
  const pictureComments = pictureTemplate.querySelector('.picture__comments');

  pictureImg.src = url;
  pictureLikes.textContent = likes;
  pictureComments.textContent = comments.length;

  fragment.append(pictureTemplate);
});

const addPictures = () => pictures.appendChild(fragment);

export {addPictures};
