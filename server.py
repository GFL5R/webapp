#!/usr/bin/env python3
"""
GFL5R Webapp — FastAPI development server

Serves static files and dynamically parses .djson data files into JSON
responses so no pre-build step is required.

Usage:
    .venv/bin/python server.py
    # or with auto-reload:
    .venv/bin/uvicorn server:app --reload
"""

import re
from pathlib import Path

import docstring_json
from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles

BASE_DIR = Path(__file__).parent

# Shortcode → asset filename mapping
ICON_SHORTCODES: dict[str, tuple[str, str]] = {
    "(op)": ("Opportunity.svg", "Opportunity"),
    "(su)": ("Success.svg",     "Success"),
    "(st)": ("Strife.svg",      "Strife"),
    "(ex)": ("Explosion.svg",   "Explosion"),
}

_SHORTCODE_RE = re.compile("|".join(re.escape(k) for k in ICON_SHORTCODES))


def _replace_shortcodes(text: str) -> str:
    """Replace dice-result shortcodes with inline <img> tags."""
    def _sub(m: re.Match) -> str:
        filename, label = ICON_SHORTCODES[m.group()]
        return f'<img class="dice-icon" src="/assets/{filename}" alt="{label}">'
    return _SHORTCODE_RE.sub(_sub, text)


def _apply_shortcodes(obj):
    """Recursively walk parsed djson data and replace shortcodes in strings."""
    if isinstance(obj, str):
        return _replace_shortcodes(obj)
    if isinstance(obj, dict):
        return {k: _apply_shortcodes(v) for k, v in obj.items()}
    if isinstance(obj, list):
        return [_apply_shortcodes(item) for item in obj]
    return obj


# Data files served dynamically from their .djson source
DJSON_SOURCES = {
    "technique_types.json": BASE_DIR / "data" / "technique_types.djson",
    "techniques.json":      BASE_DIR / "data" / "techniques.djson",
    "advantages.json":      BASE_DIR / "data" / "advantages.djson",
    "disadvantages.json":   BASE_DIR / "data" / "disadvantages.djson",
    "passions.json":        BASE_DIR / "data" / "passions.djson",
    "anxieties.json":       BASE_DIR / "data" / "anxieties.djson",
    "module_types.json":         BASE_DIR / "data" / "module_types.djson",
    "modules.json":               BASE_DIR / "data" / "modules.djson",
    "peculiarities_types.json":   BASE_DIR / "data" / "peculiarities_types.djson",
}

app = FastAPI(title="GFL5R Field Manual")


@app.get("/data/{filename}")
async def serve_data(filename: str):
    """Parse the matching .djson file and return it as JSON."""
    djson_path = DJSON_SOURCES.get(filename)
    if djson_path is None:
        raise HTTPException(status_code=404, detail=f"Unknown data file: {filename}")
    if not djson_path.exists():
        raise HTTPException(status_code=404, detail=f"Source file not found: {djson_path.name}")

    data = docstring_json.load(str(djson_path))
    data = _apply_shortcodes(data)
    return JSONResponse(content=data)


# Serve everything else (pages/, css/, js/, index.html) as static files
app.mount("/", StaticFiles(directory=str(BASE_DIR), html=True), name="static")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)
