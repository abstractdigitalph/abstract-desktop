import ScrollRenderer from './ScrollRenderer';
import { days, onLoad } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class ProcessRenderer extends ScrollRenderer {
  onEnter() {
    days.load();
  }

  onEnterCompleted() {
    super.onEnterCompleted();
    onLoad.sprint();
  }

  onLeave() {
    super.onLeave();
    days.leave();
  }
}
