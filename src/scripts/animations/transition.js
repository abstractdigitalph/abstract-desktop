import { gsap } from 'gsap';

export default class TransitionAnimation {
  constructor() {
    this.transitionNode = document.querySelector('.transition');
    this.transitionMain = this.transitionNode.querySelector(
      '.transition__main',
    );
  }

  animateTopOpen(highwayCallback) {
    gsap
      .timeline({
        defaults: {
          ease: 'power2.in',
          duration: 0.5,
        },
        onComplete: highwayCallback,
      })
      .set(this.transitionNode, { display: 'block' })
      .fromTo(this.transitionMain, { yPercent: 100 }, { yPercent: 0 });
  }

  animateTopClose(highwayCallback) {
    gsap
      .timeline({
        defaults: {
          ease: 'power2.in',
          duration: 0.5,
        },
        onComplete: highwayCallback,
      })
      .fromTo(this.transitionMain, { yPercent: 0 }, { yPercent: -100 })
      .set(this.transitionNode, {
        display: 'none',
      });
  }
}
