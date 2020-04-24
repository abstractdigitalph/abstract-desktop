import { gsap } from 'gsap';

export default class MenuAnimation {
  constructor() {
    /* -- Query HTML Nodes -- */
    this.hamburgerNode = document.querySelector('.hamburger');
    this.topNode = this.hamburgerNode.querySelector('.hamburger__bar--top');
    this.middleNode = this.hamburgerNode.querySelector(
      '.hamburger__bar--middle',
    );
    this.bottomNode = this.hamburgerNode.querySelector(
      '.hamburger__bar--bottom',
    );
    this.navNode = document.querySelector('.mainNav');
    this.dribbbleNode = document.querySelector('.overlay__dribbble');
    this.contactNode = document.querySelector('.contact');
    this.contactTriggerNode = document.querySelectorAll('.contact__trigger');
    /* -- Create Timelines -- */
    // Timeline to animate hamburger. Turning it to or from an x
    this.hamburgerTimeline = gsap
      .timeline({
        paused: true,
        defaults: { duration: 0.15, ease: 'power2.out' },
      })
      .to(this.topNode, { y: 8 })
      .to(this.bottomNode, { y: -8 }, '<')
      .set(this.topNode, { width: 24 })
      .set(this.bottomNode, { width: 24 })
      .to(this.topNode, { rotate: 45 })
      .to(this.middleNode, { rotate: 45 }, '<')
      .to(this.bottomNode, { rotate: -45 }, '<')
      .set({}, {}, 0.5);

    // Removes the dribbble logo from the left sidebar. Workaround as z-indexing
    // the dribbble logo to cover it up with the various overlays will not work
    this.removeDribbleTimeline = gsap
      .timeline({ paused: true })
      .to(this.dribbbleNode, { opacity: 0, ease: 'power1.out', duration: 0.2 })
      .set({}, {}, 0.5);

    // Animate opening and closing the whole menu
    this.menuTimeline = gsap
      .timeline({
        paused: true,
        defaults: { duration: 0.5, ease: 'power2.in' },
      })
      .fromTo(
        this.navNode,
        { clipPath: 'circle(0 at 4rem 50%)' },
        { clipPath: 'circle(110vw at 4rem 50%)' },
      );

    // Moves the contact panel
    this.contactTimeline = gsap
      .timeline({
        paused: true,
        defaults: { ease: 'power2.out' },
      })
      .from(this.contactNode, { xPercent: -100, duration: 0.5, delay: 0.5 });

    // Anonymous function to call to prevent default
    this.preventDefault = (e) => {
      e.preventDefault();
    };
  }

  // Closes the respective timeline
  close(timeline) {
    timeline.reverse();
    this.removeDribbleTimeline.reverse();
    this.hamburgerTimeline.reverse();
    this.hamburgerNode.dataset.active = 'false';

    // Remove focused element
    document.activeElement.blur();

    // Allow scrolling again
    window.removeEventListener('wheel', this.preventDefault);
    window.removeEventListener('touchmove', this.preventDefault);
    window.removeEventListener('keydown', this.preventDefault);
  }

  // Opens the respective timeline
  open(timeline, type, otherTimeline) {
    if (otherTimeline) {
      timeline.play();
      otherTimeline.reverse();
    } else {
      this.hamburgerTimeline.play();
      this.removeDribbleTimeline.play();
      timeline.play();
    }
    this.hamburgerNode.dataset.active = type;

    // Remove focused element
    document.activeElement.blur();

    // Disable scrolling
    // TODO Disable certain keydown events only. do not disable everything
    window.addEventListener('wheel', this.preventDefault);
    window.addEventListener('touchmove', this.preventDefault);
    window.addEventListener('keydown', this.preventDefault);
  }

  // Animates the various parts depending on the
  menuAnimation() {
    const { active } = this.hamburgerNode.dataset;
    switch (active) {
      case 'menu':
        this.close(this.menuTimeline);
        break;
      case 'contact':
        this.close(this.contactTimeline);
        break;
      case 'false':
      default:
        this.open(this.menuTimeline, 'menu');
        break;
    }
  }

  load() {
    this.contactTriggerNode.forEach((element) => {
      if (element.dataset.fromMenu) {
        element.addEventListener('click', () => this.open(this.contactTimeline, 'contact', this.menuTimeline));
      } else {
        element.addEventListener('click', () => this.open(this.contactTimeline, 'contact'));
      }
    });

    this.hamburgerNode.addEventListener('click', () => this.menuAnimation());
  }

  leave() {
    const { active } = this.hamburgerNode.dataset;
    if (typeof active !== 'undefined' && active !== 'false') {
      this.menuAnimation();
    }
  }
}
