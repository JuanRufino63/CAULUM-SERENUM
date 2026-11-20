# CAULUM SERENUM — Vídeo IoT

## Intenção

Criar um vídeo acadêmico moderno de aproximadamente 90 segundos que demonstre, com motion graphics e uma captura real do Wokwi, o funcionamento local do protótipo de monitoramento de calor CAULUM SERENUM.

## Objetivos

- Exportar MP4 Full HD (1920×1080), 30 FPS, horizontal.
- Organizar seis cenas independentes e sincronizadas com `public/audios/01.ogg` a `06.ogg`.
- Mostrar temperatura, umidade, três níveis de alerta e o botão físico.
- Apresentar uma interface mobile explicitamente conceitual e com dados simulados.
- Usar a captura real existente do Wokwi na quinta cena.
- Manter roteiro, código e instruções de regeneração em `video-iot/`.

## Não objetivos

- Não construir um aplicativo funcional.
- Não sugerir conexão entre a interface conceitual e o ESP32.
- Não mostrar API, backend, ngrok ou telemetria remota.
- Não apresentar os limiares demonstrativos como parâmetros clínicos oficiais.

## Direção visual

Fundo grafite quase preto, gradientes azul/roxo/ciano, partículas e linhas discretas. Verde, amarelo e vermelho representam os níveis de alerta. A hierarquia tipográfica privilegia títulos grandes, números e diagramas, evitando aparência de slides.

## Abordagem escolhida

O projeto existente já usa Remotion, portanto o vídeo será composto em React/TypeScript com uma cena por componente, SVGs próprios e animações determinísticas por frame. As locuções somam cerca de 99 segundos e serão reproduzidas uniformemente a 1,1×, resultando em aproximadamente 90,1 segundos sem cortes de fala. A cena Wokwi editará trechos da única captura real para mostrar normal, atenção e crítico.

Alternativas descartadas: MoviePy/Pillow, por oferecer uma iteração visual mais lenta neste repositório; PowerPoint exportado, por não atender à exigência de motion graphics; geração de cenas realistas por IA, por reduzir a fidelidade técnica e não ser necessária.

## Restrições

- Recursos visuais próprios, criados por código.
- Sem estatísticas externas nem alegações clínicas.
- A captura real deve permanecer identificada como simulação Wokwi.
- O MP4 precisa ter áudio, duração próxima de 90 segundos e reprodução validada.

## Decisões deixadas ao implementador

- Microanimações, curvas de easing e detalhes decorativos.
- Recortes exatos da gravação Wokwi, desde que os três estados permaneçam reais e legíveis.
- Volume do áudio original da captura, mantendo a locução inteligível.
