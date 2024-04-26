/* Helpers */
import documentReady from './helpers/documentReady.js';
import isWebp from './helpers/isWebp.js';
import svgIconLoading from './helpers/svgIconLoading.js';
import vars from './helpers/vars.js';

/* Libs */
import $ from 'jquery';

/* Components */

/* Modules */

/* Any scripts */

window.$ = $;
window.jQuery = $;

isWebp();

documentReady(() => {
	svgIconLoading();
});
