import { gsap } from 'gsap';
import debounce from 'lodash/debounce';

// Query elements
const fullpageNode = document.querySelector('.fullpage');
const body = document.documentElement;
const shapesNode = document.querySelector('.shapes--landing');

// Store different layers. These will be used in setting the the
// amount of travel they will do per scroll
const layer = [50, -100, -250, -400, -550, -1500];
// Set global default ease and default duration for the parallax effects
const defaultEase = 'power2.inOut';
const defaultDuration = 1.5;

const addImageParallax = (nameArray, reversed) => {
  const imageParallaxTimeline = gsap.timeline();
  if (reversed) {
    nameArray.forEach((name, index) => {
      imageParallaxTimeline.from(
        `.projects__image--${name}`,
        {
          y: -layer[index],
          ease: defaultEase,
          duration: defaultDuration,
        },
        '<',
      );
    });
  } else {
    nameArray.forEach((name, index) => {
      imageParallaxTimeline.to(
        `.projects__image--${name}`,
        {
          y: layer[index],
          ease: defaultEase,
          duration: defaultDuration,
        },
        '<',
      );
    });
  }
  return imageParallaxTimeline;
};

const addParallax = (index) => {
  const parallaxTimeline = gsap.timeline();
  parallaxTimeline.to(shapesNode, {
    y: layer[5] * index,
    ease: defaultEase,
    duration: defaultDuration,
  });

  switch (index) {
    case 1:
      parallaxTimeline.to(
        '.hero__holder',
        {
          y: layer[0],
          ease: defaultEase,
          duration: defaultDuration,
        },
        '<',
      );
      break;
    case 2:
      parallaxTimeline.add(
        addImageParallax(
          ['spenmo5', 'spenmo1', 'spenmo2', 'spenmo4', 'spenmo3'],
          true,
        ),
        '<',
      );
      break;
    case 3:
      parallaxTimeline.add(
        addImageParallax(
          ['spenmo5', 'spenmo1', 'spenmo2', 'spenmo4', 'spenmo3'],
          false,
        ),
        '<',
      );
      break;

    default:
      break;
  }

  return parallaxTimeline;
};
const createTimeline = (mainNode, height) => {
  const mainTimeline = gsap.timeline({ paused: true });
  for (let i = 1; i < mainNode.children.length; i += 1) {
    mainTimeline.addLabel(`${i}`);
    mainTimeline.to(mainNode, {
      y: -height * i,
      ease: defaultEase,
      duration: defaultDuration,
    });
    mainTimeline.add(addParallax(i), `${i}`);
  }
  return mainTimeline;
};

// Store relevant data for fullpage
const fullpageData = {
  node: fullpageNode,
  height: body.clientHeight,
  currentSlide: 0,
  timeline: createTimeline(fullpageNode, body.clientHeight),
  tween: null,
};

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
        `Expected one of event types: wheel, got ${event} instead.`,
      );
  }
};

const fullpageScroll = (type, event) => {
  const { node, timeline } = fullpageData;

  // Check if tween is created. If it is created, check if the tween
  // is active. Do not run the animation if the tween is active
  if (fullpageData.tween && fullpageData.tween.isActive()) {
    return;
  }

  // Get  direction of the event
  const direction = getDirection(type, event);

  // Check direction
  if (
    direction === 'down'
    && fullpageData.currentSlide < node.children.length - 1
  ) {
    // Wheel is going down, check if the currentSlide is not the
    // last slide. If it is not, animate moving to the next slide
    fullpageData.currentSlide += 1;
    fullpageData.tween = timeline.tweenTo(timeline.nextLabel());
  } else if (direction === 'up' && fullpageData.currentSlide > 0) {
    // If it is going up, check if the current slide is not the first slide. If
    // it is not the first slide, animate moving to the previous slide
    fullpageData.currentSlide -= 1;
    fullpageData.tween = timeline.tweenTo(timeline.previousLabel());
  } else if (direction === 'home') {
    // If going back to home, set current slide and tween to correct label
    fullpageData.currentSlide = 0;
    fullpageData.tween = timeline.tweenTo('0', {
      ease: defaultEase,
      duration: 2,
    });
  } else if (direction === 'end') {
    // If going to the end, set current slide and tween to correct label
    fullpageData.currentSlide = node.children.length - 1;
    fullpageData.tween = timeline.tweenTo(`${node.children.length}`, {
      ease: defaultEase,
      duration: 2,
    });
  }
};

const fullpageResize = () => {
  if (fullpageData.height !== body.clientHeight) {
    // Update object height
    fullpageData.height = body.clientHeight;
    // Update timeline based on height
    fullpageData.timeline = createTimeline(fullpageNode, body.clientHeight);
    // Tween to correct location
    fullpageData.tween = fullpageData.timeline.tweenTo(
      `${fullpageData.currentSlide}`,
    );
  }
};

const startLandingAnimation = () => {
  gsap.set(shapesNode, {
    bottom: layer[5] * (fullpageNode.children.length - 1),
  });
  window.addEventListener('wheel', (event) => fullpageScroll('wheel', event));
  window.addEventListener('keydown', (event) => fullpageScroll('keydown', event));
  window.addEventListener('resize', debounce(fullpageResize, 200));
};

document.addEventListener('DOMContentLoaded', startLandingAnimation());
