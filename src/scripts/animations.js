import { gsap } from 'gsap';
import { ScrollScene } from 'scrollscene';
import fullpage from 'fullpage.js';

const parallax = () => {
  const parallaxTimeline = gsap.timeline({ paused: true });
  const parallaxNode = document.querySelector('.animate__parallax');
  const triggerNode = document.querySelector('.animate__parallax--trigger');

  // Properly set the bottom of the parallax element so that when the bottom of the
  // page is reached, the parallax element will still reach, even after the transform.
  // The scrollHeight is used so that the speed of the element will be consistent between
  // the different pages
  const length = triggerNode.scrollHeight / -1.5;
  gsap.set(parallaxNode, { bottom: length });
  parallaxTimeline.to(parallaxNode, {
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
};

const show = () => {
  const showNodes = document.querySelectorAll('.animate__show');

  showNodes.forEach((item) => {
    const showTimeline = gsap.timeline({ paused: true });
    const layer = item.dataset.layer ? item.dataset.layer * 100 : 100;
    const { direction } = item.dataset;
    if (direction === 'up') {
      showTimeline.from(item, {
        y: layer,
        ease: 'linear',
      });
    } else if (direction === 'down') {
      showTimeline.to(item, {
        y: -layer,
        ease: 'linear',
      });
    } else {
      showTimeline.fromTo(
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
      gsap: { timeline: showTimeline },
      triggerHook,
      duration: '100%',
    });
  });
};

const reveal = () => {
  const revealNodes = document.querySelectorAll('.animate__reveal');

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

const loadAnimations = () => {
  const fullpageNode = document.querySelector('.animate__fullpage');

  // eslint-disable-next-line
  const fullpageInstance = new fullpage(fullpageNode, {
    licenseKey: 'test',
    verticalCentered: false,
    scrollBar: true,
    scrollingSpeed: 1500,
  });

  parallax();
  show();
  reveal();
};

// Global Animations
document.addEventListener('DOMContentLoaded', () => {
  loadAnimations();
});
