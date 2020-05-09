import ScrollRenderer from './ScrollRenderer';
import { lottie } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class SpenmoRenderer extends ScrollRenderer {
  onEnterCompleted() {
    lottie.spenmo();
  }
}
