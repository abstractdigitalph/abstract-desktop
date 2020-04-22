import MenuAnimation from './menu';

// Load global animation
const menu = new MenuAnimation();
menu.load();

// Export per page animation
export { default as ScrollAnimation } from './menu';
export { default as LandingAnimation } from './menu';
export { default as DaysAnimation } from './days';
