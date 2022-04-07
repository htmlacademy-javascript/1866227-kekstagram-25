const getRandomNumber = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const genArrayFromObjects = (maxCount, fn) => Array.from({length: getRandomNumber(1, maxCount)}, fn);

const isMouseClick = (evt) => evt.type === 'click';

const isEscapeKey = (evt) => evt.key === ('Escape' || 'Esc');

const isEnterKey = (evt) => evt.key === 'Enter';

const toggleClass = (element, className, isHidden) => element.classList.toggle(className, isHidden);

const stopEscPropagation = ((evt) => {
  if(isEscapeKey(evt)){
    evt.stopPropogation();
  }
});

export {
  getRandomNumber,
  getRandomArrayElement,
  genArrayFromObjects,
  isEscapeKey,
  isEnterKey,
  isMouseClick,
  toggleClass,
  stopEscPropagation
};
