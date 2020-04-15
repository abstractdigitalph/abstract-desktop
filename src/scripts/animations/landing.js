import { gsap } from 'gsap';
import debounce from 'lodash/debounce';
import { vhToPx } from './helpers';

// Query fullpage element
const fullpageNode = document.querySelector('.fullpage');

// Run All necessary functions if fullpage element is present
if (fullpageNode) {
  // Continue query
  //
  const body = document.documentElement;
  const shapesNode = document.querySelector('.shapes--landing');
  const scrollbarNode = document.querySelector('.overlay__active');
  const pageNumberLeftNode = document.querySelector(
    '.overlay__pageNumber--left',
  );
  const pageNumberMiddleNode = document.querySelector(
    '.overlay__pageNumber--middle',
  );
  const pageNumberRightNode = document.querySelector(
    '.overlay__pageNumber--right',
  );

  // Store different layers. These will be used in setting the the
  // amount of travel they will do per scroll
  const layer = [50, -100, -250, -400, -650, -1750];

  // Set global default ease and default duration for the parallax effects
  const defaultEase = 'power2.inOut';
  const defaultDuration = 1.5;
  // Adds the parallax effect to the individual images in the landing page
  // The array is sorted from the bottom layer going to the top
  const addImageParallax = (nameArray, reversed) => {
    const imageParallaxTimeline = gsap.timeline();
    // Animation type is changed depending if the current animation
    // is going in to the slide or out of the slide
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

  const animateReveal = (currentSlide) => {
    const elementList = fullpageNode.children[currentSlide].querySelectorAll(
      '.reveal--landing',
    );
    gsap.from(elementList, {
      y: 200,
      duration: 0.75,
      delay: 1,
      stagger: 0.1,
      ease: 'power2.out',
    });
  };

  // Creates the parallax effect for each slides
  const addParallax = (index) => {
    const parallaxTimeline = gsap.timeline();

    // Adding animations that will run on all slide transitions
    parallaxTimeline
      // Animates the shapes on the outside
      .to(shapesNode, {
        y: layer[5] * index,
        ease: defaultEase,
        duration: defaultDuration,
      })
      // Animates the main sidebar
      .to(
        scrollbarNode,
        {
          y: vhToPx(4 * index),
          ease: defaultEase,
          duration: defaultDuration,
        },
        '<',
      )
      // Animates the last numbers of the sidebarj
      .to(
        pageNumberRightNode,
        {
          y: -17 * index,
          ease: defaultEase,
          duration: defaultDuration,
        },
        '<',
      );

    // Adding specific animations per slide transition. With the index serving
    // as the slide that is going into. e.g. case 1 is the transition from 0 to 1 or
    // from 2 to 1
    switch (index) {
      case 1:
        parallaxTimeline.to(
          '.hero__holder',
          {
            y: layer[2],
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
        parallaxTimeline.add(
          addImageParallax(
            [
              'tightrope5',
              'tightrope1',
              'tightrope2',
              'tightrope4',
              'tightrope3',
            ],
            true,
          ),
          '<',
        );
        break;
      case 4:
        parallaxTimeline.add(
          addImageParallax(
            [
              'tightrope5',
              'tightrope1',
              'tightrope2',
              'tightrope4',
              'tightrope3',
            ],
            false,
          ),
          '<',
        );
        parallaxTimeline.add(
          addImageParallax(['diab3', 'diab1', 'diab4', 'diab5', 'diab2'], true),
          '<',
        );
        break;

      case 5:
        parallaxTimeline.add(
          addImageParallax(
            ['diab3', 'diab1', 'diab4', 'diab5', 'diab2'],
            false,
          ),
          '<',
        );
        break;

      case 7:
        // Moves the first and second characters so that FIN will be shown as the slide
        // number
        parallaxTimeline
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
        break;

      default:
        break;
    }

    return parallaxTimeline;
  };

  // Creates the main timeline for the landing page
  const createTimeline = (mainNode, height) => {
    const mainTimeline = gsap.timeline({ paused: true });
    for (let i = 1; i < mainNode.children.length; i += 1) {
      mainTimeline.addLabel(`${i}`);
      // Creates the animation for the slide transition.
      mainTimeline.to(mainNode, {
        y: -height * i,
        ease: defaultEase,
        duration: defaultDuration,
      });
      // Add specific animation for each slide transition
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
      animateReveal(fullpageData.currentSlide);
    } else if (direction === 'up' && fullpageData.currentSlide > 0) {
      // If it is going up, check if the current slide is not the first slide. If
      // it is not the first slide, animate moving to the previous slide
      fullpageData.currentSlide -= 1;
      fullpageData.tween = timeline.tweenTo(timeline.previousLabel());
    }
  };

  const fullpageResize = () => {
    if (fullpageData.height !== body.clientHeight) {
      // Update object height
      fullpageData.height = body.clientHeight;
      fullpageData.timeline.kill();
      // Update timeline based on height
      const newTimeline = createTimeline(fullpageNode, body.clientHeight);
      fullpageData.tween = newTimeline.seek(`${fullpageData.currentSlide + 1}`);
      fullpageData.timeline = newTimeline;
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

  document.addEventListener('DOMContentLoaded', startLandingAnimation);
}
