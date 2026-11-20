import {Composition} from 'remotion';
import {CaulumSerenumVideo} from './Video';
import {FPS, TOTAL_FRAMES} from './timeline';

export const CaulumSerenumComposition: React.FC = () => (
  <Composition
    id="CaulumSerenumIoT"
    component={CaulumSerenumVideo}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={1920}
    height={1080}
  />
);
