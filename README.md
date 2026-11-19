# AlertaCalor — ESP32 Wokwi + API + App Mobile

Integração acadêmica simples do projeto original https://wokwi.com/projects/480355802308334593.

Fluxo: **Wokwi ESP32 → HTTP POST → FastAPI → HTTP GET → App Expo**. Postman é só para testes.

## Executar backend

```bash
cd backend
python -m pip install -r requirements.txt
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

Abra `http://localhost:8000/docs` no computador. A API guarda apenas a última leitura em memória (reiniciar apaga).

## Testar Postman

Importe `postman/Wokwi-Mobile.postman_collection.json`. Execute `Enviar leitura` e depois `Última leitura`.

## Ligar Wokwi

**Mantenha seu circuito e sketch originais.** Siga `wokwi/INTEGRACAO_NO_SEU_SKETCH.md` para adicionar WiFi e envio HTTP. Exponha a porta 8000 com um túnel HTTPS público, e coloque o endereço público em `API_URL`.

## Executar mobile

```bash
cd mobile
npm install
npx expo start
```

Abra com Expo Go. No campo endereço da API, use `http://IP_DO_SEU_PC:8000` (PC e celular na mesma rede WiFi). Libere a porta 8000 no firewall se necessário. O aplicativo consulta `/readings/latest` a cada 3 segundos.

## Limitações

Exemplo para demonstração, sem banco de dados, autenticação ou persistência. O Wokwi não recebe dados via Postman; Postman testa a API. O arquivo `wokwi/sketch.ino` herdado do starter é **genérico** e não substitui o seu projeto original. O sketch real permanece no link Wokwi.
