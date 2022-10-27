import { enableForms, setAddressCoords } from './form.js';
import { createAdElement } from './markup.js';
import { getRandomAds } from './data.js';
import { INIT_MAP_CENTER_COORDS } from './constants.js';

const map = L.map('map-canvas').on('load', enableForms).setView([INIT_MAP_CENTER_COORDS.lat, INIT_MAP_CENTER_COORDS.lng], 12);

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
const adsData = getRandomAds();
const createMarker = (adData) => {
  const { lat, lng } = adData.author.location;

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

adsData.forEach(createMarker);
