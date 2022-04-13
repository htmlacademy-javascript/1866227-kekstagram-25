import {checkIsEscapeKey, checkIsMouseClick} from './utils.js';

const onSubmitCloseValid = (evt) => {
  if (checkIsEscapeKey(evt) || checkIsMouseClick(evt)) {
    evt.stopPropagation();
    document.body.lastElementChild.remove();
  }
};

const onSubmitOpenValid = (type) => {
  const template = document.querySelector(`#${type}`).content.cloneNode(true);
  const mainElement = template.querySelector(`.${type}`);
  const elementInnerElement = mainElement.querySelector(`.${type}__inner`);
  const elementCloseButtonElement = mainElement.querySelector(`.${type}__button`);

  document.body.append(mainElement);

  document.addEventListener('keydown',onSubmitCloseValid);
  elementCloseButtonElement.addEventListener('click', onSubmitCloseValid);
  elementInnerElement.addEventListener('click', (evt) => {
    evt.stopPropagation();
  });
  mainElement.addEventListener('click', onSubmitCloseValid);
};


export {onSubmitOpenValid};
