import {checkIsEscapeKey, checkIsMouseClick, checkIsFormSubmit, toggleClass} from './utils.js';
import  './picture-scale.js';
import {createSlider, removeSlider} from './picture-effect.js';
import  './validate.js';
import  {pristine} from './validate.js';

const PICTURE_TYPES = ['jpeg', 'png', 'gif', 'jpg'];

//Определяем необходимые элементы
const pictureUploadForm = document.querySelector('.img-upload__form');
const pictureUploadButton = pictureUploadForm.querySelector('.img-upload__start input[type=file]');
const pictureUploadModal = pictureUploadForm.querySelector('.img-upload__overlay');
const pictureUploadCloseButton = pictureUploadForm.querySelector('#upload-cancel');
const pictureUploadPreview = pictureUploadForm.querySelector('.img-upload__preview img');
const scaleControlValue = document.querySelector('.scale__control--value');

const uploadPhoto = (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name;
  if (PICTURE_TYPES.includes(fileName)) {
    pictureUploadPreview.src = URL.createObjectURL(file);
  }
};

const tooglePictureUploadModal = (isHidden) => {
  toggleClass(pictureUploadModal, 'hidden', !isHidden);
  toggleClass(document.body, 'modal-open', isHidden);
};

const closePictureUploadModal = (evt) => {
  if (checkIsEscapeKey(evt) || checkIsMouseClick(evt) || checkIsFormSubmit(evt)) {
    document.removeEventListener('keydown', closePictureUploadModal);
    pictureUploadCloseButton.removeEventListener('click', closePictureUploadModal);

    tooglePictureUploadModal(false);
    pictureUploadForm.reset();
    pictureUploadButton.value = '';
    pictureUploadPreview.style = '';
    pictureUploadPreview.classList = '';
    pristine.reset();
    removeSlider();
  }
};

const openPictureUploadModal = (evt) => {
  document.addEventListener('keydown', closePictureUploadModal);
  pictureUploadCloseButton.addEventListener('click', closePictureUploadModal);

  uploadPhoto(evt);
  tooglePictureUploadModal(true);
  scaleControlValue.value = '100%';
  pictureUploadPreview.style.transform = 'scale(1)';
  createSlider();
};

pictureUploadButton.addEventListener('change', openPictureUploadModal);

export {closePictureUploadModal};

