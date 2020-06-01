import DefaultRenderer from './DefaultRenderer';
import { smoothScroll } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class ScrollRenderer extends DefaultRenderer {
  onLeave() {
    smoothScroll.leave();
  }

  onLeaveCompleted() {
    super.onLeaveCompleted();
  }
}
