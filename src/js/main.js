import 'focus-visible';
import $ from 'jquery';
import documentReady from './helpers/documentReady';
import isWebp from './helpers/isWebp';
import svgIconLoading from './helpers/svgIconLoading';
import vars from './helpers/vars';

isWebp();

documentReady(() => {
	svgIconLoading();
});