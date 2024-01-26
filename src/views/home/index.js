export default class HomePageClass {
	path = window.location.pathname;

	counterBtn = document.querySelector('.counter__button');
	counterText = document.querySelector('.counter__text');
	constructor() {
		console.log('home.js');
		this.counterBtn.addEventListener('click', () => {
			let curNum = +this.counterText.textContent;
			this.counterText.textContent = ++curNum;
		});
	}
}
