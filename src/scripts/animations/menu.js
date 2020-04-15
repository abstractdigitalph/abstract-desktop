import { gsap } from 'gsap';

// Query html nodes
const hamburgerNode = document.querySelector('.hamburger');
const topNode = hamburgerNode.querySelector('.hamburger__bar--top');
const middleNode = hamburgerNode.querySelector('.hamburger__bar--middle');
const bottomNode = hamburgerNode.querySelector('.hamburger__bar--bottom');
const navNode = document.querySelector('.mainNav');
const dribbbleNode = document.querySelector('.overlay__dribbble');
const contactNode = document.querySelector('.contact');
const contactTriggerNode = document.querySelectorAll('.contact__trigger');

// Timeline to animate hamburger. Turning it to or from an x
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
  .set({}, {}, 1.2);

// Removes the dribbble logo from the left sidebar. Workaround as z-indexing
// the dribbble logo to cover it up with the various overlays will not work
const removeDribbleTimeline = gsap
  .timeline({ paused: true })
  .to(dribbbleNode, { opacity: 0, ease: 'power1.out', duration: 0.2 })
  .set({}, {}, 1.2);

// Animate opening and closing the timeline
const menuTimeline = gsap
  .timeline({
    paused: true,
    defaults: { duration: 1, ease: 'bounce' },
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

const contactTimeline = gsap
  .timeline({
    paused: true,
    defaults: { ease: 'power3.out' },
  })
  .from(contactNode, { xPercent: -100, duration: 1 });

// Closes the respective timeline
const close = (timeline) => {
  timeline.reverse();
  removeDribbleTimeline.reverse();
  hamburgerTimeline.reverse();
  hamburgerNode.dataset.active = 'false';
};

// Opens the respective timeline
const open = (timeline, type) => {
  hamburgerTimeline.play();
  removeDribbleTimeline.play();
  timeline.play();
  hamburgerNode.dataset.active = type;
};

// Animates the various parts depending on the
const menuAnimation = () => {
  const { active } = hamburgerNode.dataset;
  switch (active) {
    case 'menu':
      close(menuTimeline);
      break;
    case 'contact':
      close(contactTimeline);
      break;
    case 'closed':
    default:
      open(menuTimeline, 'menu');
      break;
  }
};

contactTriggerNode.forEach((element) => {
  element.addEventListener('click', () => open(contactTimeline, 'contact'));
});
hamburgerNode.addEventListener('click', menuAnimation);
