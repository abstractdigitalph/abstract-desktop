import DefaultRenderer from './DefaultRenderer';
import { LandingAnimation, menu } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class LandingRenderer extends DefaultRenderer {
  onEnter() {
    const landing = new LandingAnimation();
    landing.load();
    menu.addScrollbar();
  }

  onLeave() {
    menu.removeScrollbar();
  }
}
