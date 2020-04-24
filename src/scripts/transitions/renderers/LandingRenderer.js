import DefaultRenderer from './DefaultRenderer';
import { LandingAnimation } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class LandingRenderer extends DefaultRenderer {
  onEnterCompleted() {
    const landing = new LandingAnimation();
    landing.load();
  }
}
