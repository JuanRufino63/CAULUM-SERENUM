# Vídeo IoT — CAULUM SERENUM

Vídeo demonstrativo em motion graphics para a Global Solution FIAP 2026.2. A composição é gerada por código com Remotion e exportada em MP4 Full HD, 30 FPS, com aproximadamente 90 segundos.

## Entregáveis

- `video_iot.mp4` — render final com vídeo e áudio.
- `src/` — composição, componentes e seis cenas independentes.
- `roteiro.md` — roteiro visual e temporal.
- `public/audios/01.ogg` a `06.ogg` — locuções em ordem.
- `public/gravações/2026-11-19 19-53-41.mp4` — captura real do Wokwi.
- `scripts/` — validações da linha do tempo, conteúdo e saída.

## Requisitos

- Node.js 20.19 ou superior.
- npm.
- Aproximadamente 1 GB livre para o navegador de renderização, cache e MP4.

O Remotion baixa automaticamente o Chrome Headless Shell na primeira renderização.

## Instalação

No PowerShell, dentro de `video-iot/`:

```powershell
npm install
```

Se a política do PowerShell bloquear `npm.ps1`, use `npm.cmd` nos mesmos comandos.

## Pré-visualização

```powershell
npm run dev
```

Abra o endereço informado pelo terminal. A composição principal se chama `CaulumSerenumIoT`.

## Validação

```powershell
npm run validate:timeline
node scripts/validate-scenes.mjs
npm run lint
```

Depois do render final:

```powershell
node scripts/validate-output.mjs
```

## Renderização

```powershell
npm run render
```

O comando gera `video_iot.mp4` em 1920×1080, 30 FPS, H.264 com áudio AAC.

## Substituir a gravação do Wokwi

1. Substitua `public/gravações/2026-11-19 19-53-41.mp4`, preservando o nome do arquivo.
2. Abra `src/scenes/WokwiScene.tsx`.
3. Ajuste os valores `trimBefore` dos três componentes `Video` para apontar aos trechos normal, atenção e crítico. Os valores são expressos em frames a 30 FPS.
4. Se necessário, ajuste os `durationInFrames` das três sequências sem alterar o total de 610 frames da cena.
5. Rode as validações e renderize novamente.

A gravação deve ser uma captura real. O projeto não fabrica uma tela do Wokwi para apresentá-la como evidência.

## Locuções e sincronização

Os arquivos `01.ogg` a `06.ogg` são reproduzidos a 1,1×. Essa velocidade acomoda aproximadamente 99 segundos de fala em 90,13 segundos, sem remover frases. Para trocar uma locução, preserve o nome e verifique se ela termina antes do fim da cena correspondente.

## Notas de conteúdo

- A interface de aplicativo é apenas uma **Interface conceitual — dados simulados**.
- O vídeo não afirma integração entre a interface e o ESP32.
- Todo o funcionamento técnico demonstrado ocorre localmente no ESP32/Wokwi.
- Os limiares são demonstrativos e não são parâmetros clínicos oficiais.
- Gráficos, ícones e elementos visuais são originais e gerados por código; não há imagens de terceiros.
