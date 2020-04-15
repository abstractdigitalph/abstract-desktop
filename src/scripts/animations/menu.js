import { gsap } from 'gsap';

// Query html nodes
const hamburgerNode = document.querySelector('.hamburger');
const topNode = hamburgerNode.querySelector('.hamburger__bar--top');
const middleNode = hamburgerNode.querySelector('.hamburger__bar--middle');
const bottomNode = hamburgerNode.querySelector('.hamburger__bar--bottom');

const hamburgerTimeline = gsap.timeline({
  paused: true,
  defaults: { duration: 0.15, ease: 'power2.out' },
});

hamburgerTimeline
  .to(topNode, { y: 8 })
  .to(bottomNode, { y: -8 }, '<')
  .set(topNode, { width: 24 })
  .set(bottomNode, { width: 24 })
  .to(topNode, { rotate: 45 })
  .to(middleNode, { rotate: 45 }, '<')
  .to(bottomNode, { rotate: -45 }, '<');

const startMenuAnimation = () => {
  if (
    !hamburgerNode.dataset.active
    || hamburgerNode.dataset.active === 'false'
  ) {
    hamburgerTimeline.play();
    hamburgerNode.dataset.active = 'true';
  } else {
    hamburgerTimeline.reverse();
    hamburgerNode.dataset.active = 'false';
  }
};
hamburgerNode.addEventListener('click', startMenuAnimation);
