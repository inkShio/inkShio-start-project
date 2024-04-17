/* Helpers */
import documentReady from './helpers/documentReady';
import isWebp from './helpers/isWebp';
import svgIconLoading from './helpers/svgIconLoading';
import vars from './helpers/vars';

/* Libs */
//import 'focus-visible';
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
