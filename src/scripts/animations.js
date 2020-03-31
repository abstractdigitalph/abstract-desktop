import { gsap } from 'gsap';
import { ScrollScene } from 'scrollscene';

const parallax = () => {
  const parallaxTimeline = gsap.timeline({ paused: true });
  const parallaxNode = document.querySelector('.parallax');
  const triggerNode = document.querySelector('.parallax__trigger');

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

// Global Animations
document.addEventListener('DOMContentLoaded', () => parallax());
