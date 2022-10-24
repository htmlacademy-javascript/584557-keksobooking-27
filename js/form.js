import {
  TITLE_LENGTH,
  RENT_PRICE
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

const validateTitle = (value) => value.length >= TITLE_LENGTH.min && value.length <= TITLE_LENGTH.max;
const validatePrice = (value) => value.length >= RENT_PRICE.min && value.length <= RENT_PRICE.max;
const validateCapacity = (value) =>
  Number(adFormRoomNumberSelectElement.value) === 100 ?
    Number(value) === 0 :
    Number(value) <= Number(adFormRoomNumberSelectElement.value) && Number(value) > 0;

const getCapacitySelectElementValidationErrorText = (guestsAmmount) => `${adFormRoomNumberSelectElement.value} ${declinationOfNum(Number(adFormRoomNumberSelectElement.value), ['комната', 'комнаты', 'комнат'])} не для ${guestsAmmount} ${declinationOfNum(Number(guestsAmmount),['гостя', 'гостей', 'гостей'])}`;

pristine.addValidator(
  adFormTitleInputElement,
  validateTitle,
  `Значение должно быть в диапазоне от ${TITLE_LENGTH.min} до ${TITLE_LENGTH.max} символов`,
  2,
  true
);

pristine.addValidator(
  adFormPriceInputElement,
  validatePrice,
  `Значение должно быть в диапазоне от ${ RENT_PRICE.min} до ${RENT_PRICE.max} символов`,
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
