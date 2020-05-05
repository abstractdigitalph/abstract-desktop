import DefaultRenderer from './DefaultRenderer';
import { scroll } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class ScrollRenderer extends DefaultRenderer {
  onEnter() {
    scroll.load();
    scroll.loadShapes();
  }

  onLeaveCompleted() {
    super.onLeaveCompleted();
    scroll.leave();
  }
}
