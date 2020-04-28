import Highway from '@dogstudio/highway';
import { gsap } from 'gsap';

/* eslint-disable */
export default class Fade extends Highway.Transition {
  in({ from, to, done }) {
    window.scrollTo(0, 0);
    from.remove();
    gsap.fromTo(
      to,
      { opacity: 0 },
      { opacity: 1, ease: "power0.in", duration: 1, onComplete: done }
    );
  }

  out({ from, done }) {
    gsap.fromTo(
      from,
      { opacity: 1 },
      { opacity: 0, ease: "power0.in", duration: 1, onComplete: done }
    );
  }
}
