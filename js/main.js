import {addPictures} from './pictures.js';
import './picture-upload.js';
import './validate.js';
import {createGetLoader} from  './data-loader.js';
import {showAlert, debounce} from './utils.js';
import {createFilter, setFilter} from './filter.js';

const RERENDER_DELAY = 500;

const URL_GET = 'https://25.javascript.pages.academy/kekstagram/data';

createGetLoader(URL_GET,
  (data) => {
    addPictures(data);
    createFilter(
      data,
      debounce(
        (d, e) => {
          setFilter(d, e);
        },
        RERENDER_DELAY
      )
    );
  },
  showAlert
);
