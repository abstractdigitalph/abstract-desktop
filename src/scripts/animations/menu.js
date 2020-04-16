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
const calendarNode = document.querySelector('.calendar');
const calendarTriggerNode = document.querySelectorAll('.calendar__trigger');

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
  .set({}, {}, 0.5);

// Removes the dribbble logo from the left sidebar. Workaround as z-indexing
// the dribbble logo to cover it up with the various overlays will not work
const removeDribbleTimeline = gsap
  .timeline({ paused: true })
  .to(dribbbleNode, { opacity: 0, ease: 'power1.out', duration: 0.2 })
  .set({}, {}, 0.5);

// Animate opening and closing the timeline
const menuTimeline = gsap
  .timeline({
    paused: true,
    defaults: { duration: 0.5, ease: 'power2.in' },
  })
  .fromTo(
    navNode,
    { clipPath: 'circle(0 at 4rem 50%)' },
    { clipPath: 'circle(110vw at 4rem 50%)' },
  );

const contactTimeline = gsap
  .timeline({
    paused: true,
    defaults: { ease: 'power3.out' },
  })
  .fromTo(
    contactNode,
    { display: 'none', opacity: 0, duration: 0.5 },
    { display: 'flex', opacity: 1 },
  );

const calendarTimeline = gsap
  .timeline({
    paused: true,
    defaults: { ease: 'power3.out' },
  })
  .fromTo(
    calendarNode,
    { display: 'none', opacity: 0, duration: 0.5 },
    { display: 'flex', opacity: 1 },
  );

// Closes the respective timeline
const close = (timeline) => {
  timeline.reverse();
  removeDribbleTimeline.reverse();
  hamburgerTimeline.reverse();
  hamburgerNode.dataset.active = 'false';
};

// Opens the respective timeline
const open = (timeline, type, otherTimeline) => {
  if (otherTimeline) {
    timeline.play();
    otherTimeline.reverse();
  } else {
    hamburgerTimeline.play();
    removeDribbleTimeline.play();
    timeline.play();
  }
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
    case 'calendar':
      close(calendarTimeline);
      break;
    case 'closed':
    default:
      open(menuTimeline, 'menu');
      break;
  }
};

contactTriggerNode.forEach((element) => {
  if (element.dataset.fromMenu) {
    element.addEventListener('click', () => open(contactTimeline, 'contact', menuTimeline));
  } else {
    element.addEventListener('click', () => open(contactTimeline, 'contact'));
  }
});

calendarTriggerNode.forEach((element) => {
  if (element.dataset.fromContact) {
    element.addEventListener('click', () => open(calendarTimeline, 'calendar', contactTimeline));
  } else {
    element.addEventListener('click', () => open(calendarTimeline, 'calendar'));
  }
});

hamburgerNode.addEventListener('click', menuAnimation);
