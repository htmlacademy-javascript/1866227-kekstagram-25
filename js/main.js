import {addPictures} from './pictures.js';
import './picture-upload.js';
import './validate.js';
import {createGetLoader} from  './data-loader.js';
import {showAlert} from './utils.js';

const URL_GET = 'https://25.javascript.pages.academy/kekstagram/data';

createGetLoader(URL_GET, addPictures, showAlert);

