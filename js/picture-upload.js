import {checkIsEscapeKey, checkIsMouseClick, checkIsFormSubmit, toggleClass} from './utils.js';
import  './picture-scale.js';
import {createSlider, removeSlider} from './picture-effect.js';
import  './validate.js';
import  {pristine} from './validate.js';

const PICTURE_TYPES = ['jpeg', 'png', 'gif', 'jpg'];

//Определяем необходимые элементы
const pictureUploadFormElement = document.querySelector('.img-upload__form');
const pictureUploadButtonElement = pictureUploadFormElement.querySelector('.img-upload__start input[type=file]');
const pictureUploadModalElement = pictureUploadFormElement.querySelector('.img-upload__overlay');
const pictureUploadCloseButtonElement = pictureUploadFormElement.querySelector('#upload-cancel');
const pictureUploadPreviewElement = pictureUploadFormElement.querySelector('.img-upload__preview img');
const scaleControlValueElement = document.querySelector('.scale__control--value');

const uploadPhoto = (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name;
  if (PICTURE_TYPES.includes(fileName)) {
    pictureUploadPreviewElement.src = URL.createObjectURL(file);
  }
};

const tooglePictureUploadModal = (isHidden) => {
  toggleClass(pictureUploadModalElement, 'hidden', !isHidden);
  toggleClass(document.body, 'modal-open', isHidden);
};

const closePictureUploadModal = (evt) => {
  if (checkIsEscapeKey(evt) || checkIsMouseClick(evt) || checkIsFormSubmit(evt)) {
    document.removeEventListener('keydown', closePictureUploadModal);
    pictureUploadCloseButtonElement.removeEventListener('click', closePictureUploadModal);

    tooglePictureUploadModal(false);
    pictureUploadFormElement.reset();
    pictureUploadButtonElement.value = '';
    pictureUploadPreviewElement.style = '';
    pictureUploadPreviewElement.classList = '';
    pristine.reset();
    removeSlider();
  }
};

const openPictureUploadModal = (evt) => {
  document.addEventListener('keydown', closePictureUploadModal);
  pictureUploadCloseButtonElement.addEventListener('click', closePictureUploadModal);

  uploadPhoto(evt);
  tooglePictureUploadModal(true);
  scaleControlValueElement.value = '100%';
  pictureUploadPreviewElement.style.transform = 'scale(1)';
  createSlider();
};

pictureUploadButtonElement.addEventListener('change', openPictureUploadModal);

export {closePictureUploadModal};

