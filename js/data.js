import {
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  getRandomArrayElement,
  getShuffletArrayWithRandomLength
} from './util.js';
import {
  MIN_LOCATION_LAT,
  MAX_LOCATION_LAT,
  MIN_LOCATION_LGN,
  MAX_LOCATION_LGN,
  ADS_TITLES,
  MIN_PRICE,
  MAX_PRICE,
  HOUSING_TYPES,
  MIN_ROOMS_COUNT,
  MAX_ROOMS_COUNT,
  MIN_GUESTS_COUNT,
  MAX_GUESTS_COUNT,
  CHECKIN_HOURS,
  CHECKOUT_HOURS,
  FEATURES,
  DESCRIPTIONS,
  PHOTOS,
  MAX_ADS
} from './constants.js';

const createRandomAd = (_, i) => {
  const location = {
    lat: getRandomPositiveFloat(MIN_LOCATION_LAT,MAX_LOCATION_LAT, 5),
    lng: getRandomPositiveFloat(MIN_LOCATION_LGN,MAX_LOCATION_LGN, 5)
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

const getRandomAds = () => Array.from({ length: MAX_ADS }, createRandomAd);

export { getRandomAds };
