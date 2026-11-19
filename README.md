# CAULUM-SERENUM — AlertaCalor

Demonstração acadêmica do projeto **AlertaCalor** (CitizenTech FIAP 2026.2), com ESP32 no Wokwi, uma API Python FastAPI no Render e aplicativo mobile React Native/Expo.

**Fluxo:** Wokwi ESP32 → `POST /readings` → FastAPI (Render) → `GET /readings/latest` → Expo Go.

## Endereços do projeto

- [Projeto original no Wokwi](https://wokwi.com/projects/480355802308334593)
- [API pública /health](https://caulum-serenum.onrender.com/health)
- [Última leitura /readings/latest](https://caulum-serenum.onrender.com/readings/latest)
- URL base da API: `https://caulum-serenum.onrender.com`

## 1. ESP32 no Wokwi

No sketch original, mantenha o circuito e configure a variável:

```cpp
const char* API_URL = "https://caulum-serenum.onrender.com/readings";
```

O guia [wokwi/INTEGRACAO_NO_SEU_SKETCH.md](wokwi/INTEGRACAO_NO_SEU_SKETCH.md) contém as inserções de Wi-Fi e HTTP necessárias para o sketch original. O projeto Wokwi é mantido separadamente; alterações no GitHub não são aplicadas automaticamente à simulação.

Inicie o Wokwi e confira no Monitor Serial `WiFi OK` e `API HTTP: 200` (o código 200 sozinho não substitui a confirmação da leitura em `/readings/latest`). Altere a temperatura no DHT22 e atualize a página da última leitura para confirmar.

**Não é necessário ngrok:** o backend já está hospedado publicamente no Render.

## 2. Aplicativo mobile (Expo Go)

Instale Node.js LTS no computador, depois execute:

```bash
cd mobile
npm install
npx expo start
```

Abra o app com o **Expo Go** no celular (o projeto usa Expo SDK 54). O endereço da API já vem preenchido com `https://caulum-serenum.onrender.com`. O aplicativo consulta `/readings/latest` a cada **3 segundos**. O campo permanece editável caso o endereço mude.

Se o QR Code não abrir por bloqueio entre computador e celular, tente `npx expo start --tunnel` em uma rede que permita esse acesso.

## 3. API FastAPI

O backend em `backend/main.py` já está publicado no Render.

Para executá-lo *localmente* (opcional):

```bash
cd backend
python -m pip install -r requirements.txt
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

Documentação local: `http://localhost:8000/docs`. No Render, a execução usa `uvicorn main:app --host 0.0.0.0 --port $PORT` a partir da pasta `backend`.

## 4. Postman (opcional)

Importe `postman/Wokwi-Mobile.postman_collection.json`. Para testar a API hospedada, mude a variável `baseUrl` da coleção para `https://caulum-serenum.onrender.com`. Execute `Enviar leitura` e depois `Última leitura`.

## Limitações

Projeto acadêmico de demonstração. Não há autenticação nem banco de dados: a API pública guarda somente a última leitura em memória. Reiniciar o servidor apaga os dados; um serviço gratuito do Render pode entrar em suspensão por inatividade. Os sensores no Wokwi produzem **dados simulados**, não medições reais. Não enviar informações pessoais para esta API pública.
