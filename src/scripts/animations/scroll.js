import { gsap } from 'gsap';
import { ScrollScene } from 'scrollscene';

const shapes = () => {
  // Query shape node
  const shapesNode = document.querySelector('.shapes');

  // If node exists, run functions for animation
  if (shapesNode) {
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
    gsap.set(shapesNode, { bottom: length });
    parallaxTimeline.to(shapesNode, {
      y: length,
      ease: 'linear',
    });

    // eslint-disable-next-line
    const scrollScene = new ScrollScene({
      triggerElement: triggerNode,
      gsap: { timeline: parallaxTimeline },
      duration: triggerNode.scrollHeight,
      /*
    controller: {
      addIndicators: true,
    },
    */
    });
  }
};

const parallax = () => {
  const parallaxNodes = document.querySelectorAll('.parallax');

  parallaxNodes.forEach((item) => {
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

    // eslint-disable-next-line
    const scrollScene = new ScrollScene({
      triggerElement,
      gsap: { timeline: parallaxTimeline },
      triggerHook,
      duration: '100%',
    });
  });
};

const reveal = () => {
  const revealNodes = document.querySelectorAll('.reveal');

  revealNodes.forEach((item) => {
    const revealTimeline = gsap.timeline({ paused: true });
    revealTimeline.from(item, { y: '200px', opacity: 0, ease: 'sine' });

    const triggerElement = item.dataset.self ? item : item.parentNode;
    const triggerHook = item.dataset.self ? 0.75 : 0.5;
    // eslint-disable-next-line
    const revealScene = new ScrollScene({
      triggerElement,
      triggerHook,
      gsap: { timeline: revealTimeline },
      scene: {
        reverse: false,
      },
    });
  });
};

const scrollAnimations = () => {
  shapes();
  parallax();
  reveal();
};

export default scrollAnimations;
