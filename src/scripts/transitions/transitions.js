import Highway from '@dogstudio/highway';
import { gsap } from 'gsap';

/* eslint-disable  */
export class Fade extends Highway.Transition {
  in({ from, to, done }) {
    // Reset Scroll
    window.scrollTo(0, 0);

    // Remove Old View
    from.remove();

    // Animation
    gsap.fromTo(
      to,
      { opacity: 0, duration: 0.5 },
      {
        opacity: 1,
        onComplete: done
      }
    );
  }

  out({ from, done }) {
    // Animation
    gsap.fromTo(
      from,
      { opacity: 1, duration: 0.5 },
      {
        opacity: 0,
        onComplete: done
      }
    );
  }
}
