import { gsap } from 'gsap';

export default class TransitionAnimation {
  constructor() {
    this.transitionNode = document.querySelector('.transition');
    this.transitionPrimary = this.transitionNode.querySelector(
      '.transition__primary',
    );
    this.transitionSecondary = this.transitionNode.querySelector(
      '.transition__secondary',
    );
    this.transitionMain = this.transitionNode.querySelector(
      '.transition__main',
    );
  }

  animateTopOpen(highwayCallback) {
    console.log('animateTopOpen');
    gsap
      .timeline({
        defaults: {
          ease: 'power2.in',
          duration: 0.75,
        },
        onComplete: highwayCallback,
      })
      .set(this.transitionNode, { display: 'block' })
      .fromTo(this.transitionPrimary, { yPercent: 100 }, { yPercent: 0 })
      .fromTo(
        this.transitionSecondary,
        { yPercent: 100 },
        { yPercent: 0 },
        '<0.05',
      )
      .fromTo(this.transitionMain, { yPercent: 100 }, { yPercent: 0 }, '<0.05');
  }

  animateTopClose(highwayCallback) {
    console.log('animateTopClose');
    gsap
      .timeline({
        defaults: {
          ease: 'power2.in',
          duration: 0.75,
        },
        onComplete: highwayCallback,
      })
      .fromTo(this.transitionMain, { yPercent: 0 }, { yPercent: -100 })
      .fromTo(
        this.transitionSecondary,
        { yPercent: 0 },
        { yPercent: -100 },
        '<0.05',
      )
      .fromTo(
        this.transitionPrimary,
        { yPercent: 0 },
        { yPercent: -100 },
        '<0.05',
      )
      .set(this.transitionNode, {
        display: 'none',
      });
  }
}
