import ScrollRenderer from './ScrollRenderer';
import { WorkAnimation, onLoad } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class WorkRenderer extends ScrollRenderer {
  onEnter() {
    const work = new WorkAnimation();
    work.load();
  }

  onEnterCompleted() {
    super.onEnterCompleted();
    onLoad.portfolio();
  }
}
