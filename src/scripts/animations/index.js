import MenuAnimation from './menu';
import ScrollAnimation from './scroll';
import TransitionAnimation from './transition';
import LandingAnimation from './landing';
import DaysAnimation from './days';

// Load global animation
const menu = new MenuAnimation();
const scroll = new ScrollAnimation();
const transition = new TransitionAnimation();
const landing = new LandingAnimation();
const days = new DaysAnimation();
menu.load();

// Export per page animation
export { default as DaysAnimation } from './days';
export { default as WorkAnimation } from './work';
export {
  menu, scroll, transition, landing, days,
};
