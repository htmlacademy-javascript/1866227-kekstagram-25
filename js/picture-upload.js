//import noUiSlider from '../libs/nouislider.min.mjs';
import {isEscapeKey, isMouseClick, toggleClass} from './utils.js';
import  './picture-scale.js';
import  './validate.js';
import  {pristine} from './validate.js';

//Определяем необходимые элементы
const pictureUploadForm = document.querySelector('.img-upload__form');
const pictureUploadButton = pictureUploadForm.querySelector('.img-upload__start input[type=file]');
const pictureUploadModal = pictureUploadForm.querySelector('.img-upload__overlay');
const pictureUploadCloseButton = pictureUploadForm.querySelector('#upload-cancel');
const pictureUploadPreview = pictureUploadForm.querySelector('.img-upload__preview img');
const scaleControlValue = document.querySelector('.scale__control--value');
const effects = pictureUploadForm.querySelectorAll('.effects__radio');
const effectLevelSlider = document.querySelector('.effect-level__slider');

//Реализуем изменение класса на Preview для изменения эффекта.
effects.forEach((element) => {
  element.addEventListener('click', () => {
    pictureUploadPreview.className = '';
    pictureUploadPreview.classList.add(`effects__preview--${element.value}`);
  });
});

const tooglePictureUploadModal = (isHidden) => {
  toggleClass(pictureUploadModal, 'hidden', !isHidden);
  toggleClass(document.body, 'modal-open', isHidden);
};

const closePictureUploadModal = (evt) => {
  if (isEscapeKey(evt) || isMouseClick(evt)) {
    tooglePictureUploadModal(false);
    document.removeEventListener('keydown', closePictureUploadModal);
    pictureUploadCloseButton.removeEventListener('click', closePictureUploadModal);
    pictureUploadForm.reset();
    pictureUploadButton.value = '';
    pictureUploadPreview.style = '';
    pictureUploadPreview.classList = '';
    pristine.reset();
  }
};

const openPictureUploadModal = (evt) => {
  pictureUploadPreview.src = URL.createObjectURL(evt.target.files[0]);
  tooglePictureUploadModal(true);
  document.addEventListener('keydown', closePictureUploadModal);
  pictureUploadCloseButton.addEventListener('click', closePictureUploadModal);
  scaleControlValue.value = '100%';
  pictureUploadPreview.style.transform = 'scale(1)';
  effectLevelSlider.classList.add('hidden');
};

pictureUploadButton.addEventListener('change', openPictureUploadModal);
