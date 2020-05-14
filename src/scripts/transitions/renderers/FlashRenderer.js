import ScrollRenderer from './ScrollRenderer';
import { flash } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class FlashRenderer extends ScrollRenderer {
  onEnter() {
    super.onEnter();
    flash.load();
  }

  onEnterCompleted() {
    flash.play();
  }
}
