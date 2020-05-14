import MenuAnimation from './menu';
import ScrollAnimation from './scroll';
import TransitionAnimation from './transition';
import LandingAnimation from './landing';
import DaysAnimation from './days';
import OnLoadAnimation from './on-load';
import OnEnterAnimation from './on-enter';

// Load global animation
const menu = new MenuAnimation();
const scroll = new ScrollAnimation();
const transition = new TransitionAnimation();
const landing = new LandingAnimation();
const days = new DaysAnimation();
const onLoad = new OnLoadAnimation();
const spenmo = new OnEnterAnimation('spenmo', 3);
const diab = new OnEnterAnimation('diab', 4);
const tightrope = new OnEnterAnimation('tightrope', 3);
const flash = new OnEnterAnimation('flash', 4);
menu.load();

// Export per page animation
export { default as DaysAnimation } from './days';
export { default as WorkAnimation } from './work';
export {
  menu,
  scroll,
  transition,
  landing,
  days,
  onLoad,
  spenmo,
  diab,
  tightrope,
  flash,
};
