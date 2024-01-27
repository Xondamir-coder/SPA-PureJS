import './style.css';
import Router from './router';
import { ErrorPageClass, HomePageClass, AboutPageClass, ContactPageClass } from './views';

class Main {
	// Previous path
	path = null;

	// Classes/Scripts of pages
	classes = {
		'/': HomePageClass,
		'/about': AboutPageClass,
		'/contact': ContactPageClass,
		404: ErrorPageClass,
	};

	constructor() {
		const router = new Router();
		this.#instantiateClass();

		// Using popstate event of router to load classes dynamically
		router.on('popstate', this.#instantiateClass.bind(this));
	}
	#instantiateClass() {
		// Current url/path of the site
		const path = window.location.pathname;

		// Guard clause
		if (path === this.path) return;

		// Get appropriate class by using path
		const myClass = this.classes[path] || this.classes[404];

		// Instantiate a class
		new myClass();

		// Renew previous path
		this.path = path;
	}
}

// Instantiate main class
new Main();
