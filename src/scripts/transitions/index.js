import Highway from '@dogstudio/highway';
import { Fade } from './transitions';

const road = new Highway.Core({
  transitions: {
    default: Fade,
  },
});
