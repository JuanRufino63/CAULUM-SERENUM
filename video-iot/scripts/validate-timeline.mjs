import assert from 'node:assert/strict';
import {access} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {FPS, SCENES, TOTAL_FRAMES} from '../src/timeline.ts';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const expectedDurations = [339, 428, 425, 477, 610, 425];

assert.equal(FPS, 30, 'O vídeo deve usar 30 FPS');
assert.equal(SCENES.length, 6, 'A linha do tempo deve conter seis cenas');
assert.deepEqual(
  SCENES.map((scene) => scene.durationInFrames),
  expectedDurations,
  'As durações devem acomodar as locuções reproduzidas a 1,1×',
);

let expectedStart = 0;
for (const scene of SCENES) {
  assert.equal(scene.from, expectedStart, `${scene.id} deve começar após a cena anterior`);
  assert.equal(scene.audioPlaybackRate, 1.1, `${scene.id} deve usar locução a 1,1×`);
  await access(path.join(projectRoot, 'public', scene.audio));
  expectedStart += scene.durationInFrames;
}

assert.equal(TOTAL_FRAMES, 2704, 'A composição deve ter 2704 frames');
assert.equal(TOTAL_FRAMES, expectedStart, 'A duração total deve somar todas as cenas');
assert.ok(Math.abs(TOTAL_FRAMES / FPS - 90) < 1, 'A duração deve ficar a menos de 1 s de 90 s');
await access(path.join(projectRoot, 'public', 'gravações', '2026-11-19 19-53-41.mp4'));

console.log(`Linha do tempo válida: ${TOTAL_FRAMES} frames (${(TOTAL_FRAMES / FPS).toFixed(2)} s).`);
