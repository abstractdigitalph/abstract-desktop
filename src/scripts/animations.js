import smoothScroll from './smoothScroll';

window.addEventListener('DOMContentLoaded', () => {
  const currentValues = {
    scrollY: 0,
    target: document.querySelector('.smoothScroll__container'),
  };
  smoothScroll(currentValues, 0.05);
});
