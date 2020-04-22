import Highway from '@dogstudio/highway';
import { DaysAnimation } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class ProcessRenderer extends Highway.Renderer {
  onEnterCompleted() {
    const days = new DaysAnimation();
    days.load();
  }
}
