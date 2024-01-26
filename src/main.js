import './style.css';
import Router from './router';
import { ErrorPageClass, HomePageClass, AboutPageClass, ContactPageClass } from './views';
const router = new Router();

const loadClasses = async () => {
	// Current url/path of the site
	const path = window.location.pathname;

	// Scripts/Classes for each view/page
	const classes = {
		'/': HomePageClass,
		'/about': AboutPageClass,
		'/contact': ContactPageClass,
		404: ErrorPageClass,
	};

	// Get appropriate classes by using path
	const myClass = classes[path] || classes[404];

	// Instantiate it
	const classInstance = new myClass();
};
loadClasses();

// Using popstate event of router to load classes dynamically
router.on('popstate', loadClasses);
