import ScrollRenderer from './ScrollRenderer';
import { lottie } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class DiabRenderer extends ScrollRenderer {
  onEnterCompleted() {
    lottie.diab();
  }
}
