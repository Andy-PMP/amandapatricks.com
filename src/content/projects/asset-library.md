---
title: Game Asset Library Browser
summary: A Python cataloger and a single-file HTML browser that made my 89,890-file game asset library searchable, with thumbnails, audio previews and my own tags, all running offline with no server.
date: 2026-10-14
tags: [Python, SQLite, JavaScript, Pillow, Game Dev]
repo: https://github.com/Andy-PMP/assetlibrary
---

## The problem

I've collected a lot of game assets: sprites, tilesets, UI pieces, sound effects and music, each in a folder named for the asset pack it came from. When I finally counted, it was **89,890 files**.

Finding "a wooden door sprite" or "a short coin pickup sound" meant opening pack after pack in File Explorer and hoping. Audio was worse, since there's no thumbnail to scan; you have to play each file. At that size, the library was close to unusable.

I wanted to search and browse all of it at once, without uploading anything or running a server.

## What it does

Two Python scripts build a catalog, and one HTML file browses it:

- **Catalog**: walks the library and records each file's path, name, type, pack, folder, size and, for images, pixel dimensions in a SQLite database, then prints a breakdown by file type
- **Export**: turns the database into data the browser page can load
- **Browse**: a grid of cards with image thumbnails and playable audio, search across filename, folder, pack and tags, filters for images and audio, and a full-size image viewer
- **Tags**: add my own keywords to any asset, or tag every search result at once (a whole pack, for example), and search by them

## How it works

The catalog script reads image dimensions with Pillow, which only needs the file header rather than decoding the whole image. Rows go into SQLite in batches of 1,000 inside a single transaction.

The browser is one self-contained HTML file opened straight from disk. Browsers won't let a page opened from `file://` fetch a local JSON file, so the export also writes the data as a JavaScript file that the page loads with an ordinary `<script>` tag. That one decision is what makes "double-click to open, no server" work.

Drawing 89,890 cards at once would freeze the page, so the grid renders 200 at a time and adds more as you scroll. Images lazy-load, audio players don't download anything until you press play, and starting one sound pauses the others.

## Tags without a server

A static page can't write to a database, so tagging syncs in two steps:

- Tag edits save instantly in the browser, and a counter shows how many haven't been synced yet
- **Export tags** downloads them, and `import_tags.py` merges them into SQLite and regenerates the page data
- On the next reload, the page sees its edits are now in the database and clears its local copy

Tags live in their own table keyed by file path, so rescanning the library never wipes them.

## Touches for game art

- A **pixel art scaling** toggle keeps tiny sprites crisp instead of blurry when they're enlarged
- A checkerboard behind each thumbnail makes transparent PNGs visible
- Light and dark mode follow the system setting

## Usage

```text
pip install Pillow
python catalog.py "D:\GameAssets"
python export_json.py
# then open browser.html in any browser
```
