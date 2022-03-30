import {isEscapeKey} from './utils.js';
import {renderBigPic} from './big-picture.js';

const bigPicSection = document.querySelector('.big-picture');
const bigPicBtnCancel = bigPicSection.querySelector('.big-picture__cancel');

const onModalEscKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const openModal = (element) => {
  document.body.classList.add('modal-open');
  bigPicSection.classList.remove('hidden');

  renderBigPic(element);

  bigPicBtnCancel.addEventListener('click', closeModal);
  document.addEventListener('keydown', onModalEscKeydown);
};

const closeModal = () => {
  document.body.classList.remove('modal-open');
  bigPicSection.classList.add('hidden');

  bigPicBtnCancel.removeEventListener('click', closeModal);
  document.removeEventListener('keydown', onModalEscKeydown);
};

export {openModal};

