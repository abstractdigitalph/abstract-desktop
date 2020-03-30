import { gsap } from 'gsap';
import { ScrollScene } from 'scrollscene';

const parallaxTimeline = gsap.timeline({ paused: true });
const parallaxNode = document.querySelector('.parallax');
const triggerNode = document.querySelector('.parallax__trigger');

parallaxTimeline.to(parallaxNode, { y: '-3000px', ease: 'linear' });

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line
  const scrollScene = new ScrollScene({
    triggerElement: triggerNode,
    gsap: { timeline: parallaxTimeline },
    duration: triggerNode.scrollHeight,
  });
});
