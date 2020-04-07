export default (target) => {
  // Get all children except first child. The first child
  // contains the parallax effect
  const viewportHeight = target.children[1].clientHeight;
  const currentViewing = 2;
  window.scrollTo(0, viewportHeight * currentViewing);
};
