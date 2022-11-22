import { MIN_RERENDER_MARKERS_PAUSE_MS } from './constants.js';
import { renderMarkers } from './map.js';
import { getAdsData } from './api.js';
import { showMapErrorElement } from './markup.js';
import { enableForms, enableAdForm, setFilterFormChangeListener } from './form.js';
import { debounce } from './util.js';
import dataManager from './data.js';

const startApp = () => {
  getAdsData(
    (adsData) => {
      dataManager.setRawAdsData(adsData);
      renderMarkers(adsData);
      enableForms();

      setFilterFormChangeListener(
        debounce((filters) => {
          const filteredAds = dataManager.getAds(filters);
          renderMarkers(filteredAds);
        },
        MIN_RERENDER_MARKERS_PAUSE_MS
        )
      );
    },
    () => {
      enableAdForm();
      showMapErrorElement();
    },
  );
};

export { startApp };
