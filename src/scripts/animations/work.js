import { gsap } from 'gsap';

export default class WorkAnimation {
  constructor() {
    this.workNodes = document.querySelectorAll('.work');
  }

  hideWork(selectedElement) {
    this.workNodes.forEach((element) => {
      if (element !== selectedElement) {
        gsap.to(element, { opacity: 0.5, duration: 0.5, ease: 'power2.out' });
      } else {
        gsap.to(element, { scale: 1.05, duration: 0.5, ease: 'power2.out' });
      }
    });
  }

  showWork() {
    this.workNodes.forEach((element) => {
      gsap.to(element, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
      });
    });
  }

  load() {
    this.workNodes.forEach((element) => {
      element.addEventListener('mouseenter', (event) => this.hideWork(event.target));
      element.addEventListener('mouseleave', () => this.showWork());
    });
  }
}
