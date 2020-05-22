/*
export default class SmoothScroll {
  constructor(currentValues, ease, maxOffset) {
    this.ease = ease !== undefined ? ease : 0.1;
    this.maxOffset = maxOffset !== undefined ? maxOffset : 500;
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
    this.targetFPMS = 0.06;
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

    // Get current y position
    currentValues.scrollY = window.pageYOffset;
    _currentScroll += (currentValues.scrollY - _currentScroll) * dt;
    if (
      Math.abs(currentValues.scrollY - _currentScroll) < _endThreshold
      || resized
    ) {
      _currentScroll = currentValues.scrollY;
      _scrollRequest = false;
    }
    const scrollOrigin = _currentScroll + _halfViewHeight;
    currentValues.target.style.transform = `translate3d(0, -${_currentScroll}px,0)`;

    for (let i = 0; i < _scrollItems.length; i += 1) {
      const item = _scrollItems[i];
      const distance = scrollOrigin - item.top;
      const offsetRatio = distance / _maxDistance;
      item.endOffset = Math.round(_maxOffset * item.depthRatio * offsetRatio);
      if (Math.abs(item.endOffset - item.currentOffset) < _endThreshold) {
        item.currentOffset = item.endOffset;
      } else {
        item.currentOffset += (item.endOffset - item.currentOffset) * dt;
      }
      item.target.style.transform = `translate3d(0px,${item.currentOffset
        * -1}px,0px)`;
    }
    _lastTime = currentTime;
    _requestId = _scrollRequest ? requestAnimationFrame(_update) : null;
  }
}
*/
