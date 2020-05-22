export default class SmoothScroll {
  constructor() {
    this.ease = 0.1;
    this.maxOffset = 500;
    this.endTreshold = 0.05;
    this.requestId = null;
    this.maxDepth = 20;
    this.viewHeight = 0;
    this.halfViewHeight = 0;
    this.maxDistance = 0;
    this.currentScroll = 0;
    this.resizeRequest = true;
    this.scrollRequest = false;
    this.scrollItems = [];
    this.lastTime = -1;
    this.maxElapsedMS = 100;
    this.targetFPMS = 0.075;
    this.scrollY = 0;
    this.target = null;

    this.boundResize = () => this.onResize();
    this.boundOnScroll = () => this.onScroll();
  }

  update(time) {
    // Setting the deltaTime based on current
    // If time was not passed, get the current time
    const currentTime = time !== undefined ? time : performance.now();
    // Get the elapsed milleseconds between the current time and last known time.
    // If the time difference is greater than the max allowable elapsed time difference
    // the max time difference is used
    const timeDiff = currentTime - this.lastTime;
    const elapsedMS = timeDiff > this.maxElapsedMS ? this.maxElapsedMS : timeDiff;
    const dt = 1 - (1 - this.ease) ** (elapsedMS * this.targetFPMS);

    const resized = this.resizeRequest;
    if (resized) {
      const height = this.target.clientHeight;
      document.body.style.height = `${height}px`;
      this.viewHeight = window.innerHeight;
      this.halfViewHeight = this.viewHeight / 2;
      this.maxDistance = this.viewHeight * 2;
      this.resizeRequest = false;
    }

    // Get current y position
    this.scrollY = window.pageYOffset;
    this.currentScroll += (this.scrollY - this.currentScroll) * dt;
    if (
      Math.abs(this.scrollY - this.currentScroll) < this.endThreshold
      || this.resized
    ) {
      this.currentScroll = this.scrollY;
      this.scrollRequest = false;
    }
    const scrollOrigin = this.currentScroll + this.halfViewHeight;
    this.target.style.transform = `translate3d(0, -${this.currentScroll}px,0)`;

    for (let i = 0; i < this.scrollItems.length; i += 1) {
      const item = this.scrollItems[i];
      const distance = scrollOrigin - item.top;
      const offsetRatio = distance / this.maxDistance;
      item.endOffset = Math.round(
        this.maxOffset * item.depthRatio * offsetRatio,
      );
      if (Math.abs(item.endOffset - item.currentOffset) < this.endThreshold) {
        item.currentOffset = item.endOffset;
      } else {
        item.currentOffset += (item.endOffset - item.currentOffset) * dt * 5;
      }
      item.target.style.transform = `translate3d(0px,${item.currentOffset
        * -1}px,0px)`;
    }
    this.lastTime = currentTime;
    this.requestId = this.scrollRequest
      ? requestAnimationFrame((nextTime) => this.update(nextTime))
      : null;
  }

  onResize() {
    // Indicate that a resize was done
    this.resizeRequest = true;

    // If no animation frames are playing
    if (!this.requestId) {
      // Store current time as last known time
      this.lastTime = performance.now();
      // Request animation frame
      this.requestId = requestAnimationFrame((nextTime) => this.update(nextTime));
    }
  }

  onScroll() {
    // Indicate that a scroll was done
    this.scrollRequest = true;

    // If no animation frames are playing
    if (!this.requestId) {
      // Store current time as last known time
      this.lastTime = performance.now();
      // Request animation frame
      this.requestId = requestAnimationFrame((nextTime) => this.update(nextTime));
    }
  }

  addItems() {
    this.scrollItems = [];
    const elements = document.querySelectorAll('*[data-depth]');
    for (let i = 0; i < elements.length; i += 1) {
      const element = elements[i];
      const initDepth = element.getAttribute('data-depth');
      const depth = Math.min(
        Math.max(-this.maxDepth, initDepth),
        this.maxDepth,
      );
      const rect = element.getBoundingClientRect();
      const item = {
        target: element,
        depth,
        top: rect.top + window.pageYOffset,
        depthRatio: depth / this.maxDepth,
        currentOffset: 0,
        endOffset: 0,
      };
      this.scrollItems.push(item);
    }
  }

  addEventListeners() {
    window.addEventListener('resize', this.boundResize);
    window.addEventListener('scroll', this.boundOnScroll);
  }

  removeEventListeners() {
    window.removeEventListener('resize', this.boundResize);
    window.removeEventListener('scroll', this.boundOnScroll);
  }

  load(target) {
    this.target = target;
    this.addItems();
    this.addEventListeners();
  }

  leave() {
    this.removeEventListeners();
    this.target = null;
  }
}
