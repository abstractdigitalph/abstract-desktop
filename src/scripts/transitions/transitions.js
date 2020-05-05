import Highway from '@dogstudio/highway';
import { transition } from '../animations';

/* eslint-disable */
export default class Fade extends Highway.Transition {
  in({ from, to, done }) {
    window.scrollTo(0, 0);
    from.remove();
    transition.animateTopClose(done);
  }
  out({ from, done }) {
    transition.animateTopOpen(done);
  }
}
/*
export default class Fade extends Highway.Transition {
  in({ from, to, done }) {
    window.scrollTo(0, 0);
    from.remove();
    gsap.fromTo(
      to,
      { opacity: 0 },
      { opacity: 1, ease: "linear", duration: 0.65, onComplete: done }
    );
  }

  out({ from, done }) {
    gsap.fromTo(
      from,
      { opacity: 1 },
      { opacity: 0, ease: "linear", duration: 0.65, onComplete: done }
    );
  }
}
*/
