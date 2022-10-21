const adFormElement = document.querySelector('.ad-form');
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
