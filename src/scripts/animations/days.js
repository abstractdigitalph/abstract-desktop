import { gsap } from 'gsap';

const indicatorNode = document.querySelector('.days__indicator');
const stepNode = document.querySelectorAll('.days__step');
const sliderNode = document.querySelector('.days__slider');

let currentStep = 0;
const moveIndicator = (movementFactor, location) => {
  if (location !== currentStep) {
    gsap.to(indicatorNode, {
      x: movementFactor * location,
      ease: 'power2.out',
      duration: 0.5,
    });

    currentStep = location;
    document.activeElement.blur();
  }
};
const animateSlider = () => {
  const stepWidth = stepNode[0].clientWidth;
  const movementFactor = (sliderNode.clientWidth - stepWidth * 4) / 3 + stepWidth;

  stepNode.forEach((element) => {
    element.addEventListener('click', () => moveIndicator(movementFactor, element.dataset.step));
  });
};
document.addEventListener('DOMContentLoaded', animateSlider);
