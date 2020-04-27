import Highway from '@dogstudio/highway';
import { transition } from '../animations/index';

/* eslint-disable */
export class SwipeUp extends Highway.Transition {
  in({ from, to, done }) {
    // Reset Scroll
    transition.animateTopClose(done);
    from.remove();
    window.scrollTo(0, 0);

    // Remove Old View
  }

  out({ from, done }) {
    // Animate
    transition.animateTopOpen(done);
  }
}
