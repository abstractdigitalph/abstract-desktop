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

    this.backEase = 'back.inOut(1.0)';
    this.timeline = null;
  }

  querySelectors() {
    this.h1Node = document.querySelector('.onEnter__h1--spenmo');
    this.labelNode = document.querySelector('.onEnter__label--spenmo');
    this.lineNode = document.querySelector('.onEnter__line--spenmo');
    this.image1Node = document.querySelector('.onEnter__image--spenmo1');
    this.image2Node = document.querySelector('.onEnter__image--spenmo2');
    this.image3Node = document.querySelector('.onEnter__image--spenmo3');

    this.lottieNode = document.querySelector('.lottie__hero--spenmo');
    this.lottieAnimation = lottie.loadAnimation({
      container: this.lottieNode,
      renderer: 'svg',
      autoplay: false,
      animationData: spenmoAnimData,
    });

    this.lottieAnimation.setSpeed(1.5);

    this.timeline = gsap
      .timeline({
        paused: true,
        defaults: {
          duration: 0.4,
          ease: 'power3.out',
        },
      })
      .fromTo(this.h1Node, { opacity: 0, y: -200 }, { opacity: 1, y: 0 })
      .fromTo(
        this.labelNode,
        { opacity: 0, y: -200 },
        { opacity: 1, y: 0 },
        '<.15',
      )
      .fromTo(
        this.image2Node,
        {
          scale: 3,
          opacity: 0,
          y: -200,
        },
        {
          ease: this.backEase,
          y: 0,
          scale: 1,
          opacity: 1,
        },
      )
      .fromTo(
        this.image1Node,
        {
          scale: 3,
          opacity: 0,
          x: -400,
          y: -200,
        },
        {
          ease: this.backEase,
          scale: 1,
          opacity: 1,
          y: 0,
          x: 0,
        },
        '<.25',
      )
      .fromTo(
        this.image3Node,
        {
          scale: 3,
          opacity: 0,
          x: 400,
          y: -200,
        },
        {
          ease: this.backEase,
          scale: 1,
          opacity: 1,
          y: 0,
          x: 0,
          onComplete: () => this.lineLoop.play(),
        },
        '<.25',
      );

    this.lineLoop = gsap
      .timeline({
        paused: true,
        repeat: -1,
        delay: 0.5,
        defaults: {
          duration: 1.5,
          ease: 'power2.out',
        },
      })
      .fromTo(
        this.lineNode,
        { clipPath: 'inset(0 -2px 100%)' },
        {
          clipPath: 'inset(0 -2px 0%)',
        },
      )
      .to(this.lineNode, { clipPath: 'inset(100% -2px 0%)' });
  }

  load() {
    this.querySelectors();
    this.lottieAnimation.addEventListener('complete', () => this.timeline.play());
  }

  play() {
    setTimeout(() => this.lottieAnimation.play(), 250);
  }
}
