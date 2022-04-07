const slider = document.querySelector('.effect-level__slider');
const effects = document.querySelectorAll('.effects__radio');
const pictureUploadPreview = document.querySelector('.img-upload__preview img');
const pictureUploadValue = document.querySelector('.effect-level__value');

const EFFECT = {
  'effect-none': {
    name: 'none',
    filter: '',
    unit: '',
    nouisilder: {
      range: {
        min: 0,
        max: 100,
      },
      step: 1,
      start: 100,
      connect: 'lower'
    },
  },
  'effect-chrome': {
    name: 'chrome',
    filter: 'grayscale',
    unit: '',
    nouisilder: {
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      start: 1,
      connect: 'lower'
    },
  },
  'effect-sepia': {
    name: 'sepia',
    filter: 'sepia',
    unit: '',
    nouisilder: {
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      start: 1,
      connect: 'lower'
    },
  },
  'effect-marvin': {
    name: 'marvin',
    filter: 'invert',
    unit: '%',
    nouisilder: {
      range: {
        min: 0,
        max: 100,
      },
      step: 1,
      start: 100,
      connect: 'lower'
    },
  },
  'effect-phobos': {
    name: 'phobos',
    filter: 'blur',
    unit: 'px',
    nouisilder: {
      range: {
        min: 0,
        max: 3,
      },
      step: 0.1,
      start: 3,
      connect: 'lower'
    },
  },
  'effect-heat': {
    name: 'heat',
    filter: 'brightness',
    unit: '',
    nouisilder: {
      range: {
        min: 1,
        max: 3,
      },
      step: 0.1,
      start: 3,
      connect: 'lower'
    },
  }
};

const onSliderChange = () => {
  const effectId = document.querySelector('.effects__radio:checked').getAttribute('id');
  if (effectId !== 'effect-none') {
    pictureUploadValue.value = slider.noUiSlider.get();
    pictureUploadPreview.style.cssText += `filter: ${EFFECT[effectId].filter}(${slider.noUiSlider.get()}${EFFECT[effectId].unit})`;
  }
};

const changeEffect = (evt) => {
  const effectId = evt.target.getAttribute('id');
  pictureUploadPreview.classList = '';
  pictureUploadPreview.classList.add(`effects__preview--${EFFECT[effectId].name}`);
  slider.classList.add('hidden');
  pictureUploadPreview.style.filter = '';

  if(effectId !== 'effect-none') {
    slider.classList.remove('hidden');
    slider.noUiSlider.updateOptions(EFFECT[effectId].nouisilder);
  }
};

const createSlider = () => {
  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    start: 100,
    connect: 'lower',
    format: {
      to: (value) => {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  effects.forEach((element) => element.addEventListener('change', changeEffect));
  slider.noUiSlider.on('update', onSliderChange);
  slider.classList.add('hidden');

};

const removeSlider = () => {
  slider.noUiSlider.destroy();
  effects.forEach((element) => element.removeEventListener('change', changeEffect));
};

export{createSlider, removeSlider};
