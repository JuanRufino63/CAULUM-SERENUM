# Integração com seu projeto Wokwi existente

Projeto original: https://wokwi.com/projects/480355802308334593

**Não substitua seu sketch.ino pelo exemplo genérico deste ZIP.** Preserve o código e o diagrama do projeto original; aplique apenas estas inserções.

## 1. Acrescente aos includes

```cpp
#include <WiFi.h>
#include <HTTPClient.h>
```

## 2. Acrescente às variáveis globais

```cpp
const char* API_URL = "https://mandolin-coffee-alabaster.ngrok-free.dev/telemetria";
unsigned long ultimoEnvio = 0;
const unsigned long INTERVALO_ENVIO_MS = 5000;
```

## 3. Acrescente esta função antes de setup()

```cpp
void enviarLeituraAPI() {
  if (!leituraValida || WiFi.status() != WL_CONNECTED) return;
  WiFiClientSecure cliente;
  cliente.setInsecure(); // Somente demonstração acadêmica; não valida certificado TLS
  HTTPClient http;
  if (!http.begin(cliente, API_URL)) return;
  http.addHeader("Content-Type", "application/json");
  http.addHeader("ngrok-skip-browser-warning", "true");
  String corpo = "{\"temperature\":" + String(tempAtual, 1) +
                 ",\"humidity\":" + String(umidadeAtual, 1) +
                 ",\"alarm_muted\":" + String(buzzerSilenciado ? "true" : "false") + "}";
  int codigo = http.POST(corpo);
  Serial.printf("API HTTP: %d\n", codigo);
  http.end();
}
```

Adicione também `#include <WiFiClientSecure.h>` junto aos includes.

## 4. Dentro de setup(), após Serial.begin(115200)

```cpp
WiFi.begin("Wokwi-GUEST", "", 6);
Serial.print("Conectando WiFi");
for (int tentativa = 0; tentativa < 30 && WiFi.status() != WL_CONNECTED; tentativa++) {
  delay(300);
  Serial.print(".");
}
Serial.println(WiFi.status() == WL_CONNECTED ? " WiFi OK" : " WiFi indisponivel");
```

## 5. Dentro de loop(), antes do delay(20)

```cpp
if (agora - ultimoEnvio >= INTERVALO_ENVIO_MS) {
  ultimoEnvio = agora;
  enviarLeituraAPI();
}
```

## 6. Importante

O Wokwi precisa alcançar uma API pública. Mantenha o FastAPI local e o túnel ngrok em execução e use a URL completa `https://mandolin-coffee-alabaster.ngrok-free.dev/telemetria` no `API_URL`. Após iniciar a simulação, confirme `API HTTP: 200` no Monitor Serial e abra `https://mandolin-coffee-alabaster.ngrok-free.dev/leitura` para verificar a temperatura. O backend continua sendo o FastAPI local deste projeto; o ngrok apenas encaminha as requisições. O sketch que roda no projeto Wokwi não é atualizado automaticamente por alterações neste repositório.
