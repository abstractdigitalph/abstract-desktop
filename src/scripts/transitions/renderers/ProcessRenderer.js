import ScrollRenderer from './ScrollRenderer';
import { days, onLoad } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class ProcessRenderer extends ScrollRenderer {
  onEnter() {
    super.onEnter();
    days.load();
  }

  onEnterCompleted() {
    onLoad.sprint();
  }

  onLeave() {
    days.leave();
  }
}
