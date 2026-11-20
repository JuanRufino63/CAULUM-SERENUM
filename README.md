# CAULUM-SERENUM — AlertaCalor

Projeto acadêmico CitizenTech FIAP 2026.2. Leituras **simuladas** de temperatura e umidade do ESP32 (Wokwi) são enviadas por HTTPS, através do ngrok, à FastAPI local, armazenadas em **SQLite** e consultadas pelo aplicativo React Native (Expo Go).

**Fluxo:** Wokwi ESP32 → ngrok → `POST /telemetria` → FastAPI local + SQLite → `GET /leitura` e `GET /historico` → Expo Go.

## Links

- [Projeto Wokwi](https://wokwi.com/projects/480355802308334593)
- URL ngrok usada nesta configuração: `https://mandolin-coffee-alabaster.ngrok-free.dev`
- API local: `http://localhost:8000`
- Painel local do ngrok: `http://localhost:4040`

## 1. Wokwi

Abra o projeto Wokwi original e mantenha o circuito e o sketch com Wi-Fi e HTTP integrados. No sketch, use:

```cpp
const char* API_URL = "https://mandolin-coffee-alabaster.ngrok-free.dev/telemetria";
```

Veja o guia [wokwi/INTEGRACAO_NO_SEU_SKETCH.md](wokwi/INTEGRACAO_NO_SEU_SKETCH.md) para os trechos necessários. Mudanças neste repositório não atualizam automaticamente o sketch do site Wokwi. Execute a simulação e procure `WiFi OK` e `API HTTP: 200` no Monitor Serial. Mude a temperatura do DHT22 e confirme em `/leitura` e `/historico`.

Preserve o circuito, os componentes, os limiares e a lógica do projeto Wokwi. Altere somente a URL de envio e mantenha as inserções de Wi-Fi/HTTP descritas no guia.

## 2. Aplicativo mobile — Expo Go

Instale [Node.js LTS](https://nodejs.org/en/download) no computador e Expo Go no celular. A partir da raiz do repositório:

```bash
cd mobile
npm install
npx expo start
```

Abra o QR Code no Expo Go. O projeto utiliza Expo SDK 54 e já possui a URL ngrok preenchida. O app consulta `/leitura` e `/historico` a cada **3 segundos**, exibindo a leitura atual e a quantidade de registros retornados no histórico.

Se houver bloqueio de acesso entre computador e celular, em uma rede permitida tente `npx expo start --tunnel`.

## 3. Backend e SQLite

O SQLite já vem com Python (`sqlite3`): **não precisa instalar um banco ou adicionar dependências**. A API cria automaticamente a tabela e o arquivo `backend/data/readings.db` na primeira inicialização.

Para testar a API **localmente**, a partir da raiz do projeto:

```bash
cd backend
python -m pip install -r requirements.txt
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

Acesse `http://localhost:8000/docs`.

### Expor a API local com ngrok

1. Instale o agente para Windows pela página oficial: <https://ngrok.com/download/windows>.
2. Crie/acesse sua conta e copie o authtoken em <https://dashboard.ngrok.com/get-started/your-authtoken>.
3. No seu próprio PowerShell, configure o token sem enviá-lo nem salvá-lo no repositório:

```powershell
ngrok config add-authtoken SEU_TOKEN
ngrok config check
```

4. Com o FastAPI ainda executando na porta 8000, abra outro PowerShell:

```powershell
ngrok http 8000
```

5. Copie a URL HTTPS mostrada em `Forwarding`. Verifique o encaminhamento:

```powershell
$URL_NGROK = "https://SEU-DOMINIO.ngrok-free.dev"
(Invoke-WebRequest -Uri "$URL_NGROK/health" -Headers @{"ngrok-skip-browser-warning"="true"} -UseBasicParsing).Content
```

A resposta esperada é `{"status":"ok"}`. O painel `http://localhost:4040` mostra as requisições recebidas. No plano gratuito, a tela informativa do ngrok pode aparecer para clientes identificados como navegador; por isso o Expo e o exemplo Wokwi enviam o cabeçalho `ngrok-skip-browser-warning: true`.

Se o domínio obtido for diferente de `https://mandolin-coffee-alabaster.ngrok-free.dev`, substitua a URL base em `mobile/App.js` e a URL completa de `/telemetria` em `wokwi/INTEGRACAO_NO_SEU_SKETCH.md` e no sketch do site Wokwi. O Wokwi e o Expo devem usar o mesmo domínio.

Mantenha os dois processos abertos durante a demonstração. Para encerrar, pressione `Ctrl+C` no terminal do ngrok e no terminal do Uvicorn.

A tabela `readings` contém:

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | INTEGER | Identificador automático |
| `temperature` | REAL | Temperatura em °C |
| `humidity` | REAL | Umidade em % |
| `alarm_muted` | INTEGER | 0 = não silenciado; 1 = silenciado |
| `recorded_at` | TEXT | Data/hora de recebimento em UTC (ISO 8601) |

O nível de alerta é calculado pela API usando os mesmos limiares do ESP32, e não armazenado no SQLite.

### Rotas

| Método | Rota | Resultado |
|---|---|---|
| GET | `/health` | Estado da API |
| POST | `/telemetria` | Recebe e grava uma leitura (Wokwi) |
| GET | `/leitura` | Última leitura (Expo Go) |
| GET | `/historico?limit=20` | Histórico mais recente (Expo Go) |
| POST | `/readings` | Recebe e grava uma leitura |
| GET | `/readings/latest` | Alias legado da última leitura |
| GET | `/readings/history?limit=20` | Histórico mais recente, do novo para o antigo; limite de 1 a 100 |

As rotas em inglês permanecem como aliases de compatibilidade e usam exatamente a mesma lógica e o mesmo banco.

Exemplo de corpo enviado pelo Wokwi no POST:

```json
{"temperature":36.2,"humidity":78,"alarm_muted":false}
```

A API adiciona automaticamente a data/hora UTC. Exemplo de resposta de `/leitura`:

```json
{"temperature":36.2,"humidity":78,"level":"CRITICO","alarm_muted":false,"updated_at":"2026-11-19T17:00:00+00:00"}
```

Quando o banco está vazio, `temperature`, `humidity`, `level` e `updated_at` vêm como `null`. O arquivo `.db` é gerado ao rodar a API e não é versionado no Git.

### Conferir os registros do banco local

Com a API local iniciada e ao menos uma leitura enviada, entre na pasta `backend` e execute:

```bash
python -c "import sqlite3; c=sqlite3.connect('data/readings.db'); print(c.execute('SELECT * FROM readings ORDER BY id DESC LIMIT 10').fetchall()); c.close()"
```

Também é possível abrir `backend/data/readings.db` no DBeaver com conexão SQLite.

Todas as requisições encaminhadas pelo domínio ngrok são gravadas neste mesmo banco local enquanto o FastAPI estiver em execução.

## 4. Postman (opcional)

Importe [postman/Wokwi-Mobile.postman_collection.json](postman/Wokwi-Mobile.postman_collection.json). Ajuste a variável `baseUrl` para o domínio HTTPS exibido pelo ngrok ou para `http://localhost:8000` em testes locais.

## 5. Deploy antigo no Render (opcional)

Esta seção não faz parte do fluxo Wokwi + FastAPI local + ngrok + Expo Go. A hospedagem existente pode continuar usando:

| Campo | Valor |
|---|---|
| Root Directory | `backend` |
| Build Command | `pip install -r requirements.txt` |
| Start Command | `uvicorn main:app --host 0.0.0.0 --port $PORT` |

O banco é criado automaticamente no diretório `backend/data`. A variável opcional `SQLITE_PATH` permite escolher outro caminho, por exemplo `/var/data/readings.db` **se existir um disco persistente montado**.

**IMPORTANTE — Render Free:** o disco do serviço é efêmero. O histórico SQLite pode ser apagado em reinícios, novos deploys e suspensões por inatividade. O plano gratuito não oferece disco persistente para Web Services. Para reter os dados de forma permanente, use armazenamento externo (por exemplo, PostgreSQL) ou uma instância com disco persistente. Durante uma demonstração, deixe o serviço ativo e gere novas leituras após o deploy.

## Limitações

Protótipo acadêmico, sem autenticação nem proteção de acesso. Qualquer pessoa com o endereço público pode enviar/consultar leituras. Use somente **dados simulados**, nunca informações pessoais. Não se trata de alertas oficiais de saúde ou meteorologia.
