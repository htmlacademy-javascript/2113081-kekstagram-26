import { isCorrectFileExtension, isEscapeKey } from './util.js';
import { openErrorMessage, openSuccessMessage } from './success-err-message.js';
import { pristine } from './upload-image-validation.js';
import { addPhoto } from './add-photo.js';

const MIN_SCALE = 0.25;
const MAX_SCALE = 1;
const SCALE_STEP = 0.25;

const form = document.querySelector('#upload-select-image');
const fileInput = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const imagePreview = document.querySelector('.img-upload__preview').querySelector('img');
const uploadCancelButton = document.querySelector('.img-upload__cancel');
const scalePercent = document.querySelector('.scale__control--value');
const smallerScaleButton = form.querySelector('.scale__control--smaller');
const biggerScaleButton = form.querySelector('.scale__control--bigger');
const effectsList = document.querySelector('.effects__list');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderValue = document.querySelector('.effect-level__value');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const effectLevelValueInput = document.querySelector('.effect-level__value');
const uploadButton = document.querySelector('.img-upload__submit');

const effects = {
  chrome: {
    filterName(value) {
      return `grayscale(${value})`;
    },
    sliderOptions: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
  },
  sepia: {
    filterName(value) {
      return `sepia(${value})`;
    },
    sliderOptions: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
  },
  phobos: {
    filterName(value) {
      return `blur(${value}px)`;
    },
    sliderOptions: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },

  },
  marvin: {
    filterName(value) {
      return `invert(${value}%)`;
    },
    sliderOptions: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
  },
  heat: {
    filterName(value) {
      return `brightness(${value})`;
    },
    sliderOptions: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },

  },
};

function handleFiles() {
  const fileList = this.files;
  uploadButton.disabled = false;

  if (fileList.length > 0) {
    uploadOverlay.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');

    imagePreview.src = window.URL.createObjectURL(fileList[0]);
    uploadCancelButton.addEventListener('click', handleClose);
    document.addEventListener('keydown', onPopupEscKeydown);

    smallerScaleButton.addEventListener('click', scaleSmaller);
    biggerScaleButton.addEventListener('click', scaleBigger);
    scalePercent.value = '100%';

    effectsList.addEventListener('click', setEffect);

    hashtagsInput.addEventListener('keydown', preventClose);
    commentInput.addEventListener('keydown', preventClose);
  }
}

function setEffect(evt) {
  const selectedOption = evt.target.closest('li');

  if (!selectedOption) {
    return;
  }

  const effect = selectedOption.querySelector('input').getAttribute('id').split('-')[1];

  imagePreview.className = '';
  imagePreview.style.filter = '';

  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }

  if (effect === 'none') {
    effectLevelValueInput.value = '';

    return;
  }

  const sliderOptions = effects[effect].sliderOptions;
  noUiSlider.create(sliderElement, sliderOptions);
  effectLevelValueInput.value = sliderOptions.start;
  sliderElement.noUiSlider.on('change', (value) => {
    imagePreview.style.filter = effects[effect].filterName(value[0]);
    sliderValue.value = value[0];
    effectLevelValueInput.value = value[0];
  });
  imagePreview.classList.add(`effects__preview--${effect}`);
  imagePreview.style.filter = effects[effect].filterName(sliderOptions.start);
}

function scaleSmaller() {
  const currentScale = scalePercent.value.slice(0, -1) / 100;

  if (currentScale > MIN_SCALE) {
    const newScale = currentScale - SCALE_STEP;

    imagePreview.style.transform = `scale(${newScale})`;
    scalePercent.value = `${newScale * 100}%`;
  }
}

function scaleBigger() {
  const currentScale = scalePercent.value.slice(0, -1) / 100;

  if (currentScale < MAX_SCALE) {
    const newScale = currentScale + SCALE_STEP;

    imagePreview.style.transform = `scale(${newScale})`;
    scalePercent.value = `${newScale * 100}%`;
  }
}

function handleClose() {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }

  imagePreview.style.filter = '';
  imagePreview.style.transform = '';
  imagePreview.className = '';
  document.querySelector('body').classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  smallerScaleButton.removeEventListener('click', scaleSmaller);
  biggerScaleButton.removeEventListener('click', scaleBigger);
  document.removeEventListener('keydown', onPopupEscKeydown);
  uploadCancelButton.removeEventListener('click', handleClose);
  effectsList.removeEventListener('click', setEffect);
  form.reset();
}

function onPopupEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    handleClose();
  }
}

function preventClose (evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}

fileInput.addEventListener('change', handleFiles);
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);

  if (!pristine.validate() || !isCorrectFileExtension(formData.get('filename'))) {
    return;
  }

  uploadButton.disabled = true;

  const config = {
    method: 'POST',
    body: formData,
  };

  fetch(evt.target.action, config)
    .then((response) => {
      uploadOverlay.classList.add('hidden');
      uploadButton.disabled = false;

      if (response.ok) {
        openSuccessMessage(handleClose);
        addPhoto(
          formData.get('filename'),
          formData.get('description'),
          formData.get('hashtags'),
          imagePreview.style.transform,
          imagePreview.style.filter,
        );

        return;
      }

      openErrorMessage(handleClose);
    }).catch(() => {
      openErrorMessage(handleClose);
    });
});
