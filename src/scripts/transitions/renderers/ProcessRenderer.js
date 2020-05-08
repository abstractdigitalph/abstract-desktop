import ScrollRenderer from './ScrollRenderer';
import { days } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class ProcessRenderer extends ScrollRenderer {
  onEnter() {
    super.onEnter();
    days.load();
  }

  onLeave() {
    days.leave();
  }
}
