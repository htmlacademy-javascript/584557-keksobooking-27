
import { getPriceWord } from './util.js';

export default {
  _rawAds: [],
  _currentFilters: null,

  _getFilteredAds(filters) {
    this._currentFilters = filters;

    return [...this._rawAds].filter((this._adFilter.bind(this)));
  },

  _adFilter(ad) {
    return Object.entries(this._currentFilters).every(([filterKey, filterValue]) => {
      const offerFieldName = filterKey.replace('housing-','');
      const offerFieldValue = ad.offer[offerFieldName];

      if(filterValue === 'any' || (filterKey === 'features' && !filterValue.length)) {
        return true;
      }

      if(filterKey === 'housing-type') {
        if(filterValue === offerFieldValue) {
          return true;
        }
      }

      if(filterKey === 'housing-price') {
        if(filterValue === getPriceWord(offerFieldValue)) {
          return true;
        }
      }

      if(filterKey === 'housing-rooms') {
        if((Number(filterValue) === Number(offerFieldValue))) {
          return true;
        }
      }

      if(filterKey === 'housing-guests') {
        if((Number(filterValue) === Number(offerFieldValue))) {
          return true;
        }
      }

      if(filterKey === 'features') {
        return filterValue.every((filterFeature) => offerFieldValue?.includes(filterFeature));

      }

      return false;
    });
  },

  getAds(filters) {
    if(!filters) {
      return [...this._rawAds];
    }

    return this._getFilteredAds(filters);
  },

  setRawAdsData(ads) {
    this._rawAds = ads;
  }
};
