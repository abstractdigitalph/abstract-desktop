import { gsap } from 'gsap';
import { ScrollScene } from 'scrollscene';

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
  });
};

const show = () => {
  const showNodes = document.querySelectorAll('.animate__show');

  showNodes.forEach((item) => {
    const showTimeline = gsap.timeline({ paused: true });
    const opacity = item.dataset.opacity ? item.dataset.opacity : 0.5;
    console.log(item);
    showTimeline.from(item.children, {
      y: 200,
      opacity,
      stagger: 0.05,
      duration: 1,
    });

    const triggerHook = item.dataset.triggerhook
      ? item.dataset.triggerhook
      : 0.75;

    // eslint-disable-next-line
    const scrollScene = new ScrollScene({
      triggerElement: item,
      gsap: { timeline: showTimeline, reverse: false },
      triggerHook,
      reverse: false,
    });

    console.log(scrollScene);
  });
};

// Global Animations
document.addEventListener('DOMContentLoaded', () => {
  parallax();
  show();
});
