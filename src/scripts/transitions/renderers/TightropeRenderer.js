import ScrollRenderer from './ScrollRenderer';
import { tightrope } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class TightropeRenderer extends ScrollRenderer {
  onEnter() {
    super.onEnter();
    tightrope.load();
  }

  onEnterCompleted() {
    tightrope.play();
  }
}
