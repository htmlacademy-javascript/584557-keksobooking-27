import { DATA_URL, BASE_URL } from './constants.js';

const getAdsData = (onSuccess, onFail) => {
  fetch(DATA_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        if(onFail) {
          onFail();
        }
      }
    })
    .then(onSuccess)
    .catch(() => {
      if(onFail) {
        onFail();
      }
    });
};

const sendData = (onSuccess, onFail, body) => fetch(
  BASE_URL,
  {
    method: 'POST',
    body,
  },
)
  .then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    }
  })
  .catch(() => {
    onFail('Не удалось отправить форму. Попробуйте ещё раз');
  });

export {getAdsData, sendData};
