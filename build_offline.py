#!/usr/bin/env python3
"""
Build a fully offline-portable HTML by inlining Chart.js and base64-embedding
all referenced images — both remote (cdn.ncbi.nlm.nih.gov) and local
(any <img src="…"> pointing to a file next to the HTML).

Usage:
    python3 build_offline.py <input.html>

Output:
    <input>_OFFLINE.html in the same directory.

The output file is fully self-contained — works without any internet
connection. Recipient just double-clicks to view in browser.

Used for distributing presentations to recipients in regions where
GitHub Pages is blocked (e.g., Russia behind RKN filters).
"""

import base64
import mimetypes
import re
import sys
import urllib.request
from pathlib import Path

CHARTJS_URL = "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"
CHARTJS_TAG = (
    '<script src="https://cdn.jsdelivr.net/npm/'
    "chart.js@4.4.0/dist/chart.umd.min.js\"></script>"
)

# Map by extension → MIME type
EXT_MIME = {
    ".jpg":  "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png":  "image/png",
    ".gif":  "image/gif",
    ".webp": "image/webp",
    ".svg":  "image/svg+xml",
}


def fetch(url: str) -> bytes:
    """Download URL contents as bytes."""
    print(f"  ↓ {url}")
    with urllib.request.urlopen(url, timeout=30) as r:
        return r.read()


def embed_local_image(path: Path) -> str:
    """Encode local image as base64 data URI."""
    mime = EXT_MIME.get(path.suffix.lower(), mimetypes.guess_type(path.name)[0] or "application/octet-stream")
    b64 = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:{mime};base64,{b64}"


def main(input_path: Path) -> None:
    if not input_path.exists():
        sys.exit(f"File not found: {input_path}")

    base_dir = input_path.parent
    print(f"Source: {input_path.name}")
    src = input_path.read_text(encoding="utf-8")
    print(f"Source size: {len(src):,} bytes")

    # 1) Inline Chart.js
    print("\n[1/4] Fetching Chart.js…")
    try:
        chartjs = fetch(CHARTJS_URL).decode("utf-8")
        inline_script = (
            "<script>\n"
            f"/* Chart.js v4.4.0 — inlined for offline use, "
            f"original: cdn.jsdelivr.net/npm/chart.js@4.4.0 */\n"
            f"{chartjs}\n"
            "</script>"
        )
        if CHARTJS_TAG in src:
            src = src.replace(CHARTJS_TAG, inline_script)
            print("  ✓ Chart.js inlined")
        else:
            print("  ! Chart.js script tag not found — skipping")
    except Exception as e:
        print(f"  ! Failed to fetch Chart.js: {e}")

    # 2) Embed all cdn.ncbi.nlm.nih.gov images as base64 data URIs
    print("\n[2/4] Finding remote PMC images…")
    pattern = re.compile(
        r'https://cdn\.ncbi\.nlm\.nih\.gov/pmc/blobs/[^"\s\']+\.jpg'
    )
    urls = sorted(set(pattern.findall(src)))
    print(f"  Found {len(urls)} unique remote image URL(s)")

    for url in urls:
        try:
            img_bytes = fetch(url)
            b64 = base64.b64encode(img_bytes).decode("ascii")
            data_uri = f"data:image/jpeg;base64,{b64}"
            src = src.replace(url, data_uri)
            print(f"  ✓ embedded ({len(img_bytes):,} bytes)")
        except Exception as e:
            print(f"  ! Failed: {e}")

    # 3) Embed LOCAL images referenced by <img src="…"> with a relative path
    print("\n[3/4] Finding local images…")
    # Match img src and any inline-styled background-image: url(...) etc — keep simple, just <img src=…>
    img_pattern = re.compile(r'(<img\b[^>]*?\bsrc=")([^"]+)(")', re.IGNORECASE)

    local_count = 0
    skipped_count = 0
    seen_paths = set()

    def repl(match: re.Match) -> str:
        nonlocal local_count, skipped_count
        prefix, src_val, suffix = match.group(1), match.group(2), match.group(3)
        # Skip URLs that are already absolute or already data:
        if src_val.startswith(("data:", "http://", "https://", "//")):
            return match.group(0)
        # Try to locate the file relative to the HTML
        candidate = (base_dir / src_val).resolve()
        if not candidate.is_file():
            print(f"  ! local image not found: {src_val}")
            skipped_count += 1
            return match.group(0)
        try:
            data_uri = embed_local_image(candidate)
        except Exception as e:
            print(f"  ! Failed to embed {src_val}: {e}")
            skipped_count += 1
            return match.group(0)
        if src_val not in seen_paths:
            seen_paths.add(src_val)
            print(f"  ✓ {src_val}  ({candidate.stat().st_size:,} bytes)")
        local_count += 1
        return f"{prefix}{data_uri}{suffix}"

    src = img_pattern.sub(repl, src)
    print(f"  Embedded {local_count} <img> reference(s) [{len(seen_paths)} unique files], skipped {skipped_count}")

    # 4) Mark title as offline version
    print("\n[4/4] Tagging title…")
    src = re.sub(
        r"<title>([^<]+?)</title>",
        lambda m: f"<title>{m.group(1)} · Offline</title>"
        if "Offline" not in m.group(1) else m.group(0),
        src,
        count=1,
    )

    # Write output
    out_path = input_path.with_name(input_path.stem + "_OFFLINE.html")
    out_path.write_text(src, encoding="utf-8")
    size = out_path.stat().st_size
    print(f"\n=== Output ===")
    print(f"  {out_path.name}")
    print(f"  {size:,} bytes ({size / 1024 / 1024:.2f} MB)")
    print(f"\nReady to send via Telegram / email / WhatsApp.")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(f"Usage: python3 {sys.argv[0]} <input.html>")
    main(Path(sys.argv[1]).resolve())
