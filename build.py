#!/usr/bin/env python3
"""
GFL5R Webapp Build Script

Uses the docstring-json library (https://github.com/JackBinary/docstring-json)
to parse .djson technique data and emit JSON files for the webapp.

Usage:
    .venv/bin/python webapp/build.py

Requires:
    pip install docstring-json  (or install wheel from GitHub releases)
"""

import json
import os
import sys

try:
    import docstring_json
except ImportError:
    print("ERROR: docstring-json is not installed.")
    print("Install it from the GitHub release wheel:")
    print("  pip install https://github.com/JackBinary/docstring-json/releases/download/v0.2.1/<wheel-for-your-platform>.whl")
    sys.exit(1)

# Paths
REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WEBAPP_DATA = os.path.join(REPO_ROOT, "webapp", "data")
# Source files — each entry is (djson_path, output_json_name, label)
SOURCES = [
    ("technique_types.djson", "technique_types.json", "technique types"),
    ("techniques.djson",      "techniques.json",      "techniques"),
    ("advantages.djson",      "advantages.json",      "advantages"),
    ("passions.djson",        "passions.json",         "passions"),
    ("module_types.djson",    "module_types.json",     "module types"),
    ("modules.djson",         "modules.json",          "modules"),
]


def build():
    os.makedirs(WEBAPP_DATA, exist_ok=True)

    for src_name, out_name, label in SOURCES:
        src_path = os.path.join(REPO_ROOT, src_name)
        out_path = os.path.join(WEBAPP_DATA, out_name)
        print(f"Parsing {src_path}...")
        data = docstring_json.load(src_path)
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"  -> {out_path}  ({len(data)} {label})")

    print("Build complete.")


if __name__ == "__main__":
    build()
