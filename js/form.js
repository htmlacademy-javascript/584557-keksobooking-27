const adFormElement = document.querySelector('.ad-form');
const adFormFieldsetsElements = adFormElement.querySelectorAll('fieldset');

const filtersFormElement = document.querySelector('.map__filters');
const filtersFormChildeElements = [...filtersFormElement.children];

const disableForms = () => {
  adFormElement.classList.add('ad-form--disabled');
  filtersFormElement.classList.add('map__filters--disabled');

  adFormFieldsetsElements
    .forEach((fieldsetElement) => fieldsetElement.setAttribute('disabled', true));

  filtersFormChildeElements
    .forEach((child) => child.setAttribute('disabled', true));
};

const enableForms = () => {
  adFormElement.classList.remove('ad-form--disabled');
  filtersFormElement.classList.remove('map__filters--disabled');

  adFormFieldsetsElements
    .forEach((fieldsetElement) => fieldsetElement.removeAttribute('disabled'));

  filtersFormChildeElements
    .forEach((child) => child.removeAttribute('disabled'));
};

export {
  disableForms,
  enableForms
};
