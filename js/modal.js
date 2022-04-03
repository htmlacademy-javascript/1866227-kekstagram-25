import {isEscapeKey} from './utils.js';

let modalElement;
let modalCencelBtn;

const onModalEscKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

function closeModal() {
  document.body.classList.remove('modal-open');
  modalElement.classList.add('hidden');

  modalCencelBtn.removeEventListener('click', closeModal);
  document.removeEventListener('keydown', onModalEscKeydown);
}

function openModal(element, button){
  modalElement = element;
  modalCencelBtn = button;

  document.body.classList.add('modal-open');
  modalElement.classList.remove('hidden');

  modalCencelBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', onModalEscKeydown);
}

export {openModal};

