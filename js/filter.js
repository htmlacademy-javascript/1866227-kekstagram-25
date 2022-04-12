import {getRandomArrayElement} from './utils.js';
import {addPictures} from './pictures.js';

const filterContainer = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const filterFormButtons = document.querySelectorAll('.img-filters__button');

const getRandomData = (data) => {
  const newData = [];
  while (newData.length < 10) {
    const newElement = getRandomArrayElement(data);
    if (!(newData.includes(newElement))) {
      newData.push(newElement);
    }
  }
  return newData;
};

const getSort = (data) => data.slice().sort((a, b) => b.likes - a.likes);

const createFilter = (data) => {
  filterContainer.classList.remove('img-filters--inactive');
  filterForm.addEventListener('click', (evt) => {
    filterFormButtons.forEach((element) => {
      const targetId = evt.target.id;
      if (element.id === targetId) {
        element.classList.add('img-filters__button--active');
      } else {
        element.classList.remove('img-filters__button--active');
      }
      if (targetId === 'filter-default') {
        addPictures(data);
      }
      if (targetId === 'filter-random') {
        addPictures(getRandomData(data));
      }
      if (targetId === 'filter-discussed') {
        addPictures(getSort(data));
      }
    });
  });
};

export {createFilter};
