from datetime import datetime, timezone
from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title="AlertaCalor API")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

class Reading(BaseModel):
    temperature: float = Field(ge=-40, le=80)
    humidity: float = Field(ge=0, le=100)
    level: Optional[str] = None
    alarm_muted: bool = False

latest = {"temperature": None, "humidity": None, "level": None, "alarm_muted": False, "updated_at": None}

def classify(t, h):
    if t >= 35: return "CRITICO"
    if t >= 30 or (t >= 28 and h >= 75): return "ATENCAO"
    return "NORMAL"

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/readings/latest")
def get_latest():
    return latest

@app.post("/readings")
def add_reading(reading: Reading):
    latest.update({"temperature": reading.temperature, "humidity": reading.humidity,
                   "level": classify(reading.temperature, reading.humidity),
                   "alarm_muted": reading.alarm_muted,
                   "updated_at": datetime.now(timezone.utc).isoformat()})
    return {"message": "Leitura recebida", "reading": latest}
