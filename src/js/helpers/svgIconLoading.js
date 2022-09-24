export default () => {
	const xhr = new XMLHttpRequest();

	xhr.onload = function () {
		const div = document.createElement('div');

		div.innerHTML = this.responseText;
		div.classList.add('app-svg');
		document.body.prepend(div);
	}

	xhr.open('get', `${TEMPLATE_URL}svg/svg-sprite.svg`, true);
	xhr.send();
}
