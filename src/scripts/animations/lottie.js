import spenmoAnimData from './lottie-files/spenmo.json';

const spenmoData = {
  container: document.querySelector('.lottie__hero--spenmo'),
  renderer: 'svg',
  animationData: spenmoAnimData,
};

const diabData = {
  container: document.querySelector('.lottie__hero--diab'),
  renderer: 'svg',
  animationData: spenmoAnimData,
};

export { spenmoData, diabData };
