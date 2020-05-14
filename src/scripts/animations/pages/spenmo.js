import lottie from 'lottie-web';
import { gsap } from 'gsap';
import spenmoAnimData from '../lottie-files/spenmo.json';

export default class SpenmoOnEnterAnimation {
  constructor() {
    this.h1Node = null;
    this.labelNode = null;
    this.lineNode = null;
    this.image1Node = null;
    this.image2Node = null;
    this.image3Node = null;

    this.lottieNode = null;
    this.lottieAnimation = null;

    this.backEase = 'back.inOut(3)';
  }

  querySelectors() {
    this.h1Node = document.querySelector('.projects__h1');
    this.labelNode = document.querySelector('.projects__label');
    this.lineNode = document.querySelector('.projects__line');
    this.image1Node = document.querySelector('.projects__image--spenmo1');
    this.image2Node = document.querySelector('.projects__image--spenmo2');
    this.image3Node = document.querySelector('.projects__image--spenmo3');

    this.lottieNode = document.querySelector('.lottie__hero--spenmo');
    this.lottieAnimation = lottie.loadAnimation({
      container: this.lottieNode,
      renderer: 'svg',
      autoplay: false,
      animationData: spenmoAnimData,
    });
  }

  setup() {
    gsap.set(this.image1Node, { scale: 3, opacity: 0 });
    gsap.set(this.image2Node, { scale: 3, opacity: 0 });
    gsap.set(this.image3Node, { scale: 3, opacity: 0 });
    gsap.set(this.h1Node, { opacity: 0 });
    gsap.set(this.labelNode, { opacity: 0 });
    gsap.set(this.lineNode, { clipPath: 'inset(0 -2px 100% -2px)' });
    this.lottieAnimation.addEventListener('complete', () => this.animateImages());
  }

  animateImages() {
    gsap
      .timeline({
        defaults: {
          duration: 0.3,
          ease: 'power2.out',
        },
      })
      .to(this.h1Node, { opacity: 1 })
      .to(this.labelNode, { opacity: 1 }, '<.15')
      .to(this.image2Node, {
        scale: 1,
        opacity: 0.5,
        y: -200,
      })
      .to(this.image2Node, {
        ease: this.backEase,
        y: 0,
        opacity: 1,
      })
      .to(
        this.image1Node,
        {
          scale: 1,
          opacity: 0.5,
          x: -400,
          y: -200,
        },
        '<',
      )
      .to(this.image1Node, {
        ease: this.backEase,
        x: 0,
        y: 0,
        opacity: 1,
      })
      .to(
        this.image3Node,
        {
          scale: 1,
          opacity: 0.5,
          x: 400,
          y: -200,
        },
        '<',
      )
      .to(this.image3Node, {
        ease: this.backEase,
        x: 0,
        y: 0,
        opacity: 1,
      })
      .to(this.lineNode, {
        clipPath: 'inset(0 -2px 0% -2px)',
      });
  }

  load() {
    this.querySelectors();
    this.setup();
  }

  play() {
    setTimeout(() => this.lottieAnimation.play(), 250);
  }
}
