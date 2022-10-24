import {
  TITLE_LENGTH,
  RENT_PRICE,
  HOME_TYPE_MIN_PRICE_MAP
} from './constants.js';
import { declinationOfNum } from './util.js';
import '../vendor/pristine/pristine.min.js';

const adFormElement = document.querySelector('.ad-form');

const adFormCapacitySelectElement = adFormElement.querySelector('#capacity');
const adFormHomeTypeSelectElement = adFormElement.querySelector('#type');
const adFormTitleInputElement = adFormElement.querySelector('#title');
const adFormPriceInputElement = adFormElement.querySelector('#price');
const adFormRoomNumberSelectElement = adFormElement.querySelector('#room_number');
const adFormTimeInSelectElement = adFormElement.querySelector('#timein');
const adFormTimeOutSelectElement = adFormElement.querySelector('#timeout');

const pristine = new Pristine(adFormElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
});

// title
const validateTitle = (value) => value.length >= TITLE_LENGTH.min && value.length <= TITLE_LENGTH.max;
pristine.addValidator(
  adFormTitleInputElement,
  validateTitle,
  `Значение должно быть в диапазоне от ${TITLE_LENGTH.min} до ${TITLE_LENGTH.max} символов`,
  2,
  true
);

// price
const validatePrice = (value) => {
  const currentMinPrice = Number(adFormPriceInputElement.getAttribute('min'));

  return Number(value) >= currentMinPrice && Number(value) <= RENT_PRICE.max;
};

const getadFormPriceInputElementValidationErrorText = () => {
  const currentMinPrice = Number(adFormPriceInputElement.getAttribute('min'));

  return `Значение должно быть в диапазоне от ${currentMinPrice} до ${RENT_PRICE.max} символов`;
};

pristine.addValidator(
  adFormPriceInputElement,
  validatePrice,
  getadFormPriceInputElementValidationErrorText,
  2,
  true
);

// home type
adFormHomeTypeSelectElement.addEventListener('change', (evt) => {
  const homeType = evt.target.value;
  const minPrice = HOME_TYPE_MIN_PRICE_MAP[homeType];

  adFormPriceInputElement.setAttribute('placeholder', minPrice);
  adFormPriceInputElement.setAttribute('min', minPrice);

  pristine.validate(adFormPriceInputElement);
});

// capacity
const validateCapacity = (value) =>
  Number(adFormRoomNumberSelectElement.value) === 100 ?
    Number(value) === 0 :
    Number(value) <= Number(adFormRoomNumberSelectElement.value) && Number(value) > 0;

const getCapacitySelectElementValidationErrorText = (guestsAmmount) => `${adFormRoomNumberSelectElement.value} ${declinationOfNum(Number(adFormRoomNumberSelectElement.value), ['комната', 'комнаты', 'комнат'])} не для ${guestsAmmount} ${declinationOfNum(Number(guestsAmmount),['гостя', 'гостей', 'гостей'])}`;

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

// time in/ time out
adFormTimeInSelectElement.addEventListener('change', (evt) => {
  adFormTimeOutSelectElement.value = evt.target.value;
  pristine.validate(adFormCapacitySelectElement);
});
adFormTimeOutSelectElement.addEventListener('change', (evt) => {
  adFormTimeInSelectElement.value = evt.target.value;
  pristine.validate(adFormCapacitySelectElement);
});

// form
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
