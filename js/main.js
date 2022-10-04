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

// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
function getRandomPositiveInteger (a, b) {
  // Если переданы отрицительные числа, возвращаем NaN
  if (a < 0 || b < 0) {
    return NaN;
  }

  // Чтобы не заставлять пользователя нашей функции помнить порядок аргументов,
  // реализуем поддержку передачи минимального и максимального значения в любом порядке,
  // а какое из них большее и меньшее вычислим с помощью Math.min и Math.max.

  // После нам нужно убедиться, что пользователь не передал дробные значения,
  // для этого на всякий пожарный случай нижнюю границу диапазона
  // мы округляем к ближайшему большему целому с помощью Math.ceil,
  // а верхнюю границу - к ближайшему меньшему целому с помощью Math.floor
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  // Дальше используем Math.random() для получения случайного дробного числа в диапазоне [0, 1),
  // которое домножаем на разницу между переданными числами плюс единица - это будет наша случайная дельта.
  // После нужно сложить дельту с минимальным значением, чтобы получить итоговое случайное число.
  const result = Math.random() * (upper - lower + 1) + lower;
  // "Плюс единица", чтобы включить верхнюю границу диапазона в случайные числа

  // И в конце с помощью метода Math.floor мы округляем полученный результат,
  // потому что Math.random() генерирует только дробные числа и ноль.
  return Math.floor(result);
}

// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
function getRandomPositiveFloat (a, b, digits = 1) {
  // Если переданы отрицительные числа, возвращаем NaN
  if (a < 0 || b < 0 || digits < 0) {
    return NaN;
  }

  // Чтобы не заставлять пользователя нашей функции помнить порядок аргументов,
  // реализуем поддержку передачи минимального и максимального значения в любом порядке,
  // а какое из них большее и меньшее вычислим с помощью Math.min и Math.max
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);

  // Дальше используем Math.random() для получения случайного дробного числа в диапазоне [0, 1),
  // которое домножаем на разницу между переданными числами - это будет наша случайная дельта.
  // После нужно сложить дельту с минимальным значением, чтобы получить итоговое случайное число.
  const result = Math.random() * (upper - lower) + lower;

  // И в конце с помощью метода toFixed любого числа в JavaScript
  // указать требуемое количество знаков после точки.
  // Метод возвращает строку, поэтому с помощью унарного плюса превращаем её в число
  return +result.toFixed(digits);
}

// Функция тосавания массива при помощи алгоритма Фишера-Йетса. Взята из интернета и доработана
// Источник - https://sebhastian.com/fisher-yates-shuffle-javascript/
function fyShuffle(arr) {
  let i = arr.length;
  while (--i > 0) {
    const randIndex = getRandomPositiveInteger(0, i);
    [arr[randIndex], arr[i]] = [arr[i], arr[randIndex]];
  }
  return arr;
}

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];
const getShuffletArrayWithRandomLength = (arr) => fyShuffle([...arr]).slice(getRandomPositiveInteger(0, arr.length));

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
// eslint-disable-next-line
const randomAdeses = Array.from({length: RANDOM_ADS_COUNT}, createRandomAd);
