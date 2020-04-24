import DefaultRenderer from './DefaultRenderer';
import { ScrollAnimation } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class ScrollRenderer extends DefaultRenderer {
  onEnterCompleted() {
    const scroll = new ScrollAnimation();
    scroll.load();
  }
}
