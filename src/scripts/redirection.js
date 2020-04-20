import MobileDetect from 'mobile-detect';

const md = new MobileDetect(window.navigator.userAgent, 767);
if (md.mobile()) {
  window.location.replace('https://m.abstract.ph');
}
