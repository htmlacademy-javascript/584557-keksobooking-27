import { MAX_ADS } from './constants.js';
import { createMarker } from './map.js';
import { getAdsData } from './api.js';
import { getShuffletArrayWithRandomLength } from './util.js';
import { showMapErrorElement } from './markup.js';
import { enableForms, enableAdForm } from './form.js';

const startApp = () => {
  getAdsData(
    (adsData) => {
      enableForms();
      getShuffletArrayWithRandomLength(adsData).slice(0 ,MAX_ADS).forEach(createMarker);
    },
    () => {
      enableAdForm();
      showMapErrorElement();
    },
  );
};

export { startApp };
