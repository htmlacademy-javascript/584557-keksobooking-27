import { createAdElement } from './markup.js';
import { getRandomAds } from './data.js';

const adData = getRandomAds()[0];
const adElement = createAdElement(adData);

const mapCanvasElement = document.querySelector('#map-canvas');
mapCanvasElement.append(adElement);
