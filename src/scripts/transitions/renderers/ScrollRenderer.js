import DefaultRenderer from './DefaultRenderer';
import { SmoothScrollAnimation } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class ScrollRenderer extends DefaultRenderer {
  onEnter() {
    const smoothScroll = new SmoothScrollAnimation();
    smoothScroll.load(
      document.querySelector('.smoothScroll__container'),
      document.querySelector('.smoothScroll__height'),
    );
  }

  onLeaveCompleted() {
    super.onLeaveCompleted();
  }
}
