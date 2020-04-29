import MenuAnimation from './menu';
import ScrollAnimation from './scroll';
import TransitionAnimation from './transition';

// Load global animation
const menu = new MenuAnimation();
const scroll = new ScrollAnimation();
const transition = new TransitionAnimation();
menu.load();

// Export per page animation
export { default as LandingAnimation } from './landing';
export { default as DaysAnimation } from './days';
export { menu, scroll, transition };
