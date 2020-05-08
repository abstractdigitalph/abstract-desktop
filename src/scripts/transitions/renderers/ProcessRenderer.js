import ScrollRenderer from './ScrollRenderer';
import { days, lottie } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class ProcessRenderer extends ScrollRenderer {
  onEnter() {
    super.onEnter();
    days.load();
  }

  onEnterCompleted() {
    lottie.sprint();
  }

  onLeave() {
    days.leave();
  }
}
