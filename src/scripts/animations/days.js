import { gsap } from 'gsap';

const indicatorNode = document.querySelector('.days__indicator');
const stepNode = document.querySelectorAll('.days__step');
const sliderNode = document.querySelector('.days__slider');
const daysNode = document.querySelector('.days__holder');

if (daysNode) {
  let currentTimeline = null;
  let currentStep = null;
  const day = [...daysNode.children].map((element) => ({
    element,
    sides: element.querySelectorAll('.day__sides'),
    reveal: element.querySelectorAll('.reveal--day'),
  }));

  const moveIndicator = (movementFactor, location) => {
    gsap.to(indicatorNode, {
      x: movementFactor * location,
      ease: 'power2.out',
      duration: 0.5,
    });
  };

  const moveDay = (nextStep) => {
    // Makes sure to end the current timeline if it is still playing
    if (currentTimeline && currentTimeline.isActive()) {
      currentTimeline.progress(1).kill();
    }

    currentTimeline = gsap
      .timeline({ defaults: { ease: 'power1.inOut' } })
      // Make next element visible
      .set(day[nextStep].element, { visibility: 'visible' })
      // Crossfade the two images
      .to(day[currentStep].element, { opacity: 0 })
      .to(day[nextStep].element, { opacity: 1 }, '<')
      // Fade the current info out
      .to(day[currentStep].reveal, { opacity: 0 }, '<')
      // Prepare next info
      .set(day[nextStep].reveal, { opacity: 1 })
      // Reveal info
      .from(day[nextStep].reveal, {
        y: 200,
        duration: 0.75,
        stagger: 0.05,
        ease: 'power2.out',
      })
      // set z-index and visiblities for next transition
      .set(day[nextStep].element, { zIndex: 2 })
      .set(day[currentStep].element, { visibility: 'hidden', zIndex: 1 }, '<');
  };

  const moveSlide = (nextStep) => {
    const stepWidth = stepNode[0].clientWidth;
    const movementFactor = (sliderNode.clientWidth - stepWidth * 4) / 3 + stepWidth;

    if (nextStep !== currentStep) {
      moveIndicator(movementFactor, nextStep);
      moveDay(nextStep);
      currentStep = nextStep;
      document.activeElement.blur();
    }
  };

  const animateSlider = () => {
    // Reset current step on load
    currentStep = 0;
    stepNode.forEach((element) => {
      element.addEventListener('click', () => moveSlide(element.dataset.step));
    });

    for (let i = 1; i < day.length; i += 1) {
      gsap.set(day[i].element, {
        visibility: 'hidden',
        opacity: 0,
        zIndex: 1,
      });
      gsap.set(day[i].reveal, { opacity: 0 });
    }
    gsap.set(day[0].element, { visibility: 'visible', zIndex: 2 });
  };
  document.addEventListener('DOMContentLoaded', animateSlider);
}
