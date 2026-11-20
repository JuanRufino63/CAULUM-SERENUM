export const FPS = 30;

export type SceneDefinition = {
  readonly id: 'intro' | 'problem' | 'iot' | 'app' | 'wokwi' | 'closing';
  readonly from: number;
  readonly durationInFrames: number;
  readonly audio: string;
  readonly audioPlaybackRate: number;
};

export const SCENES: readonly SceneDefinition[] = [
  {id: 'intro', from: 0, durationInFrames: 339, audio: 'audios/01.ogg', audioPlaybackRate: 1.1},
  {id: 'problem', from: 339, durationInFrames: 428, audio: 'audios/02.ogg', audioPlaybackRate: 1.1},
  {id: 'iot', from: 767, durationInFrames: 425, audio: 'audios/03.ogg', audioPlaybackRate: 1.1},
  {id: 'app', from: 1192, durationInFrames: 477, audio: 'audios/04.ogg', audioPlaybackRate: 1.1},
  {id: 'wokwi', from: 1669, durationInFrames: 610, audio: 'audios/05.ogg', audioPlaybackRate: 1.1},
  {id: 'closing', from: 2279, durationInFrames: 425, audio: 'audios/06.ogg', audioPlaybackRate: 1.1},
] as const;

export const TOTAL_FRAMES = 2704;
