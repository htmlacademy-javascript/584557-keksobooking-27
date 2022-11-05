import { HOME_TYPES_MAP, FEATURES_MAP, ESC_KEYCODE } from './constants.js';
import { declinationOfNum } from './util.js';

const popupTemplateElement = document.querySelector('#card').content;

const createAdPhotosElements = (photosSrcArr) => photosSrcArr ? photosSrcArr.reduce((fragmentElement, src, i) => {
  const imgElement = document.createElement('img');
  imgElement.src = src;
  imgElement.alt = `Фото жилища ${i + 1}`;
  imgElement.classList.add('popup__photo');
  imgElement.width = 45;
  imgElement.height = 40;

  fragmentElement.append(imgElement);

  return fragmentElement;
}, document.createDocumentFragment()) : null;

const createAdFeaturesElements = (features) => features ? features.reduce((fragmentElement ,feature) => {
  const featureElement = document.createElement('li');
  featureElement.textContent = FEATURES_MAP[feature];
  featureElement.className = `popup__feature popup__feature--${feature}`;
  fragmentElement.append(featureElement);

  return fragmentElement;
}, document.createDocumentFragment()) : null;

const getCapacityElementTextContent = (rooms, guests) => {
  if(rooms && guests) {
    return `${rooms} ${declinationOfNum(rooms, ['комната', 'комнаты', 'комнат'])}, для ${guests} ${declinationOfNum(guests, ['гостя', 'гостей', 'гостей'])}`;
  }

  if(rooms) {
    return `${rooms} ${declinationOfNum(rooms, ['комната', 'комнаты', 'комнат'])}`;
  }

  if(guests) {
    return `Для ${guests} ${declinationOfNum(guests, ['гостя', 'гостей', 'гостей'])}`;
  }
};

const getTimeElementTextContent = (checkin, checkout) => {
  if (checkin && checkout) {
    return `Заезд после ${checkin}, выезд до ${checkout}`;
  }
  if(checkin) {
    return `Заезд после ${checkin}`;
  }

  if(checkout) {
    return `Выезд до ${checkout}`;
  }
};

const fillTextContent = (element, data) => {
  element.textContent = data;
};

const updateChildren = (element, childrens) => {
  element.replaceChildren(childrens);
};

const setAvatarData = (imgElement, value) => {
  imgElement.src = value;
};

const createAdElement = (adData) => {
  const adElement = popupTemplateElement.querySelector('.popup').cloneNode(true);

  const { offer, author : { avatar } } = adData;
  const { title, address, price, type, rooms, guests, checkin, checkout, features, description, photos } = offer;

  const dataMap = {
    '.popup__title': {
      data: title,
      fill: fillTextContent
    },
    '.popup__text--address': {
      data: address,
      fill: fillTextContent
    },
    '.popup__text--price': {
      data: price,
      fill: fillTextContent
    },
    '.popup__type': {
      data: HOME_TYPES_MAP[type],
      fill: fillTextContent
    },
    '.popup__text--capacity': {
      data: getCapacityElementTextContent(rooms, guests),
      fill: updateChildren
    },
    '.popup__text--time': {
      data: getTimeElementTextContent(checkin, checkout),
      fill: updateChildren
    },
    '.popup__features': {
      data: createAdFeaturesElements(features),
      fill: updateChildren
    },
    '.popup__description': {
      data: description,
      fill: fillTextContent
    },
    '.popup__photos': {
      data: createAdPhotosElements(photos),
      fill: updateChildren
    },
    '.popup__avatar': {
      data: avatar,
      fill: setAvatarData
    },
  };

  Object.keys(dataMap).forEach((key) => {
    const selector = key;
    const {data, fill} = dataMap[key];
    const element = adElement.querySelector(selector);

    if(data) {
      fill(element, data);
    } else {
      element.remove();
    }
  });

  return adElement;
};

const mapErrorElement = document.querySelector('.map__error');
const showMapErrorElement = () => mapErrorElement.classList.remove('map__error-hidden');
const hideMapErrorElement = () => mapErrorElement.classList.add('map__error-hidden');

const showSuccessPopup = () => {
  const successPopupTemplateElement = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

  const onDocumentEscKeydown = (evt) => {
    if(evt.keyCode === ESC_KEYCODE) {
      successPopupTemplateElement.remove();
    }
  };

  successPopupTemplateElement.addEventListener('click', () => {
    successPopupTemplateElement.remove();
    document.removeEventListener('keydown', onDocumentEscKeydown, {once: true});
  });

  document.addEventListener('keydown', onDocumentEscKeydown, {once: true});

  document.body.append(successPopupTemplateElement);
};

const showErrorPopup = () => {
  const errorPopupTemplateElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);

  const onDocumentEscKeydown = (evt) => {
    if(evt.keyCode === ESC_KEYCODE) {
      errorPopupTemplateElement.remove();
    }
  };

  errorPopupTemplateElement.addEventListener('click', () => {
    errorPopupTemplateElement.remove();
    document.removeEventListener('keydown', onDocumentEscKeydown, {once: true});
  });

  errorPopupTemplateElement.querySelector('.error__button')
    .addEventListener('click', () => {
      errorPopupTemplateElement.remove();
    });

  document.addEventListener('keydown', onDocumentEscKeydown, {once: true});

  document.body.append(errorPopupTemplateElement);
};

export {
  createAdElement,
  showMapErrorElement,
  hideMapErrorElement,
  showSuccessPopup,
  showErrorPopup
};
