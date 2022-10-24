import { createAdElement } from './markup.js';
import { getRandomAds } from './data.js';
import { disableForms, enableForms } from './form.js';

const adData = getRandomAds()[0];
const adElement = createAdElement(adData);

const mapCanvasElement = document.querySelector('#map-canvas');
mapCanvasElement.append(adElement);

disableForms();
setTimeout(enableForms, 500);
