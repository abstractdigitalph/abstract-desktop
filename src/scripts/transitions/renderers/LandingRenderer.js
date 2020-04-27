import DefaultRenderer from './DefaultRenderer';
import { LandingAnimation, menu } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class LandingRenderer extends DefaultRenderer {
  onEnter() {
    menu.addScrollbar();
  }

  onEnterCompleted() {
    const landing = new LandingAnimation();
    landing.load();
  }

  onLeave() {
    super.onLeave();
    menu.removeScrollbar();
  }
}
