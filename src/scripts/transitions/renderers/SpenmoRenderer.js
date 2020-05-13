import ScrollRenderer from './ScrollRenderer';
import { spenmo } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class SpenmoRenderer extends ScrollRenderer {
  onEnter() {
    spenmo.load();
  }

  onEnterCompleted() {
    spenmo.play();
  }
}
