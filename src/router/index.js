import { HomeView, AboutView, ContactView, ErrorView } from '../views';
import EventEmitter from '../utils/EventEmitter';

/**
 * @author Xondamir Nazrullayev
 * @github https://github.com/Xondamir-coder
 * @gmail xondamirnazrullayev@gmail.com
 */
export default class Router extends EventEmitter {
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
		},
	};

	// DOM element for appContainer
	appContainer = document.querySelector('#app');

	/**
	 * @constructor Set up event listeners and initial state
	 */
	constructor() {
		super();
		this.#activateLinkAndFetchHtml();
		document.addEventListener('click', this.#handleRouting.bind(this));
		window.addEventListener('popstate', () => {
			this.#activateLinkAndFetchHtml();

			// Emit popstate event such that other classes can listen to it
			this.trigger('popstate');
		});
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
		this.#activateLinkAndFetchHtml();

		// Trigger popstate event manually, so loadClasses func in main.js works
		this.#triggerEvent('popstate');
	}

	/**
	 * @desc Fetch and display HTML content based on the current route
	 */
	#fetchHtml() {
		const path = window.location.pathname;
		const route = this.routes[path] || this.routes[404];

		this.appContainer.innerHTML = route.template;
		document.title = route.title;
		document
			.querySelector('meta[name="description"]')
			.setAttribute('content', route.description);
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
	 * @desc Calls #fetchHtml and #activateLink functions
	 */
	#activateLinkAndFetchHtml() {
		this.#fetchHtml();
		this.#activateLink();
	}

	/**
	 * @param {String} type - type of event
	 */
	#triggerEvent(type) {
		const event = new Event(type);
		window.dispatchEvent(event);
	}
}
