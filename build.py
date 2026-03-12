#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

import docstring_json

ICON_SHORTCODES: dict[str, tuple[str, str]] = {
    "(op)": ("Opportunity.svg", "Opportunity"),
    "(su)": ("Success.svg", "Success"),
    "(st)": ("Strife.svg", "Strife"),
    "(ex)": ("Explosion.svg", "Explosion"),
}

SHORTCODE_PATTERN = re.compile("|".join(re.escape(k) for k in ICON_SHORTCODES))


def replace_shortcodes(text: str) -> str:
    def substitute(match: re.Match[str]) -> str:
        filename, label = ICON_SHORTCODES[match.group()]
        return f'<img class="dice-icon" src="/assets/{filename}" alt="{label}">'

    return SHORTCODE_PATTERN.sub(substitute, text)


def apply_shortcodes(obj: object) -> object:
    if isinstance(obj, str):
        return replace_shortcodes(obj)
    if isinstance(obj, list):
        return [apply_shortcodes(item) for item in obj]
    if isinstance(obj, dict):
        return {key: apply_shortcodes(value) for key, value in obj.items()}
    return obj


def transpile_data(data_dir: Path, delete_source: bool = False) -> tuple[list[Path], list[Path]]:
    written_files: list[Path] = []
    deleted_files: list[Path] = []
    
    # Process top-level .djson files
    for djson_path in sorted(data_dir.glob("*.djson")):
        output_path = djson_path.with_suffix(".json")
        parsed = docstring_json.load(str(djson_path))
        transformed = apply_shortcodes(parsed)

        output_path.write_text(
            json.dumps(transformed, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        written_files.append(output_path)

        if delete_source:
            djson_path.unlink()
            deleted_files.append(djson_path)

    # Process techniques subdirectory and merge into techniques.json
    techniques_dir = data_dir / "techniques"
    if techniques_dir.exists():
        merged: dict = {}
        for djson_path in sorted(techniques_dir.glob("*.djson")):
            parsed = docstring_json.load(str(djson_path))
            transformed = apply_shortcodes(parsed)
            if isinstance(transformed, dict):
                merged.update(transformed)

            if delete_source:
                djson_path.unlink()
                deleted_files.append(djson_path)

        output_path = data_dir / "techniques.json"
        output_path.write_text(
            json.dumps(merged, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        written_files.append(output_path)

    return written_files, deleted_files


def main() -> int:
    parser = argparse.ArgumentParser(description="Transpile .djson files into static .json files")
    parser.add_argument("--data-dir", type=Path, default=Path("data"), help="Directory containing .djson files")
    parser.add_argument(
        "--delete-source",
        action="store_true",
        help="Delete source .djson files after successful .json generation",
    )
    args = parser.parse_args()

    data_dir = args.data_dir
    if not data_dir.exists() or not data_dir.is_dir():
        raise SystemExit(f"Data directory not found: {data_dir}")

    written, deleted = transpile_data(data_dir, delete_source=args.delete_source)
    if not written:
        print(f"No .djson files found in {data_dir}")
        return 0

    print(f"Transpiled {len(written)} files:")
    for path in written:
        print(f" - {path}")

    if deleted:
        print(f"Deleted {len(deleted)} source files:")
        for path in deleted:
            print(f" - {path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
