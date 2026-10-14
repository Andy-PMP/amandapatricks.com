---
title: Quantic Course Scraper
summary: A Python tool that turns saved Quantic course pages into a clean study guide of key terms and assigned readings, built so classmates without a technical background could use it too.
date: 2026-06-09
tags: [Python, BeautifulSoup, Automation, Open Source]
repo: https://github.com/Andy-PMP/scrapeKeyTerms
---

## The problem

In my M.S. in AI Engineering program, each course has a list of key terms you're expected to know, but the course site **won't let you copy and paste the definitions**. Your only options are digging each one out with the browser's Inspect Element tool or typing them out by hand, term by term, course after course. The assigned readings are spread across lesson pages too.

For a whole cohort studying the same material, that's hours of busywork. I wanted a real fix.

## What it does

You save a course page from your browser and run the script. It produces a plain-text file with two sections:

- **Key terms**: every term with its definition
- **Assigned readings**: every reading and its URL, grouped by chapter and lesson

## How it works

The script parses the saved HTML with BeautifulSoup and uses CSS selectors that target the course page's structure: key-term containers for definitions, and lesson containers for readings. It normalizes whitespace, falls back to an alternate link element when the primary one is missing, and groups readings under their lesson headers as it writes the output.

When one item is malformed, the script reports what it skipped and keeps going instead of failing the whole run. At the end it prints a summary, including how many terms and readings it extracted and the first record of each, so you can check the result at a glance.

## Built-in safeguards

Classmates would be running this on their own machines, so I built in checks before it reads anything:

- **File type allowlist**: only accepts `.html` and `.htm` files
- **Path traversal guard**: resolves the path and refuses anything outside the script's own folder
- **Size limit**: rejects files over 50 MB
- **Encoding check**: confirms the file is UTF-8 and explains what's wrong if it isn't

## Designed for non-technical users

A command-line tool only helps people comfortable with a terminal. To widen the audience:

- A Windows launcher lets you **drag the saved page onto a file** to run it, with no terminal needed
- The README walks through installing Python, saving the page correctly, and fixing common errors in plain language

## Sample output

```text
KEY TERMS
==================================================

Term One
Definition of term one goes here, with clear explanation.

ASSIGNED READINGS
==================================================

CHAPTER 1 | LESSON 1: FIRST LESSON TITLE
----------------------------------------
Reading Title Here | https://example-resource.org/article
```

## Community contribution

I published the project openly for my cohort. Classmate and co-contributor [C-CHH](https://github.com/C-CHH) forked it and contributed the Windows drag-and-drop launcher and README improvements through a pull request, which I reviewed and merged.
