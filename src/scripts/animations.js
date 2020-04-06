import { gsap } from 'gsap';

const SmoothScroll = (targetClass) => {
  const { documentElement: html, body } = document;

  // Object to hold information about the current page
  const scroller = {
    target: document.querySelector(targetClass),
    ease: 0.05,
    endY: 0,
    y: 0,
    resizeRequest: 1,
    scrollRequest: 0,
  };

  // Store return value of requestAnimationFrame()
  let requestId = null;

  // Function to update the scroller. Handles if the page is scrolled or resized
  const updateScroller = () => {
    const resized = scroller.resizeRequest;
    if (resized) {
      const height = scroller.target.clientHeight;
      body.style.height = `${height}px`;
      scroller.resizeRequest = 0;
    }

    const scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;

    scroller.endY = scrollY;
    scroller.y += (scrollY - scroller.y) * scroller.ease;

    if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
      scroller.y = scrollY;
      scroller.scrollRequest = 0;
    }

    gsap.set(scroller.target, {
      y: -scroller.y,
    });

    requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
  };

  function onScroll() {
    scroller.scrollRequest += 1;
    if (!requestId) {
      requestId = requestAnimationFrame(updateScroller);
    }
  }

  function onResize() {
    scroller.resizeRequest += 1;
    if (!requestId) {
      requestId = requestAnimationFrame(updateScroller);
    }
  }

  const onLoad = () => {
    updateScroller();
    window.focus();
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll);
  };
  window.addEventListener('load', onLoad);

  return scroller;
};

const scroller = SmoothScroll('.smoothScroll__container');
