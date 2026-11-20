import assert from 'node:assert/strict';
import {readFile, stat} from 'node:fs/promises';
import {Input, ALL_FORMATS, FilePathSource} from 'mediabunny';

const read = (file) => readFile(file, 'utf8');
const [readme, roteiro] = await Promise.all([read('README.md'), read('roteiro.md')]);

assert.match(readme, /npm run render/);
assert.match(readme, /gravações\/2026-11-19 19-53-41\.mp4/);
assert.match(readme, /Interface conceitual/);
assert.match(roteiro, /Cena 1/);
assert.match(roteiro, /Cena 6/);
assert.match(roteiro, /1,1×/);

const output = await stat('video_iot.mp4');
assert.ok(output.size > 1_000_000, 'O MP4 deve conter dados renderizados');

const input = new Input({formats: ALL_FORMATS, source: new FilePathSource('video_iot.mp4')});
const [duration, videoTrack, audioTrack] = await Promise.all([
  input.computeDuration(),
  input.getPrimaryVideoTrack(),
  input.getPrimaryAudioTrack(),
]);

assert.ok(videoTrack, 'O MP4 deve conter vídeo');
assert.ok(audioTrack, 'O MP4 deve conter áudio');
assert.equal(videoTrack.displayWidth, 1920);
assert.equal(videoTrack.displayHeight, 1080);
assert.ok(Math.abs(duration - 90.13) < 0.25, `Duração inesperada: ${duration}`);
input.dispose();

console.log(`Saída válida: 1920×1080, áudio presente, ${duration.toFixed(2)} s, ${(output.size / 1_000_000).toFixed(1)} MB.`);
