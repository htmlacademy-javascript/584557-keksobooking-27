
import { DEFAULT_FILTER, FILTERS_NAMES } from './constants.js';
import { getPriceWord } from './util.js';

export default {
  rawAds: [],
  currentFilters: null,

  getFilteredAds(filters) {
    this.currentFilters = filters;

    return [...this.rawAds].filter((this.adFilter.bind(this)));
  },

  adFilter(ad) {
    return Object.entries(this.currentFilters).every(([filterKey, filterValue]) => {
      const offerFieldName = filterKey.replace('housing-','');
      const offerFieldValue = ad.offer[offerFieldName];

      if(filterValue === DEFAULT_FILTER || (filterKey === FILTERS_NAMES.features && !filterValue.length)) {
        return true;
      }

      if(filterKey === FILTERS_NAMES.type) {
        if(filterValue === offerFieldValue) {
          return true;
        }
      }

      if(filterKey === FILTERS_NAMES.price) {
        if(filterValue === getPriceWord(offerFieldValue)) {
          return true;
        }
      }

      if(filterKey === FILTERS_NAMES.rooms) {
        if((Number(filterValue) === Number(offerFieldValue))) {
          return true;
        }
      }

      if(filterKey === FILTERS_NAMES.guests) {
        if((Number(filterValue) === Number(offerFieldValue))) {
          return true;
        }
      }

      if(filterKey === FILTERS_NAMES.features) {
        return filterValue.every((filterFeature) => offerFieldValue?.includes(filterFeature));

      }

      return false;
    });
  },

  getAds(filters) {
    if(!filters) {
      return [...this.rawAds];
    }

    return this.getFilteredAds(filters);
  },

  setRawAdsData(ads) {
    this.rawAds = ads;
  }
};
