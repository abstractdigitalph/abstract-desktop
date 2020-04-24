import Highway from '@dogstudio/highway';
import {
  ProcessRenderer,
  ScrollRenderer,
  LandingRenderer,
} from './renderers/index';
import { Fade } from './transitions';

// eslint-disable-next-line
const road = new Highway.Core({
  transitions: {
    default: Fade,
  },
  renderers: {
    process: ProcessRenderer,
    scroll: ScrollRenderer,
    landing: LandingRenderer,
  },
});
