import { gsap } from 'gsap';
// import debounce from 'lodash/debounce';
import { vhToPx } from './helpers';

const fullpageNode = document.querySelector('.fullpage');

// Query all of the nodes that will be animated. This is done at the start so that
// the query will only be done once.
const body = document.documentElement;
const shapesNode = document.querySelector('.shapes--landing');
const scrollbarNode = document.querySelector('.overlay__active');
const revealNodes = [...fullpageNode.children].map((element) => element.querySelectorAll('.reveal--landing'));
const pageNumberLeftNode = document.querySelector('.overlay__pageNumber--left');
const pageNumberMiddleNode = document.querySelector(
  '.overlay__pageNumber--middle',
);
const pageNumberRightNode = document.querySelector(
  '.overlay__pageNumber--right',
);
const hitboxesNode = document.querySelector('.overlay__hitboxes');
const hitboxNodes = document.querySelectorAll('.overlay__hitbox');

// Store the layering of the different projects
const spenmoDirection = ['spenmo5', 'spenmo1', 'spenmo2', 'spenmo4', 'spenmo3'];
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

// Other necessary variables
const height = body.clientHeight;
let currentSlide = 0;
let timeline = null;
let currentScrollbar = 0;
const layer = [50, -100, -250, -400, -650, -1750]; // Stores the amount of travel per layer

/**
 * Animates each text element that will be revealed as it's containing slide is
 * animated into
 * @param {number} to - The index of the slide that is being animated to
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
 * @param {number} to - The index of the slide that is being animated to
 */
const scrollbarAnimation = (to, isHover) => {
  if (currentScrollbar === to) {
    return;
  }

  const duration = isHover ? 0.75 : defaultDuration;

  gsap
    .timeline()
    .to(
      scrollbarNode,
      {
        y: vhToPx(4 * to),
        ease: defaultEase,
        duration,
      },
      '<',
    )
    // Animates the last numbers of the sidebar
    .to(
      pageNumberRightNode,
      {
        y: -17 * to,
        ease: defaultEase,
        duration,
      },
      '<',
    );

  // Moves the first and second characters so that FIN will be shown as the slide
  // number
  if (currentScrollbar === 7) {
    gsap
      .timeline()
      .to(
        pageNumberLeftNode,
        {
          y: 0,
          ease: defaultEase,
          duration,
        },
        '<',
      )
      .to(
        pageNumberMiddleNode,
        {
          y: 0,
          ease: defaultEase,
          duration,
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
          duration,
        },
        '<',
      )
      .to(
        pageNumberMiddleNode,
        {
          y: -17,
          ease: defaultEase,
          duration,
        },
        '<',
      );
  }

  currentScrollbar = to;
};

/**
 * Animates the shapes at the edge of the browser to move in a parallax effect
 * @param {number} to - The index of the slide that is being animated to
 */
const shapeAnimation = (to) => {
  gsap.to(shapesNode, {
    y: layer[5] * to,
    ease: defaultEase,
    duration: defaultDuration,
  });
};

/**
 * Animates the individual images found in the projects part
 * @param {string[]} nameArray - The names of the images to be animated, arranged from
 *                               the bottom layer, to the top
 * @param {number} to - The index of the slide that is being animated to
 * @param {boolean} isGoingDown - Indicates the direction of the current animation
 */
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
      nameArray.forEach((name, index) => {
        gsap.set(`.projects__image--${name}`, {
          y: layer[index],
        });
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

/**
 * Calls the correct animations when leaving or entering specific slides
 * @param {number} from - The index of the slide that is being animated from
 * @param {number} to - The index of the slide that is being animated to
 */
const parallaxAnimation = (from, to) => {
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
    case 0:
      gsap.to('.hero__holder', {
        y: 0,
        ease: defaultEase,
        duration: defaultDuration,
      });
      break;
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

/**
 * Runs the whole animation when moving from one slide to another
 * @param {number} from - The index of the slide that is being animated from
 * @param {number} to - The index of the slide that is being animated to
 */
const changeSlide = (from, to) => {
  if (timeline && timeline.isActive()) {
    return;
  }

  const slideTimeline = gsap.timeline().to(fullpageNode, {
    y: -height * to,
    ease: defaultEase,
    duration: defaultDuration,
  });
  parallaxAnimation(from, to);
  scrollbarAnimation(to);
  shapeAnimation(to);
  revealAnimation(to);
  timeline = slideTimeline;
};

/**
 * Returns the direction based on the events given
 * @param {number} from - The index of the slide that is being animated from
 * @param {number} to - The index of the slide that is being animated to
 * @returns {string} - One of 'up', 'down', 'home', 'end'
 */
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

/**
 * Called whenever an event that indicates a scroll is fired
 * @param {string} type - The type of the event that called the function
 * @param {Object} event - The event object that was returned from the listener
 */
const fullpageScroll = (type, event) => {
  // Built-in throttle function that does not run when an critical animation is still running
  if (timeline && timeline.isActive()) {
    return;
  }

  switch (getDirection(type, event)) {
    case 'down':
      // Does not allow moving down if the next slide does not exist
      if (currentSlide < fullpageNode.children.length - 1) {
        changeSlide(currentSlide, (currentSlide += 1));
      }
      break;
    case 'up':
      // Does not allow moving up if the current slide is at 0
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

const hitboxClick = (to) => {
  if (currentSlide !== to) {
    changeSlide(currentSlide, (currentSlide = to));
  }
};
const hitboxEnter = (to) => {
  scrollbarAnimation(to);
};
const hitboxLeave = () => {
  scrollbarAnimation(currentSlide);
};

/**
 * Starts all the event listeners and sets necessary gsap styles
 */
const landingAnimation = () => {
  gsap.set(shapesNode, {
    bottom: layer[5] * (fullpageNode.children.length - 1),
  });
  fullpageNode.addEventListener('wheel', (event) => fullpageScroll('wheel', event));
  document.addEventListener('keydown', (event) => fullpageScroll('keydown', event));
  hitboxNodes.forEach((node, index) => {
    node.addEventListener('click', () => hitboxClick(index));
    node.addEventListener('mouseenter', () => hitboxEnter(index));
  });
  hitboxesNode.addEventListener('mouseleave', hitboxLeave);
  // window.addEventListener('resize', debounce(fullpageResize, 200));
};

export default landingAnimation;
