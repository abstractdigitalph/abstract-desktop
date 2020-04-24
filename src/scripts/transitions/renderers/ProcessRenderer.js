import ScrollRenderer from './ScrollRenderer';
import { DaysAnimation } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class ProcessRenderer extends ScrollRenderer {
  onEnterCompleted() {
    super.onEnterCompleted();
    const days = new DaysAnimation();
    days.load();
  }
}
