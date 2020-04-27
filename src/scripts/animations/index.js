import MenuAnimation from './menu';
import ScrollAnimation from './scroll';

// Load global animation
const menu = new MenuAnimation();
menu.load();

const scroll = new ScrollAnimation();

// Export per page animation
export { default as LandingAnimation } from './landing';
export { default as DaysAnimation } from './days';
export { menu, scroll };
