import Highway from '@dogstudio/highway';
import {
  ProcessRenderer,
  ScrollRenderer,
  LandingRenderer,
  WorkRenderer,
  AboutRenderer,
  FlashRenderer,
  SpenmoRenderer,
  DiabRenderer,
  TightropeRenderer,
} from './renderers/index';
import Fade from './transitions';

const road = new Highway.Core({
  transitions: {
    default: Fade,
  },
  renderers: {
    process: ProcessRenderer,
    scroll: ScrollRenderer,
    landing: LandingRenderer,
    work: WorkRenderer,
    about: AboutRenderer,
    flash: FlashRenderer,
    spenmo: SpenmoRenderer,
    diab: DiabRenderer,
    tightrope: TightropeRenderer,
  },
});

const links = document.querySelectorAll('.mainNav__link--main');
// eslint-disable-next-line
road.on("NAVIGATE_IN", ({ to, location }) => {
  for (let i = 0; i < links.length; i += 1) {
    const link = links[i];

    link.classList.remove('mainNav__link--active');

    if (link.href === location.href) {
      link.classList.add('mainNav__link--active');
    }
  }
});
