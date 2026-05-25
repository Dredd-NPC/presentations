#!/usr/bin/env python3
"""
Build a fully offline-portable HTML by inlining Chart.js and base64-embedding
all images referenced via cdn.ncbi.nlm.nih.gov.

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
import re
import sys
import urllib.request
from pathlib import Path

CHARTJS_URL = "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"
CHARTJS_TAG = (
    '<script src="https://cdn.jsdelivr.net/npm/'
    "chart.js@4.4.0/dist/chart.umd.min.js\"></script>"
)


def fetch(url: str) -> bytes:
    """Download URL contents as bytes."""
    print(f"  ↓ {url}")
    with urllib.request.urlopen(url, timeout=30) as r:
        return r.read()


def main(input_path: Path) -> None:
    if not input_path.exists():
        sys.exit(f"File not found: {input_path}")

    print(f"Source: {input_path.name}")
    src = input_path.read_text(encoding="utf-8")
    print(f"Source size: {len(src):,} bytes")

    # 1) Inline Chart.js
    print("\n[1/3] Fetching Chart.js…")
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

    # 2) Embed all cdn.ncbi.nlm.nih.gov images as base64 data URIs
    print("\n[2/3] Finding PMC images…")
    pattern = re.compile(
        r'https://cdn\.ncbi\.nlm\.nih\.gov/pmc/blobs/[^"\s\']+\.jpg'
    )
    urls = sorted(set(pattern.findall(src)))
    print(f"  Found {len(urls)} unique image URL(s)")

    for url in urls:
        img_bytes = fetch(url)
        b64 = base64.b64encode(img_bytes).decode("ascii")
        data_uri = f"data:image/jpeg;base64,{b64}"
        src = src.replace(url, data_uri)
        print(f"  ✓ embedded ({len(img_bytes):,} bytes)")

    # 3) Mark title as offline version
    print("\n[3/3] Tagging title…")
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
