import {Audio} from '@remotion/media';
import {AbsoluteFill, Sequence, staticFile} from 'remotion';
import {AppScene} from './scenes/AppScene';
import {ClosingScene} from './scenes/ClosingScene';
import {IntroScene} from './scenes/IntroScene';
import {IotScene} from './scenes/IotScene';
import {ProblemScene} from './scenes/ProblemScene';
import {WokwiScene} from './scenes/WokwiScene';
import {SCENES} from './timeline';

export const CaulumSerenumVideo: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#060815'}}>
    <Sequence name="Introdução" from={SCENES[0].from} durationInFrames={SCENES[0].durationInFrames} premountFor={60}><IntroScene /><Audio src={staticFile('audios/01.ogg')} playbackRate={1.1} /></Sequence>
    <Sequence name="O problema" from={SCENES[1].from} durationInFrames={SCENES[1].durationInFrames} premountFor={60}><ProblemScene /><Audio src={staticFile('audios/02.ogg')} playbackRate={1.1} /></Sequence>
    <Sequence name="Funcionamento IoT" from={SCENES[2].from} durationInFrames={SCENES[2].durationInFrames} premountFor={60}><IotScene /><Audio src={staticFile('audios/03.ogg')} playbackRate={1.1} /></Sequence>
    <Sequence name="Interface conceitual" from={SCENES[3].from} durationInFrames={SCENES[3].durationInFrames} premountFor={60}><AppScene /><Audio src={staticFile('audios/04.ogg')} playbackRate={1.1} /></Sequence>
    <Sequence name="Demonstração Wokwi" from={SCENES[4].from} durationInFrames={SCENES[4].durationInFrames} premountFor={60}><WokwiScene /><Audio src={staticFile('audios/05.ogg')} playbackRate={1.1} /></Sequence>
    <Sequence name="Encerramento" from={SCENES[5].from} durationInFrames={SCENES[5].durationInFrames} premountFor={60}><ClosingScene /><Audio src={staticFile('audios/06.ogg')} playbackRate={1.1} /></Sequence>
  </AbsoluteFill>
);
