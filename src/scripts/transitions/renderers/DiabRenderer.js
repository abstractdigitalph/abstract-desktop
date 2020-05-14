import ScrollRenderer from './ScrollRenderer';
import { diab } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class DiabRenderer extends ScrollRenderer {
  onEnter() {
    super.onEnter();
    diab.load();
  }

  onEnterCompleted() {
    diab.play();
  }
}
