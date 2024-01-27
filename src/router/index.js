import { HomeView, AboutView, ContactView, ErrorView } from '../views';
import { IndexLayout } from '../layouts';
import EventEmitter from '../utils/EventEmitter';

/**
 * @author Xondamir Nazrullayev
 * @github https://github.com/Xondamir-coder
 * @gmail xondamirnazrullayev@gmail.com
 */
export default class Router extends EventEmitter {
	// Previous route
	route = null;

	// Layouts
	layouts = {
		'/': IndexLayout,
	};

	// Routes with templates, titles and desc
	routes = {
		'/': {
			template: HomeView,
			title: 'Home | SPA',
			description: 'Home Page',
		},
		'/about': {
			template: AboutView,
			title: 'About | SPA',
			description: 'About Page',
		},
		'/contact': {
			template: ContactView,
			title: 'Contact | SPA',
			description: 'Contact Page',
		},
		404: {
			template: ErrorView,
			title: '404 | SPA',
			description: '404 Page',
			// Override whole html
			override: true,
		},
	};

	// DOM element for appContainer
	appContainer = document.querySelector('#app');

	/**
	 * @constructor Set up event listeners and initial state
	 */
	constructor() {
		super();
		this.#attachLayout();
		this.#fetchHtml();
		this.#activateLink();

		document.addEventListener('click', this.#handleRouting.bind(this));

		// Emit popstate event such that other classes can listen to it
		window.addEventListener('popstate', this.trigger.bind(this, 'popstate'));
	}

	/**
	 * @desc Attach corresponding layout
	 */
	#attachLayout() {
		const path = window.location.pathname;

		// Obtain corresponding layout
		const layout = this.layouts[path] || this.layouts['/'];

		// Attach it to #app
		this.appContainer.innerHTML = layout;

		// Select contentContainer
		this.contentContainer = document.querySelector('#content');
	}

	/**
	 * @param {Event} e - window event
	 * @desc Handle navigation when a navbar link is clicked
	 */
	#handleRouting(e) {
		e.preventDefault();

		// Guard close such that it only reacts to router links
		if (!e.target.matches('a[data-router-link=""]')) return;

		// Navigate to '/some-path' manually
		window.history.pushState({}, '', e.target.href);

		// Make a link active and fetch corresponding html
		this.#fetchHtml();

		// Trigger popstate event manually, so correspoding class/script in instantiated (check main.js)
		this.#triggerEvent('popstate');
	}

	/**
	 * @desc Fetch and display HTML content based on the current route
	 */
	#fetchHtml() {
		const path = window.location.pathname;

		// Current route
		const route = this.routes[path] || this.routes[404];

		// Guard clause
		if (route === this.route) return;

		// Attach the current layout
		this.#attachLayout();

		const container = route.override ? this.appContainer : this.contentContainer;

		// Write html & meta tags
		this.#writeHtml(route, container);

		// highlight link
		this.#activateLink();

		// Renew previous route
		this.route = route;
	}

	/**
	 * @desc Highlight the active navbar link based on the current URL
	 */
	#activateLink() {
		const links = document.querySelectorAll('a[data-router-link=""]');
		const href = window.location.href;
		links.forEach(link =>
			link.href === href
				? link.classList.add('active-link')
				: link.classList.remove('active-link')
		);
	}

	/**
	 * @desc Writes html and changes meta tags & title
	 * @param {Object} route current route
	 * @param {Element} container current container of html
	 */
	#writeHtml(route, container) {
		container.innerHTML = route.template;
		document.title = route.title;
		document
			.querySelector('meta[name="description"]')
			.setAttribute('content', route.description);
	}

	/**
	 * @param {String} type - type of event
	 */
	#triggerEvent(type) {
		const event = new Event(type);
		window.dispatchEvent(event);
	}
}
