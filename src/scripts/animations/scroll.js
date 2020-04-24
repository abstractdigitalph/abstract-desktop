import { gsap } from 'gsap';
import { ScrollScene } from 'scrollscene';

export default class ScrollAnimations {
  constructor() {
    this.shapesNode = document.querySelector('.shapes');
    this.parallaxNodes = document.querySelectorAll('.parallax');
    this.revealNodes = document.querySelectorAll('.reveal');
    this.shapesScene = null;
    this.parallaxScene = null;
    this.revealScene = null;
  }

  shapes() {
    const parallaxTimeline = gsap.timeline({ paused: true });
    const triggerNode = document.querySelector('.shapes__trigger');

    if (!triggerNode) {
      throw new Error('Expected a triggerNode to exists. None was found');
    }

    // Properly set the bottom of the parallax element so that when the bottom of the
    // page is reached, the parallax element will still reach, even after the transform.
    // The scrollHeight is used so that the speed of the element will be consistent between
    // the different pages
    const length = triggerNode.scrollHeight / -1.5;
    gsap.set(this.shapesNode, { bottom: length });
    parallaxTimeline.to(this.shapesNode, {
      y: length,
      ease: 'linear',
    });

    const shapesScene = new ScrollScene({
      triggerElement: triggerNode,
      gsap: { timeline: parallaxTimeline },
      duration: triggerNode.scrollHeight,
    });
    return shapesScene;
  }

  parallax() {
    this.parallaxNodes.forEach((item) => {
      const parallaxTimeline = gsap.timeline({ paused: true });
      const layer = item.dataset.layer ? item.dataset.layer * 100 : 100;
      const { direction } = item.dataset;
      if (direction === 'up') {
        parallaxTimeline.from(item, {
          y: layer,
          ease: 'linear',
        });
      } else if (direction === 'down') {
        parallaxTimeline.to(item, {
          y: -layer,
          ease: 'linear',
        });
      } else {
        parallaxTimeline.fromTo(
          item,
          {
            y: layer,
            ease: 'linear',
          },
          {
            y: -layer,
            ease: 'linear',
          },
        );
      }

      const triggerHook = item.dataset.triggerhook
        ? item.dataset.triggerhook
        : 0.75;

      const triggerElement = item.dataset.parent ? item.parentNode : item;

      const scrollScene = new ScrollScene({
        triggerElement,
        gsap: { timeline: parallaxTimeline },
        triggerHook,
        duration: '100%',
      });
      return scrollScene;
    });
  }

  reveal() {
    this.revealNodes.forEach((item) => {
      const revealTimeline = gsap.timeline({ paused: true });
      revealTimeline.from(item, { y: '200px', opacity: 0, ease: 'sine' });

      const triggerElement = item.dataset.self ? item : item.parentNode;
      const triggerHook = item.dataset.self ? 0.75 : 0.5;
      const revealScene = new ScrollScene({
        triggerElement,
        triggerHook,
        gsap: { timeline: revealTimeline },
        scene: {
          reverse: false,
        },
      });
      return revealScene;
    });
  }

  load() {
    this.shapesScene = this.shapesNode && this.shapes();
    this.parallaxScene = this.parallaxNodes && this.parallax();
    this.revealScene = this.revealNodes && this.reveal();
  }
}
