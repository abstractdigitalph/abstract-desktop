import { gsap } from 'gsap';
import debounce from 'lodash/debounce';

export default class DaysAnimation {
  constructor() {
    this.indicatorNode = document.querySelector('.days__indicator');
    this.stepNodes = document.querySelectorAll('.days__step');
    this.sliderNode = document.querySelector('.days__slider');
    this.daysNode = document.querySelector('.days__holder');

    this.currentTimeline = null;
    this.currentStep = null;
    this.day = [...this.daysNode.children].map((element) => ({
      element,
      sides: element.querySelectorAll('.day__sides'),
      reveal: element.querySelectorAll('.reveal--day'),
    }));
    this.width = this.stepNodes[0].clientWidth;
  }

  moveIndicator(movementFactor, location) {
    gsap.to(this.indicatorNode, {
      x: movementFactor * location,
      ease: 'power2.out',
      duration: 0.5,
    });
  }

  moveDay(nextStep) {
    // Makes sure to end the current timeline if it is still playing
    if (this.currentTimeline && this.currentTimeline.isActive()) {
      this.currentTimeline.progress(1).kill();
    }

    this.currentTimeline = gsap
      .timeline({ defaults: { ease: 'power1.inOut' } })
      // Make next element visible
      .set(this.day[nextStep].element, { visibility: 'visible' })
      // Crossfade the two images
      .to(this.day[this.currentStep].element, { opacity: 0 })
      .to(this.day[nextStep].element, { opacity: 1 }, '<')
      // Fade the current info out
      .to(this.day[this.currentStep].reveal, { opacity: 0 }, '<')
      // Prepare next info
      .set(this.day[nextStep].reveal, { opacity: 1 })
      // Reveal info
      .from(this.day[nextStep].reveal, {
        y: 200,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
      })
      // set z-index and visiblities for next transition
      .set(this.day[nextStep].element, { zIndex: 2 })
      .set(
        this.day[this.currentStep].element,
        { visibility: 'hidden', zIndex: 1 },
        '<',
      );
  }

  moveSlide(nextStep) {
    const stepWidth = this.stepNodes[0].clientWidth;
    const movementFactor = (this.sliderNode.clientWidth - stepWidth * 4) / 3 + stepWidth;

    if (nextStep !== this.currentStep) {
      this.moveIndicator(movementFactor, nextStep);
      this.moveDay(nextStep);
      this.currentStep = nextStep;
      document.activeElement.blur();
    }
  }

  handleResize() {
    console.log('here');
    if (this.width !== this.stepNodes[0].clientWidth) {
      this.width = this.stepNodes[0].clientWidth;
      gsap.set(this.indicatorNode, { width: this.stepNodes[0].clientWidth });
    }
  }

  load() {
    // Reset current step on load
    this.currentStep = 0;

    // Set initial styles
    for (let i = 1; i < this.day.length; i += 1) {
      gsap.set(this.day[i].element, {
        visibility: 'hidden',
        opacity: 0,
        zIndex: 1,
      });
      gsap.set(this.day[i].reveal, { opacity: 0 });
    }
    gsap.set(this.day[0].element, { visibility: 'visible', zIndex: 2 });
    gsap.set(this.indicatorNode, { width: this.stepNodes[0].clientWidth });

    // Add event listeners
    window.addEventListener(
      'resize',
      debounce(() => this.handleResize(), 200),
    );
    this.stepNodes.forEach((element) => {
      element.addEventListener('click', () => this.moveSlide(element.dataset.step));
    });
  }
}
