import {addPictures} from './pictures.js';

const filterContainer = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const filterFormButtons = document.querySelectorAll('.img-filters__button');

const getRandomData = (data) => data.slice().sort(() => Math.random() - 0.5).slice(0,10);

const getSort = (data) => data.slice().sort((a, b) => b.likes - a.likes);

const setFilter = (data, evt) => {
  let newData = data;
  if (evt.target.id === 'filter-random') {
    newData = getRandomData(data);
  }
  if (evt.target.id === 'filter-discussed') {
    newData = getSort(data);
  }
  addPictures(newData);
};

const createFilter = (data, cb) => {
  filterContainer.classList.remove('img-filters--inactive');

  filterForm.addEventListener('click', (evt) => {
    filterFormButtons.forEach((element) => {
      if (element.id === evt.target.id) {
        element.classList.add('img-filters__button--active');
      } else {
        element.classList.remove('img-filters__button--active');
      }
    });
    cb(data, evt);
  });
};

export {createFilter, setFilter};
