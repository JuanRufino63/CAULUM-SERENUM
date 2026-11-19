# CAULUM-SERENUM — AlertaCalor

Projeto acadêmico CitizenTech FIAP 2026.2. Leituras **simuladas** de temperatura e umidade do ESP32 (Wokwi) são enviadas por HTTPS à FastAPI, armazenadas em **SQLite** e consultadas pelo aplicativo React Native (Expo Go).

**Fluxo:** Wokwi ESP32 → `POST /readings` → FastAPI + SQLite (Render) → `GET /readings/latest` → Expo Go. O histórico fica disponível em `GET /readings/history`.

## Links

- [Projeto Wokwi](https://wokwi.com/projects/480355802308334593)
- [API — verificar funcionamento](https://caulum-serenum.onrender.com/health)
- [Última leitura](https://caulum-serenum.onrender.com/readings/latest)
- [Histórico (20 leituras)](https://caulum-serenum.onrender.com/readings/history?limit=20)
- [Swagger / documentação interativa](https://caulum-serenum.onrender.com/docs)

## 1. Wokwi

Abra o projeto Wokwi original e mantenha o circuito e o sketch com Wi-Fi e HTTP integrados. No sketch, use:

```cpp
const char* API_URL = "https://caulum-serenum.onrender.com/readings";
```

Veja o guia [wokwi/INTEGRACAO_NO_SEU_SKETCH.md](wokwi/INTEGRACAO_NO_SEU_SKETCH.md) para os trechos necessários. Mudanças neste repositório não atualizam automaticamente o sketch do site Wokwi. Execute a simulação e procure `WiFi OK` e `API HTTP: 200` no Monitor Serial. Mude a temperatura do DHT22 e confirme em `/readings/latest` e `/readings/history?limit=20`.

Como a API está no Render, **não é preciso ngrok**.

## 2. Aplicativo mobile — Expo Go

Instale [Node.js LTS](https://nodejs.org/en/download) no computador e Expo Go no celular. A partir da raiz do repositório:

```bash
cd mobile
npm install
npx expo start
```

Abra o QR Code no Expo Go. O projeto utiliza Expo SDK 54 e já possui a URL `https://caulum-serenum.onrender.com` preenchida. O app consulta a última leitura a cada **3 segundos**, exibindo temperatura, umidade, nível de alerta e estado do alarme. O app não apresenta a lista histórica; use o endpoint de histórico para isso.

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
| POST | `/readings` | Recebe e grava uma leitura |
| GET | `/readings/latest` | Última leitura (o Expo Go utiliza esta rota) |
| GET | `/readings/history?limit=20` | Histórico mais recente, do novo para o antigo; limite de 1 a 100 |

Exemplo de corpo enviado pelo Wokwi no POST:

```json
{"temperature":36.2,"humidity":78,"alarm_muted":false}
```

A API adiciona automaticamente a data/hora UTC. Exemplo de resposta de `/readings/latest`:

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

**Atenção:** executar o backend localmente cria um **banco diferente** do Render. Os dados enviados pelo Wokwi para o Render não aparecem no SQLite local.

## 4. Postman (opcional)

Importe [postman/Wokwi-Mobile.postman_collection.json](postman/Wokwi-Mobile.postman_collection.json). A variável `baseUrl` vem configurada para `https://caulum-serenum.onrender.com`. Para testar localmente, altere para `http://localhost:8000`. A coleção inclui Health, Enviar leitura, Última leitura e Histórico.

## 5. Deploy no Render

A hospedagem existente pode continuar usando:

| Campo | Valor |
|---|---|
| Root Directory | `backend` |
| Build Command | `pip install -r requirements.txt` |
| Start Command | `uvicorn main:app --host 0.0.0.0 --port $PORT` |

O banco é criado automaticamente no diretório `backend/data`. A variável opcional `SQLITE_PATH` permite escolher outro caminho, por exemplo `/var/data/readings.db` **se existir um disco persistente montado**.

**IMPORTANTE — Render Free:** o disco do serviço é efêmero. O histórico SQLite pode ser apagado em reinícios, novos deploys e suspensões por inatividade. O plano gratuito não oferece disco persistente para Web Services. Para reter os dados de forma permanente, use armazenamento externo (por exemplo, PostgreSQL) ou uma instância com disco persistente. Durante uma demonstração, deixe o serviço ativo e gere novas leituras após o deploy.

## Limitações

Protótipo acadêmico, sem autenticação nem proteção de acesso. Qualquer pessoa com o endereço público pode enviar/consultar leituras. Use somente **dados simulados**, nunca informações pessoais. Não se trata de alertas oficiais de saúde ou meteorologia.
