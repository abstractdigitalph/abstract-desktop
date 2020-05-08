import lottie from 'lottie-web';
import spenmoAnimData from './lottie-files/spenmo.json';
import diabAnimData from './lottie-files/diab.json';
import tightropeAnimData from './lottie-files/tightrope.json';
import flashAnimData from './lottie-files/flash.json';
import portfolioAnimData from './lottie-files/portfolio.json';
import sprintAnimData from './lottie-files/sprint.json';
import aboutAnimData from './lottie-files/about.json';

export default class LottieAnimations {
  constructor() {
    this.spenmo = {
      container: document.querySelector('.lottie__hero--spenmo'),
      renderer: 'svg',
      animationData: spenmoAnimData,
    };

    this.diab = {
      container: document.querySelector('.lottie__hero--diab'),
      renderer: 'svg',
      animationData: diabAnimData,
    };

    this.tightrope = {
      container: document.querySelector('.lottie__hero--tightrope'),
      renderer: 'svg',
      animationData: tightropeAnimData,
    };

    this.flash = {
      container: document.querySelector('.lottie__hero--flash'),
      renderer: 'svg',
      animationData: flashAnimData,
    };

    this.portfolio = {
      container: document.querySelector('.lottie__hero--portfolio'),
      renderer: 'svg',
      animationData: portfolioAnimData,
    };
    this.sprint = {
      container: document.querySelector('.lottie__hero--sprint'),
      renderer: 'svg',
      animationData: sprintAnimData,
    };
    this.about = {
      container: document.querySelector('.lottie__hero--about'),
      renderer: 'svg',
      animationData: aboutAnimData,
    };
  }

  spenmo() {
    lottie.loadAnimation(this.spenmo);
  }
}
