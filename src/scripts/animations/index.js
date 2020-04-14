import { parallax, show, reveal } from './scroll';
import './landing';

const loadAnimations = () => {
  parallax();
  show();
  reveal();
};

// Global Animations
document.addEventListener('DOMContentLoaded', () => {
  loadAnimations();
});
