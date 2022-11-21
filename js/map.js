import { INIT_MAP_CENTER_COORDS, MAX_ADS } from './constants.js';
import { setAddressCoords } from './form.js';
import { startApp } from './app.js';
import { createAdElement } from './markup.js';

const map = L.map('map-canvas')
  .on('load', startApp)
  .setView([INIT_MAP_CENTER_COORDS.lat, INIT_MAP_CENTER_COORDS.lng], 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  INIT_MAP_CENTER_COORDS,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  setAddressCoords(evt.target.getLatLng());
});

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);
const renderMarker = (adData) => {
  const { lat, lng } = adData.location;

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(createAdElement(adData));
};

const renderMarkers = (ads) => {
  markerGroup.clearLayers();
  ads.slice(0, MAX_ADS).forEach(renderMarker);
};

const setMapInitialState = () => {
  mainPinMarker.setLatLng(L.latLng(INIT_MAP_CENTER_COORDS));
  map.panTo(INIT_MAP_CENTER_COORDS);

  markerGroup.eachLayer((marker) => {
    if(marker.isPopupOpen()) {
      marker.closePopup();
    }
  });
};

export { renderMarkers, setMapInitialState };
