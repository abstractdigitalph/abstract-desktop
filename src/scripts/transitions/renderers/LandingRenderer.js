import DefaultRenderer from './DefaultRenderer';
import { landing, menu } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class LandingRenderer extends DefaultRenderer {
  onEnterCompleted() {
    landing.load();
    menu.addScrollbar();
  }

  onLeave() {
    landing.leave();
    menu.removeScrollbar();
  }
}
