import {isEscapeKey, isMouseClick, isFormSubmit, toggleClass} from './utils.js';
import  './picture-scale.js';
import {createSlider, removeSlider} from './picture-effect.js';
import  './validate.js';
import  {pristine} from './validate.js';

//Определяем необходимые элементы
const pictureUploadForm = document.querySelector('.img-upload__form');
const pictureUploadButton = pictureUploadForm.querySelector('.img-upload__start input[type=file]');
const pictureUploadModal = pictureUploadForm.querySelector('.img-upload__overlay');
const pictureUploadCloseButton = pictureUploadForm.querySelector('#upload-cancel');
const pictureUploadPreview = pictureUploadForm.querySelector('.img-upload__preview img');
const scaleControlValue = document.querySelector('.scale__control--value');

const tooglePictureUploadModal = (isHidden) => {
  toggleClass(pictureUploadModal, 'hidden', !isHidden);
  toggleClass(document.body, 'modal-open', isHidden);
};

const closePictureUploadModal = (evt) => {
  if (isEscapeKey(evt) || isMouseClick(evt) || isFormSubmit(evt)) {
    tooglePictureUploadModal(false);
    document.removeEventListener('keydown', closePictureUploadModal);
    pictureUploadCloseButton.removeEventListener('click', closePictureUploadModal);
    pictureUploadForm.reset();
    pictureUploadButton.value = '';
    pictureUploadPreview.style = '';
    pictureUploadPreview.classList = '';
    pristine.reset();
    removeSlider();
  }
};

const openPictureUploadModal = (evt) => {
  pictureUploadPreview.src = URL.createObjectURL(evt.target.files[0]);
  tooglePictureUploadModal(true);
  document.addEventListener('keydown', closePictureUploadModal);
  pictureUploadCloseButton.addEventListener('click', closePictureUploadModal);
  scaleControlValue.value = '100%';
  pictureUploadPreview.style.transform = 'scale(1)';
  createSlider();
};

pictureUploadButton.addEventListener('change', openPictureUploadModal);

export {closePictureUploadModal};

