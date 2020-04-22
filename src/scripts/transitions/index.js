import Highway from '@dogstudio/highway';
import { ProcessRenderer } from './renderers/index';
import { Fade } from './transitions';

const road = new Highway.Core({
  transitions: {
    default: Fade,
  },
  renderers: {
    process: ProcessRenderer,
  },
});
