import ScrollRenderer from './ScrollRenderer';
import { WorkAnimation, lottie } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class WorkRenderer extends ScrollRenderer {
  onEnter() {
    super.onEnter();
    const work = new WorkAnimation();
    work.load();
  }

  onEnterCompleted() {
    lottie.portfolio();
  }
}
