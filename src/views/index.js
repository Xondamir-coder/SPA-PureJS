// Importing html's as strings
import ErrorView from './404/404.html?raw';
import HomeView from './home/home.html?raw';
import AboutView from './about/about.html?raw';
import ContactView from './contact/contact.html?raw';

// Importing classes
import HomePageClass from './home';
import ErrorPageClass from './404';
import AboutPageClass from './about';
import ContactPageClass from './contact';

export {
	// Views
	ErrorView,
	HomeView,
	AboutView,
	ContactView,

	// Classes
	HomePageClass,
	ErrorPageClass,
	AboutPageClass,
	ContactPageClass,
};
