"""API de leituras do AlertaCalor (Wokwi -> FastAPI -> Expo)."""

import os
import sqlite3
from contextlib import asynccontextmanager, closing
from datetime import datetime, timezone
from pathlib import Path

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# Em execucao local, cria backend/data/readings.db automaticamente.
# Em hospedagem com disco persistente, defina SQLITE_PATH para o caminho do disco.
DB_PATH = Path(os.environ.get("SQLITE_PATH", Path(__file__).resolve().parent / "data" / "readings.db"))


def open_db():
    connection = sqlite3.connect(DB_PATH, timeout=10)
    connection.row_factory = sqlite3.Row
    return connection


def init_db():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    with closing(open_db()) as connection:
        connection.execute("""
            CREATE TABLE IF NOT EXISTS readings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                temperature REAL NOT NULL,
                humidity REAL NOT NULL,
                alarm_muted INTEGER NOT NULL DEFAULT 0,
                recorded_at TEXT NOT NULL
            )
        """)
        connection.commit()


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(title="AlertaCalor API", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class Reading(BaseModel):
    temperature: float = Field(ge=-40, le=80)
    humidity: float = Field(ge=0, le=100)
    alarm_muted: bool = False


def classify(temperature, humidity):
    if temperature >= 35:
        return "CRITICO"
    if temperature >= 30 or (temperature >= 28 and humidity >= 75):
        return "ATENCAO"
    return "NORMAL"


def format_reading(row):
    if row is None:
        return {
            "temperature": None,
            "humidity": None,
            "level": None,
            "alarm_muted": False,
            "updated_at": None,
        }
    return {
        "temperature": row["temperature"],
        "humidity": row["humidity"],
        "level": classify(row["temperature"], row["humidity"]),
        "alarm_muted": bool(row["alarm_muted"]),
        "updated_at": row["recorded_at"],
    }


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/readings")
def add_reading(reading: Reading):
    recorded_at = datetime.now(timezone.utc).isoformat()
    with closing(open_db()) as connection:
        connection.execute(
            "INSERT INTO readings (temperature, humidity, alarm_muted, recorded_at) VALUES (?, ?, ?, ?)",
            (reading.temperature, reading.humidity, int(reading.alarm_muted), recorded_at),
        )
        connection.commit()
    return {"message": "Leitura recebida", "reading": {
        "temperature": reading.temperature,
        "humidity": reading.humidity,
        "level": classify(reading.temperature, reading.humidity),
        "alarm_muted": reading.alarm_muted,
        "updated_at": recorded_at,
    }}


@app.get("/readings/latest")
def get_latest():
    with closing(open_db()) as connection:
        row = connection.execute(
            "SELECT * FROM readings ORDER BY id DESC LIMIT 1"
        ).fetchone()
    return format_reading(row)


@app.get("/readings/history")
def get_history(limit: int = Query(default=20, ge=1, le=100)):
    with closing(open_db()) as connection:
        rows = connection.execute(
            "SELECT * FROM readings ORDER BY id DESC LIMIT ?", (limit,)
        ).fetchall()
    return [format_reading(row) for row in rows]
