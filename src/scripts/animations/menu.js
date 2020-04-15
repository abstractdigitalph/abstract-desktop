import { gsap } from 'gsap';

// Query html nodes
const hamburgerNode = document.querySelector('.hamburger');
const topNode = hamburgerNode.querySelector('.hamburger__bar--top');
const middleNode = hamburgerNode.querySelector('.hamburger__bar--middle');
const bottomNode = hamburgerNode.querySelector('.hamburger__bar--bottom');
const navNode = document.querySelector('.mainNav');
const dribbbleNode = document.querySelector('.overlay__dribbble');

const hamburgerTimeline = gsap
  .timeline({
    paused: true,
    defaults: { duration: 0.15, ease: 'power2.out' },
  })
  .to(topNode, { y: 8 })
  .to(bottomNode, { y: -8 }, '<')
  .set(topNode, { width: 24 })
  .set(bottomNode, { width: 24 })
  .to(topNode, { rotate: 45 })
  .to(middleNode, { rotate: 45 }, '<')
  .to(bottomNode, { rotate: -45 }, '<')
  .set({}, {}, 1.7);

const removeDribbleTimeline = gsap
  .timeline({ paused: true })
  .to(dribbbleNode, { opacity: 0, ease: 'power1.out', duration: 0.2 })
  .set({}, {}, 1.7);

const menuTimeline = gsap
  .timeline({
    paused: true,
    defaults: { duration: 1.5, ease: 'bounce' },
  })
  .fromTo(
    navNode,
    { clipPath: 'circle(0 at 4rem 50%)' },
    { clipPath: 'circle(100vw at 4rem 50%)' },
  )
  .to(navNode, {
    clipPath: 'circle(110vw at 4rem 50%)',
    ease: 'power1.out',
    duration: 0.2,
  });

const closeMenu = () => {
  menuTimeline.reverse();
  removeDribbleTimeline.reverse();
  hamburgerTimeline.reverse();
  hamburgerNode.dataset.active = 'false';
};

const openMenu = () => {
  hamburgerTimeline.play();
  removeDribbleTimeline.play();
  menuTimeline.play();
  hamburgerNode.dataset.active = 'menu';
};
const startMenuAnimation = () => {
  const { active } = hamburgerNode.dataset;
  switch (active) {
    case 'menu':
      closeMenu();
      break;
    case 'closed':
    default:
      openMenu();
      break;
  }
};
hamburgerNode.addEventListener('click', startMenuAnimation);
