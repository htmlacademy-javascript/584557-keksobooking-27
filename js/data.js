import {getRandomPositiveInteger,
  getRandomPositiveFloat,
  getRandomArrayElement,
  getShuffletArrayWithRandomLength} from './util.js';

const RANDOM_ADS_COUNT = 10;
const ADS_TITLES = ['Халупа', 'Дом' , 'Пещера', 'Шале', 'Комната', 'Подвал', 'Дворец'];
const MIN_LOCATION_LAT = 35.65000;
const MAX_LOCATION_LAT = 35.70000;
const MIN_LOCATION_LGN = 139.70000;
const MAX_LOCATION_LGN = 139.80000;
const MIN_PRICE = 10;
const MAX_PRICE = 1000000000;
const HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const MIN_ROOMS_COUNT = 1;
const MAX_ROOMS_COUNT = 100;
const MIN_GUESTS_COUNT = 1;
const MAX_GUESTS_COUNT = 500;
const CHECKIN_HOURS = ['12:00', '13:00', '14:00'];
const CHECKOUT_HOURS = CHECKIN_HOURS;
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTIONS = ['Норм', 'Таксе', 'Выше всяких похвал', 'Ни то, ни сё', 'И так и сяк', 'Приличное'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const createRandomAd = (_, i) => {
  const location = {
    lat: getRandomPositiveFloat(MIN_LOCATION_LAT,MAX_LOCATION_LAT),
    lng: getRandomPositiveFloat(MIN_LOCATION_LGN,MAX_LOCATION_LGN)
  };

  return {
    author: {
      avatar: `img/avatars/user${String(i + 1).padStart(2, '0')}.png`,
      offer: {
        title: getRandomArrayElement(ADS_TITLES),
        address: `${location.lat}, ${location.lng}`,
        price: getRandomPositiveInteger(MIN_PRICE, MAX_PRICE),
        type: getRandomArrayElement(HOUSING_TYPES),
        rooms: getRandomPositiveInteger(MIN_ROOMS_COUNT, MAX_ROOMS_COUNT),
        guests: getRandomPositiveInteger(MIN_GUESTS_COUNT, MAX_GUESTS_COUNT),
        checkin: getRandomArrayElement(CHECKIN_HOURS),
        checkout: getRandomArrayElement(CHECKOUT_HOURS),
        features: getShuffletArrayWithRandomLength(FEATURES),
        description: getRandomArrayElement(DESCRIPTIONS),
        photos: getShuffletArrayWithRandomLength(PHOTOS),
      },
      location
    }
  };
};

export const getRandomAdeses = () => Array.from({length: RANDOM_ADS_COUNT}, createRandomAd);
