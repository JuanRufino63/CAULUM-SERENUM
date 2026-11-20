import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relativePath) => readFile(path.join(root, relativePath), 'utf8');
const sceneFiles = [
  'src/scenes/IntroScene.tsx',
  'src/scenes/ProblemScene.tsx',
  'src/scenes/IotScene.tsx',
  'src/scenes/AppScene.tsx',
  'src/scenes/WokwiScene.tsx',
  'src/scenes/ClosingScene.tsx',
];

const sources = await Promise.all(sceneFiles.map(read));
const allScenes = sources.join('\n');
const composition = await read('src/Composition.tsx');
const video = await read('src/Video.tsx');

assert.match(composition, /id="CaulumSerenumIoT"/);
assert.match(composition, /width=\{1920\}/);
assert.match(composition, /height=\{1080\}/);
assert.match(composition, /fps=\{FPS\}/);
assert.match(composition, /durationInFrames=\{TOTAL_FRAMES\}/);

for (const scene of ['IntroScene', 'ProblemScene', 'IotScene', 'AppScene', 'WokwiScene', 'ClosingScene']) {
  assert.match(video, new RegExp(`<${scene}`), `Video.tsx deve incluir ${scene}`);
}

for (const audio of ['01.ogg', '02.ogg', '03.ogg', '04.ogg', '05.ogg', '06.ogg']) {
  assert.match(video, new RegExp(audio.replace('.', '\\.')), `A composição deve usar ${audio}`);
}

assert.match(allScenes, /Interface conceitual — dados simulados/);
assert.match(allScenes, /Limiares demonstrativos/);
assert.match(allScenes, /Demonstração real — Simulação Wokwi/);
assert.match(allScenes, /NORMAL/);
assert.match(allScenes, /ATENÇÃO/);
assert.match(allScenes, /CRÍTICO/);
assert.doesNotMatch(allScenes, /API|ngrok|tempo real do ESP32/i);

console.log('Estrutura das seis cenas e textos de conformidade validados.');
