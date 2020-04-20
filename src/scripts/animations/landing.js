import { gsap } from 'gsap';
// import debounce from 'lodash/debounce';
import { vhToPx } from './helpers';

const fullpageNode = document.querySelector('.fullpage');

// Run All necessary functions if fullpage element is present
if (fullpageNode) {
  // Query all of the nodes that will be animated. This is done at the start so that
  // the query will only be done once.
  const body = document.documentElement;
  const shapesNode = document.querySelector('.shapes--landing');
  const scrollbarNode = document.querySelector('.overlay__active');
  const revealNodes = [...fullpageNode.children].map((element) => element.querySelectorAll('.reveal--landing'));
  const pageNumberLeftNode = document.querySelector(
    '.overlay__pageNumber--left',
  );
  const pageNumberMiddleNode = document.querySelector(
    '.overlay__pageNumber--middle',
  );
  const pageNumberRightNode = document.querySelector(
    '.overlay__pageNumber--right',
  );

  const height = body.clientHeight;
  let currentSlide = 0;
  let timeline = null;

  // Store different layers. These will be used in setting the the
  // amount of travel they will do per scroll
  const layer = [50, -100, -250, -400, -650, -1750];

  // Store the layering of the different projects
  const spenmoDirection = [
    'spenmo5',
    'spenmo1',
    'spenmo2',
    'spenmo4',
    'spenmo3',
  ];
  const tightropeDirection = [
    'tightrope5',
    'tightrope1',
    'tightrope2',
    'tightrope4',
    'tightrope3',
  ];
  const diabDirection = ['diab3', 'diab1', 'diab4', 'diab5', 'diab2'];

  // Set global default ease and default duration for the parallax effects
  const defaultEase = 'power2.inOut';
  const defaultDuration = 1.5;

  /**
   * Animates each text element that will be revealed as it's containing slide is
   * animated into
   * @param {Number} to - The index of the slide that is being animated to
   */
  const revealAnimation = (to) => {
    if (revealNodes[to].length !== 0) {
      gsap.from(revealNodes[to], {
        y: 200,
        duration: 0.75,
        delay: 1,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }
  };

  /**
   * Animates the scrollbar and the numbers that indicate the current slide
   * @param {Number} from - The index of the slide that is being animated from
   * @param {Number} to - The index of the slide that is being animated to
   */
  const scrollbarAnimation = (from, to) => {
    gsap
      .timeline()
      .to(
        scrollbarNode,
        {
          y: vhToPx(4 * to),
          ease: defaultEase,
          duration: defaultDuration,
        },
        '<',
      )
      // Animates the last numbers of the sidebar
      .to(
        pageNumberRightNode,
        {
          y: -17 * to,
          ease: defaultEase,
          duration: defaultDuration,
        },
        '<',
      );

    // Moves the first and second characters so that FIN will be shown as the slide
    // number
    if (from === 7) {
      gsap
        .timeline()
        .to(
          pageNumberLeftNode,
          {
            y: 0,
            ease: defaultEase,
            duration: defaultDuration,
          },
          '<',
        )
        .to(
          pageNumberMiddleNode,
          {
            y: 0,
            ease: defaultEase,
            duration: defaultDuration,
          },
          '<',
        );
    } else if (to === 7) {
      gsap
        .timeline()
        .to(
          pageNumberLeftNode,
          {
            y: -17,
            ease: defaultEase,
            duration: defaultDuration,
          },
          '<',
        )
        .to(
          pageNumberMiddleNode,
          {
            y: -17,
            ease: defaultEase,
            duration: defaultDuration,
          },
          '<',
        );
    }
  };

  const shapeAnimation = (to) => {
    gsap.to(shapesNode, {
      y: layer[5] * to,
      ease: defaultEase,
      duration: defaultDuration,
    });
  };

  const imageAnimation = (nameArray, to, isGoingDown) => {
    // Animation type is changed depending if the current animation
    // is going in to the slide or out of the slide
    if (to) {
      if (isGoingDown) {
        nameArray.forEach((name, index) => {
          gsap.set(`.projects__image--${name}`, {
            y: 0,
          });
          gsap.from(`.projects__image--${name}`, {
            y: -layer[index],
            ease: defaultEase,
            duration: defaultDuration,
          });
        });
      } else {
        nameArray.forEach((name) => {
          gsap.to(`.projects__image--${name}`, {
            y: 0,
            ease: defaultEase,
            duration: defaultDuration,
          });
        });
      }
    } else if (isGoingDown) {
      nameArray.forEach((name, index) => {
        gsap.set(`.projects__image--${name}`, {
          y: 0,
        });
        gsap.to(`.projects__image--${name}`, {
          y: layer[index],
          ease: defaultEase,
          duration: defaultDuration,
        });
      });
    } else {
      nameArray.forEach((name, index) => {
        gsap.set(`.projects__image--${name}`, {
          y: 0,
        });
        gsap.to(`.projects__image--${name}`, {
          y: -layer[index],
          ease: defaultEase,
          duration: defaultDuration,
        });
      });
    }
  };

  const parallaxAnimation = (from, to) => {
    // Adding specific animations per slide transition. With the index serving
    // as the slide that is going into. e.g. case 1 is the transition from 0 to 1 or
    // from 2 to 1
    console.log(from, to);
    const down = from - to < 0;

    switch (from) {
      case 0:
        gsap.to('.hero__holder', {
          y: layer[2],
          ease: defaultEase,
          duration: defaultDuration,
        });
        break;
      case 2:
        imageAnimation(spenmoDirection, false, down);
        break;
      case 3:
        imageAnimation(tightropeDirection, false, down);
        break;
      case 4:
        imageAnimation(diabDirection, false, down);
        break;
      default:
        break;
    }

    switch (to) {
      case 2:
        imageAnimation(spenmoDirection, true, down);
        break;
      case 3:
        imageAnimation(tightropeDirection, true, down);
        break;
      case 4:
        imageAnimation(diabDirection, true, down);
        break;

      default:
        break;
    }
  };

  const changeSlide = (from, to) => {
    const slideTimeline = gsap.timeline().to(fullpageNode, {
      y: -height * to,
      ease: defaultEase,
      duration: defaultDuration,
    });
    parallaxAnimation(from, to);
    scrollbarAnimation(from, to);
    shapeAnimation(to);
    revealAnimation(to);
    timeline = slideTimeline;
  };

  // Gets the direction of the user wants, depending on the event type
  const getDirection = (type, event) => {
    switch (type) {
      case 'wheel':
        if (event.deltaY > 0) {
          return 'down';
        }
        return 'up';

      case 'keydown':
        switch (event.code) {
          case 'KeyJ':
          case 'ArrowDown':
          case 'PageDown':
            return 'down';

          case 'KeyK':
          case 'ArrowUp':
          case 'PageUp':
            return 'up';

          case 'Home':
            return 'home';

          case 'End':
            return 'end';

          default:
            return 'null';
        }

      default:
        throw new Error(
          `Expected one of event types: wheel, keydown. Got ${event} instead.`,
        );
    }
  };

  const fullpageScroll = (type, event) => {
    if (timeline && timeline.isActive()) {
      return;
    }

    switch (getDirection(type, event)) {
      case 'down':
        if (currentSlide < fullpageNode.children.length - 1) {
          changeSlide(currentSlide, (currentSlide += 1));
        }
        break;
      case 'up':
        if (currentSlide > 0) {
          changeSlide(currentSlide, (currentSlide -= 1));
        }
        break;
      case 'home':
        changeSlide(currentSlide, (currentSlide = 0));
        break;
      case 'end':
        changeSlide(
          currentSlide,
          (currentSlide = fullpageNode.children.length - 1),
        );
        break;
      default:
        throw new Error('Expected one of directions: up, down, home, end.');
    }
  };

  const startLandingAnimation = () => {
    gsap.set(shapesNode, {
      bottom: layer[5] * (fullpageNode.children.length - 1),
    });
    fullpageNode.addEventListener('wheel', (event) => fullpageScroll('wheel', event));
    document.addEventListener('keydown', (event) => fullpageScroll('keydown', event));
    // window.addEventListener('resize', debounce(fullpageResize, 200));
  };

  document.addEventListener('DOMContentLoaded', startLandingAnimation);
}
