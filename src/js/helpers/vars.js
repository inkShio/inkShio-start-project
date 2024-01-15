export const bp = {
	bp_xs: 0,
	bp_sm: 576,
	bp_md: 768,
	bp_lg: 992,
	bp_xl: 1200,
	bp_xxl: 1400
}

export const size = {
	get windowWidth() {
		return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	},
	get windowHeight() {
		return window.clientHeight || document.documentElement.clientHeight || document.body.clientHeight;
	},
	get scrollTop() {
		return document.documentElement.scrollTop || document.body.scrollTop;
	}
}
