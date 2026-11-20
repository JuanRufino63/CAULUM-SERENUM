# Roteiro — Vídeo IoT CAULUM SERENUM

**Formato:** 1920×1080, 30 FPS, 16:9  
**Duração renderizada:** 2704 frames / 90,13 s  
**Áudio:** seis locuções fornecidas, reproduzidas a 1,1×

## Cena 1 — Introdução (0:00–0:11,30)

- Identidade visual CAULUM SERENUM em fundo tecnológico escuro.
- Partículas, grid, gradientes azul/roxo e símbolo orbital animado.
- Textos: “Monitoramento Inteligente de Calor” e “Global Solution · FIAP 2026.2”.
- Locução: `public/audios/01.ogg`.

## Cena 2 — O problema (0:11,30–0:25,57)

- Termômetro animado subindo de 24 °C para 39 °C.
- Destaque para as duas variáveis ambientais: temperatura e umidade.
- Mensagem central: “Condições de calor exigem atenção.”
- Sem estatísticas externas ou alegações clínicas.
- Locução: `public/audios/02.ogg`.

## Cena 3 — Funcionamento do IoT (0:25,57–0:39,73)

- Diagrama: DHT22 → ESP32 → Classificação → Alertas.
- Indicadores: leitura a cada 2 s, 2 variáveis, 3 níveis e 1 botão.
- Texto explícito: “Processamento 100% local no ESP32”.
- Locução: `public/audios/03.ogg`.

## Cena 4 — Interface simulada (0:39,73–0:55,63)

- Mockup de smartphone com painel de monitoramento conceitual.
- Cenário 1: 26,5 °C, 52%, NORMAL, verde.
- Cenário 2: 31,2 °C, 60%, ATENÇÃO, amarelo.
- Cenário 3: 36,4 °C, 78%, CRÍTICO, vermelho.
- Gráfico e indicadores mudam suavemente entre os cenários.
- Aviso permanente: “Interface conceitual — dados simulados”.
- Locução: `public/audios/04.ogg`.

## Cena 5 — Demonstração real Wokwi (0:55,63–1:15,97)

- Única cena com captura de tela real.
- Três trechos editados da mesma gravação mostram:
  - NORMAL e LED verde;
  - ATENÇÃO e LED amarelo;
  - CRÍTICO, LED vermelho e buzzer.
- Moldura de navegador, legendas de estado e aviso sobre limiares demonstrativos.
- O áudio original da captura permanece discreto sob a locução.
- Locução: `public/audios/05.ogg`.

## Cena 6 — Resultados e encerramento (1:15,97–1:30,13)

- Indicadores: monitoramento a cada 2 s, 3 níveis, alerta visual/sonoro e protótipo funcional.
- Encerramento com CAULUM SERENUM e a frase:
  “Tecnologia para monitorar. Informação para prevenir.”
- Identificação FIAP · Global Solution 2026.2.
- Locução: `public/audios/06.ogg`.

## Observações de conformidade

- A interface mobile não recebe dados do ESP32; ela é somente uma representação conceitual.
- Não há integração remota no vídeo.
- Os limiares de 30 °C e 35 °C pertencem à demonstração acadêmica.
- A captura Wokwi é real e foi fornecida pelo autor do projeto.
