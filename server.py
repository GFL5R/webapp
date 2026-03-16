#!/usr/bin/env python3
"""
GFL5R Webapp — FastAPI development server
...
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


# Directories for data lookups
DATA_DIR = BASE_DIR / "data"
TECHNIQUES_DIR = DATA_DIR / "techniques"

app = FastAPI(title="GFL5R Field Manual")


@app.get("/data/{filename}")
async def serve_data(filename: str):
    """Parse the matching .djson file and return it as JSON."""
    
    # 1. Special handling for techniques.json: merge all .djson files from subdir
    if filename == "techniques.json":
        if not TECHNIQUES_DIR.is_dir():
            raise HTTPException(status_code=404, detail="Techniques directory not found")

        merged = {}
        # Dynamically find all .djson files in the techniques folder
        for djson_path in TECHNIQUES_DIR.glob("*.djson"):
            data = docstring_json.load(str(djson_path))
            data = _apply_shortcodes(data)
            merged.update(data)
        
        if not merged:
            raise HTTPException(status_code=404, detail="No technique files found")
            
        return JSONResponse(content=merged)

    # 2. Standard handling: map filename.json -> filename.djson in the main data dir
    if not filename.endswith(".json"):
        raise HTTPException(status_code=400, detail="Request must end with .json")

    # Simple string replacement to find the source file
    djson_filename = filename.replace(".json", ".djson")
    djson_path = DATA_DIR / djson_filename

    if not djson_path.exists():
        raise HTTPException(status_code=404, detail=f"Source file not found: {djson_filename}")

    data = docstring_json.load(str(djson_path))
    data = _apply_shortcodes(data)
    return JSONResponse(content=data)


# Serve everything else (pages/, css/, js/, index.html) as static files
app.mount("/", StaticFiles(directory=str(BASE_DIR), html=True), name="static")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)