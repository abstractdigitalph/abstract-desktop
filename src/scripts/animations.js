import smoothScroll from './smoothScroll';
import fullPageScroll from './fullPageScroll';

window.addEventListener('DOMContentLoaded', () => {
  const smoothScrollNode = document.querySelector('.smoothScroll__container');
  smoothScroll(smoothScrollNode, 0.05);
  fullPageScroll(smoothScrollNode);
});
