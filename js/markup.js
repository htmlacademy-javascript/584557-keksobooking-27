import { HOME_TYPES_MAP, FEATURES_MAP } from './constants.js';
import { declOfNum } from './util.js';

const popupTemplateEl = document.querySelector('#card').content;

const createAdPhotosEls = (photosSrcArr) => photosSrcArr.reduce((fragmentEl, src, i) => {
  const imgEl = document.createElement('img');
  imgEl.src = src;
  imgEl.alt = `Фото жилища ${++i}`;
  imgEl.classList.add('popup__photo');
  imgEl.width = 45;
  imgEl.height = 40;

  fragmentEl.append(imgEl);

  return fragmentEl;
}, document.createDocumentFragment());

const createAdFeaturesEls = (features) => features.reduce((fragmentEl ,feature) => {
  const featureEl = document.createElement('li');
  featureEl.textContent = FEATURES_MAP[feature];
  featureEl.className = `popup__feature popup__feature--${feature}`;
  fragmentEl.append(featureEl);

  return fragmentEl;
}, document.createDocumentFragment());

const getCapacityElTextContent = (rooms, guests) => {
  let textContent;

  if(rooms && guests) {
    textContent = `${rooms} ${declOfNum(rooms, ['комната', 'комнаты', 'комнат'])}, для ${guests} ${declOfNum(guests, ['гостя', 'гостей', 'гостей'])}`;
  } else {
    if(rooms) {
      textContent = `${rooms} ${declOfNum(rooms, ['комната', 'комнаты', 'комнат'])}`;
    }

    if(guests) {
      textContent = `Для ${guests} ${declOfNum(guests, ['гостя', 'гостей', 'гостей'])}`;
    }
  }
  return textContent;
};

const getTimeElTextContent = (checkin, checkout) => {
  let textContent;

  if (checkin && checkout) {
    textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else {
    if(checkin) {
      textContent = `Заезд после ${checkin}`;
    }

    if(checkout) {
      textContent = `Выезд до ${checkout}`;
    }
  }

  return textContent;
};

const addDataToAdEl = (adEl, dataMap) => {
  Object.keys(dataMap).forEach((key) => {
    const selector = key;
    const data = dataMap[key];

    const el = adEl.querySelector(selector);
    if(data) {
      if(typeof data === 'string' || typeof data === 'number') {
        el.textContent = data;
      }

      if(data.nodeType === 1 || data.nodeType === 11) {
        el.innerHTML = '';
        el.append(data);
      }
    } else {
      el.remove();
    }
  });
};

const createAdEl = (adData) => {
  const adEl = popupTemplateEl.cloneNode(true);

  const { author : { offer, avatar } } = adData;
  const { title, address, price, type, rooms, guests, checkin, checkout, features, description, photos } = offer;

  const dataMap = {
    '.popup__title': title,
    '.popup__text--address': address,
    '.popup__text--price': price,
    '.popup__type': HOME_TYPES_MAP[type],
    '.popup__text--capacity': getCapacityElTextContent(rooms, guests),
    '.popup__text--time': getTimeElTextContent(checkin, checkout),
    '.popup__features': createAdFeaturesEls(features),
    '.popup__description': description,
    '.popup__photos': createAdPhotosEls(photos),
    '.popup__avatar': avatar,
  };

  addDataToAdEl(adEl, dataMap);

  return adEl;
};

export {
  createAdEl
};
