import {isEscapeKey, isMouseClick} from './utils.js';

const onSubmitCloseValid = (evt) => {
  if (isEscapeKey(evt) || isMouseClick(evt)) {
    evt.stopPropagation();
    document.body.lastElementChild.remove();
  }
};

const onSubmitOpenValid = (type) => {
  const template = document.querySelector(`#${type}`).content.cloneNode(true);
  const element = template.querySelector(`.${type}`);
  const elementInner = element.querySelector(`.${type}__inner`);
  const elementCloseButton = element.querySelector(`.${type}__button`);

  document.body.append(element);

  document.addEventListener('keydown',onSubmitCloseValid);
  elementCloseButton.addEventListener('click', onSubmitCloseValid);
  elementInner.addEventListener('click', (evt) => {
    evt.stopPropagation();
  });
  element.addEventListener('click', onSubmitCloseValid);
};


export {onSubmitOpenValid};
