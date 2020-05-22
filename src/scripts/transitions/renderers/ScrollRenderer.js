import DefaultRenderer from './DefaultRenderer';
import { smoothScroll } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class ScrollRenderer extends DefaultRenderer {
  onEnterCompleted() {
    smoothScroll.load(document.querySelector('.smoothScroll__container'));
  }

  onLeaveCompleted() {
    super.onLeaveCompleted();
    smoothScroll.leave();
  }
}
