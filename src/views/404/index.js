import EventEmitter from '../../utils/EventEmitter';

export default class ErrorPageClass extends EventEmitter {
	cursor = { x: 0, y: 0 };

	// DOM elements
	scene = document.querySelector('.error__wrapper .container .scene');
	text = document.querySelector('.error__wrapper .container .text');

	constructor() {
		super();
		window.addEventListener('mousemove', this.#updateCursor.bind(this));
	}
	#updateCursor(e) {
		// Get cursor data
		this.cursor.x = (e.clientX / window.innerWidth) * -80 + 40;
		this.cursor.y = (e.clientY / window.innerHeight) * -80 + 40;

		// Use cursor data to drag the scene and the text dynamically
		this.scene.style.transform = `translate(${this.cursor.x}px, ${this.cursor.y}px)`;
		this.text.style.transform = `translate(${-this.cursor.x / 7}px, ${-this.cursor.y / 7}px)`;

		// Trigger mousemove event so other classes can listen to it
		this.trigger('mousemove');
	}
}
