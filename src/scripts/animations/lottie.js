import lottie from 'lottie-web';
import spenmoAnimData from './lottie-files/spenmo.json';
import diabAnimData from './lottie-files/diab.json';
import tightropeAnimData from './lottie-files/tightrope.json';
import flashAnimData from './lottie-files/flash.json';
import portfolioAnimData from './lottie-files/portfolio.json';
import sprintAnimData from './lottie-files/sprint.json';
import aboutAnimData from './lottie-files/about.json';

/* eslint-disable class-methods-use-this */
export default class LottieAnimations {
  spenmo() {
    lottie.loadAnimation({
      container: document.querySelector('.lottie__hero--spenmo'),
      renderer: 'svg',
      animationData: spenmoAnimData,
      autoplay: true,
    });
  }

  diab() {
    lottie.loadAnimation({
      container: document.querySelector('.lottie__hero--diab'),
      renderer: 'svg',
      animationData: diabAnimData,
      autoplay: true,
    });
  }

  tightrope() {
    lottie.loadAnimation({
      container: document.querySelector('.lottie__hero--tightrope'),
      renderer: 'svg',
      animationData: tightropeAnimData,
      autoplay: true,
    });
  }

  flash() {
    lottie.loadAnimation({
      container: document.querySelector('.lottie__hero--flash'),
      renderer: 'svg',
      animationData: flashAnimData,
      autoplay: true,
    });
  }

  portfolio() {
    lottie.loadAnimation({
      container: document.querySelector('.lottie__hero--portfolio'),
      renderer: 'svg',
      animationData: portfolioAnimData,
      autoplay: true,
    });
  }

  sprint() {
    lottie.loadAnimation({
      container: document.querySelector('.lottie__hero--sprint'),
      renderer: 'svg',
      animationData: sprintAnimData,
      autoplay: true,
    });
  }

  about() {
    lottie.loadAnimation({
      container: document.querySelector('.lottie__hero--about'),
      renderer: 'svg',
      animationData: aboutAnimData,
      autoplay: true,
    });
  }
}
