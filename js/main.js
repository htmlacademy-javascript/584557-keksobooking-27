import {createAdEl} from './markup.js';
import { getRandomAds } from './data.js';

const mapCanvasEl = document.querySelector('#map-canvas');
mapCanvasEl.append(createAdEl(getRandomAds()[0]));
