import ScrollRenderer from './ScrollRenderer';
import { onLoad } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class AboutRenderer extends ScrollRenderer {
  onEnterCompleted() {
    onLoad.about();
  }
}
