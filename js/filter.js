import {addPictures} from './pictures.js';
import {debounce} from './utils.js';

const RERENDER_DELAY = 500;

const filterElement = document.querySelector('.img-filters');
const filterFormElement = document.querySelector('.img-filters__form');
const filterFormButtonsElement = document.querySelectorAll('.img-filters__button');

const shufflePhotos = (datas) => datas.slice().sort(() => Math.random() - 0.5).slice(0,10);

const sortPhotosByComments = (datas) => datas.slice().sort((a, b) => b.comments.length - a.comments.length);

const setFilter = (datas, evt) => {
  let newDatas = datas;
  if (evt.target.id === 'filter-random') {
    newDatas = shufflePhotos(datas);
  }
  if (evt.target.id === 'filter-discussed') {
    newDatas = sortPhotosByComments(datas);
  }
  addPictures(newDatas);
};

const getDebounceCb = debounce(
  (d, e) => {
    setFilter(d, e);
  },
  RERENDER_DELAY
);

const createFilter = (datas) => {
  filterElement.classList.remove('img-filters--inactive');

  filterFormElement.addEventListener('click', (evt) => {
    filterFormButtonsElement.forEach((element) => {
      if (element.id === evt.target.id) {
        element.classList.add('img-filters__button--active');
      } else {
        element.classList.remove('img-filters__button--active');
      }
    });
    getDebounceCb(datas, evt);
  });
};

export {createFilter};
