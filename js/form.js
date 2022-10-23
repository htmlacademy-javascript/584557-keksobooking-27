import {
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_RENT_PRICE,
  MAX_RENT_PRICE
} from './constants.js';
import { declinationOfNum } from './util.js';
import '../vendor/pristine/pristine.min.js';

const adFormElement = document.querySelector('.ad-form');
const adFormTitleInputElement = adFormElement.querySelector('#title');
const adFormPriceInputElement = adFormElement.querySelector('#price');
const adFormRoomNumberSelectElement = adFormElement.querySelector('#room_number');
const adFormCapacitySelectElement = adFormElement.querySelector('#capacity');

const pristine = new Pristine(adFormElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
});

const validateTitle = (value) => value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH;
const validatePrice = (value) => value.length >= MIN_RENT_PRICE && value.length <= MAX_RENT_PRICE;
const validateCapacity = (value) =>
  Number(adFormRoomNumberSelectElement.value) === 100 ?
    Number(value) === 0 :
    Number(value) <= Number(adFormRoomNumberSelectElement.value) && Number(value) > 0;

const getCapacitySelectElementValidationErrorText = (guestsAmmount) => `${adFormRoomNumberSelectElement.value} ${declinationOfNum(Number(adFormRoomNumberSelectElement.value), ['комната', 'комнаты', 'комнат'])} не для ${guestsAmmount} ${declinationOfNum(Number(guestsAmmount),['гостя', 'гостей', 'гостей'])}`;

pristine.addValidator(
  adFormTitleInputElement,
  validateTitle,
  `Значение должно быть в диапазоне от ${MIN_TITLE_LENGTH} до ${MAX_TITLE_LENGTH} символов`,
  2,
  true
);

pristine.addValidator(
  adFormPriceInputElement,
  validatePrice,
  `Значение должно быть в диапазоне от ${MIN_RENT_PRICE} до ${MAX_RENT_PRICE} символов`,
  2,
  true
);

pristine.addValidator(
  adFormCapacitySelectElement,
  validateCapacity,
  getCapacitySelectElementValidationErrorText,
  2,
  true
);

adFormRoomNumberSelectElement.addEventListener('change', () => {
  pristine.validate(adFormCapacitySelectElement);
});

adFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isFormValid = pristine.validate();
  if(isFormValid) {
    adFormElement.submit();
  }
});


const adFormFieldsetsElements = adFormElement.querySelectorAll('fieldset');
const filtersFormElement = document.querySelector('.map__filters');
const filtersFormSelectsElements = filtersFormElement.querySelectorAll('.map__filter');
const filtersFormFieldsetElement = filtersFormElement.querySelector('.map__features');
const filtersElements = [...filtersFormSelectsElements, filtersFormFieldsetElement];

const disableForms = () => {
  adFormElement.classList.add('ad-form--disabled');
  filtersFormElement.classList.add('map__filters--disabled');

  adFormFieldsetsElements
    .forEach((fieldsetElement) => fieldsetElement.setAttribute('disabled', true));

  filtersElements
    .forEach((filterElement) => filterElement.setAttribute('disabled', true));
};

const enableForms = () => {
  adFormElement.classList.remove('ad-form--disabled');
  filtersFormElement.classList.remove('map__filters--disabled');

  adFormFieldsetsElements
    .forEach((fieldsetElement) => fieldsetElement.removeAttribute('disabled'));

  filtersElements
    .forEach((filterElement) => filterElement.removeAttribute('disabled'));
};

export {
  disableForms,
  enableForms
};
