import { HOME_TYPES_MAP, FEATURES_MAP } from './constants.js';
import { declinationOfNum } from './util.js';

const popupTemplateElement = document.querySelector('#card').content;

const createAdPhotosElements = (photosSrcArr) => photosSrcArr.reduce((fragmentElement, src, i) => {
  const imgElement = document.createElement('img');
  imgElement.src = src;
  imgElement.alt = `Фото жилища ${++i}`;
  imgElement.classList.add('popup__photo');
  imgElement.width = 45;
  imgElement.height = 40;

  fragmentElement.append(imgElement);

  return fragmentElement;
}, document.createDocumentFragment());

const createAdFeaturesElements = (features) => features.reduce((fragmentElement ,feature) => {
  const featureElement = document.createElement('li');
  featureElement.textContent = FEATURES_MAP[feature];
  featureElement.className = `popup__feature popup__feature--${feature}`;
  fragmentElement.append(featureElement);

  return fragmentElement;
}, document.createDocumentFragment());

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

const createAdElement = (adData) => {
  const adElement = popupTemplateElement.cloneNode(true);

  const { author : { offer, avatar } } = adData;
  const { title, address, price, type, rooms, guests, checkin, checkout, features, description, photos } = offer;

  const dataMap = {
    '.popup__title': title,
    '.popup__text--address': address,
    '.popup__text--price': price,
    '.popup__type': HOME_TYPES_MAP[type],
    '.popup__text--capacity': getCapacityElementTextContent(rooms, guests),
    '.popup__text--time': getTimeElementTextContent(checkin, checkout),
    '.popup__features': createAdFeaturesElements(features),
    '.popup__description': description,
    '.popup__photos': createAdPhotosElements(photos),
    '.popup__avatar': avatar,
  };

  Object.keys(dataMap).forEach((key) => {
    const selector = key;
    const data = dataMap[key];
    const element = adElement.querySelector(selector);

    if(data) {
      if(typeof data === 'string' || typeof data === 'number') {
        element.textContent = data;
      }

      if(data.nodeType === 1 || data.nodeType === 11) {
        element.innerHTML = '';
        element.append(data);
      }
    } else {
      element.remove();
    }
  });

  return adElement;
};

export {
  createAdElement
};
