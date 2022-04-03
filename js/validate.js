import {stopEscPropagation} from './utils.js';

//Объявлем переменные
const HASHTAGS_MAX_COUNT = 5;
const HASHTAGS_MIN_SYMBOLS = 2;
const HASHTAGS_MAX_SYMBOLS = 20;
const HASHTAGS_REGEX = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;
const DESCRIPTION_MAX_LENGTH = 140;

//Выбираем форму, а в ней поле ввода хештегов и описания
const pictureUploadForm = document.querySelector('.img-upload__form');
const pictureUploadHashtags = pictureUploadForm.querySelector('.text__hashtags');
const pictureUploadDescr = pictureUploadForm.querySelector('.text__description');


//Разбиваем массив на отдельные элементы
const splitHashtags = ((HashtagsString) =>
  HashtagsString.trim().toLowerCase().split(' ').filter((element) => element !== '')
);

///Проверка, не состоит ли хэштег только из символа решетки (#).
const validTagOnlyHash = ((value) =>
  !(splitHashtags(value).some((element) => (element.charAt(0) == '#' && element.length === 1)))
);

//Проверка, начинается ли хэштег с символа решетки (#).
const validTagFromHash = ((value) =>
  splitHashtags(value).every((element) => element.startsWith('#'))
);

// Проверка на превышение количества хэштегов.
const validTagsOverflow = ((value) =>
  splitHashtags(value).length <= HASHTAGS_MAX_COUNT
);

// Проверка на наличие повторяющихся хэштегов.
const validTagsDublicate = ((value) =>
  !(splitHashtags(value).some((element, index, arr) => arr.lastIndexOf(element) !== index))
);

// Проверка на минимальную и максимальную длину хэштега.
const validTagsLengthMinMax = ((value) =>
  splitHashtags(value).every((element) => element.length >= HASHTAGS_MIN_SYMBOLS && element.length <= HASHTAGS_MAX_SYMBOLS)
);

// Проверка хэштегов на соответствие регулярному выражению.
const validTagsRegExp = ((value) =>
  splitHashtags(value).every((element) => element.match(HASHTAGS_REGEX))
);
// Проверка описания на длину текста.
const validDescrLength = ((value) =>
  value.length <= DESCRIPTION_MAX_LENGTH
);

//Создаем объект Pristine при помощи библиотеки и описываем как должен добавляться класс с ошибками.
const pristine = new Pristine(pictureUploadForm, {
  classTo: 'text__label',
  errorClass: 'text__label--invalid',
  successClass: 'text__label--valid',
  errorTextParent: 'text__label',
  errorTextTag: 'div',
  errorTextClass: 'text__error'
});

//Вешаем слушателей методом addValidator на поле Хеш и Описание.
pristine.addValidator(pictureUploadHashtags, validTagOnlyHash, 'ХешТег не должен состоять только из #.');
pristine.addValidator(pictureUploadHashtags, validTagFromHash, 'ХешТег должен состоять из # и хотя бы одного символа.');
pristine.addValidator(pictureUploadHashtags, validTagsOverflow, `Максимальное кол-во хештегов ${HASHTAGS_MAX_COUNT} штук.`);
pristine.addValidator(pictureUploadHashtags, validTagsDublicate, 'Все хештеги должны быть уникальными.');
pristine.addValidator(pictureUploadHashtags, validTagsLengthMinMax, `Длина хештега должна быть больше ${HASHTAGS_MIN_SYMBOLS} и меньше ${HASHTAGS_MAX_SYMBOLS} символов.`);
pristine.addValidator(pictureUploadHashtags, validTagsRegExp, 'Хештег должен состоять только из букв и цифр');
pristine.addValidator(pictureUploadDescr, validDescrLength, `Длина описания не должна превышать ${DESCRIPTION_MAX_LENGTH} символов`);

//Проверяем что все поля валидны пере отправкой формы.
pictureUploadForm.addEventListener('submit', (evt) => {
  if(!pristine.validate()) evt.preventDefault();
});

pictureUploadHashtags.addEventListener('keydown', stopEscPropagation);
pictureUploadDescr.addEventListener('keydown', stopEscPropagation);

//Экспортируем объект для обнуления при открытии окна формы.
export {pristine};
