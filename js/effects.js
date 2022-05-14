const options = {
  'none': {
    filter: 'none',
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  },
  'chrome': {
    filter: 'grayscale',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    format: {
      to: (value) => value,
      from: (value) => value
    },
  },
  'sepia': {
    filter: 'sepia',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    format: {
      to: (value) => value,
      from: (value) => value
    }
  },
  'marvin': {
    filter: 'invert',
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    format: {
      to: (value) => `${value}%`,
      from: (value) => value
    }
  },
  'phobos': {
    filter: 'blur',
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    format: {
      to: (value) => `${value}px`,
      from: (value) => value
    }
  },
  'heat': {
    filter: 'brightness',
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    format: {
      to: (value) => value,
      from: (value) => value
    }
  }
};

const imageUploadPreviewElement = document.querySelector('.img-upload__preview img');
const effectElements = document.querySelectorAll('.effects__radio');

const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');

noUiSlider.create(sliderElement, options['none']);

const fieldChangeHandler = (evt) => {
  const effect = evt.target.value;
  if (effect === 'none') {
    sliderElement.classList.add('hidden');
    imageUploadPreviewElement.className = '';
    imageUploadPreviewElement.style.filter = '';
  } else {
    sliderElement.classList.remove('hidden');
    imageUploadPreviewElement.className = '';
    imageUploadPreviewElement.classList.add(`effects__preview--${effect}`);
    sliderElement.noUiSlider.updateOptions(options[effect]);
  }
};

effectElements.forEach((effectField) => effectField.addEventListener('change', fieldChangeHandler));

sliderElement.noUiSlider.on('update', () => {
  const sliderValue = sliderElement.noUiSlider.get();
  valueElement.setAttribute('value', sliderValue);
  const currentEffect = document.querySelector('.effects__radio:checked').value;
  const filterValue = `${options[currentEffect].filter}(${sliderValue})`;
  imageUploadPreviewElement.style.filter = filterValue;
});
