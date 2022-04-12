const ALERT_SHOW_TIME = 5000;

const getRandomNumber = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const genArrayFromObjects = (maxCount, fn) => Array.from({length: getRandomNumber(1, maxCount)}, fn);

const isMouseClick = (evt) => evt.type === 'click';

const isFormSubmit = (evt) => evt.type === 'submit';

const isEscapeKey = (evt) => evt.key === ('Escape' || 'Esc');

const isEnterKey = (evt) => evt.key === 'Enter';

const toggleClass = (element, className, isHidden) => element.classList.toggle(className, isHidden);

const stopEscPropagation = ((evt) => {
  if(isEscapeKey(evt)){
    evt.stopPropogation();
  }
});

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {
  getRandomNumber,
  getRandomArrayElement,
  genArrayFromObjects,
  isEscapeKey,
  isEnterKey,
  isMouseClick,
  isFormSubmit,
  toggleClass,
  stopEscPropagation,
  showAlert
};
