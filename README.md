# WITS 2026 Conference Program

Mobile-friendly, searchable conference program for December 16–18, 2026 at Nova SBE, Lisbon.

The site includes 28 sessions, 115 papers and dissertation proposals, 4 demos, and 21 other activity entries. Visitors can search authors and discussants, filter sessions, save personal selections in their browser, and export them to a calendar.

## Hosting

This is a static website: no package installation or build step is required. For the `wits-2026-program.github.io` repository, enable GitHub Pages from the `main` branch and `/ (root)` folder. The `.nojekyll` file disables Jekyll processing.

## Updating

- `index.html`: page structure and conference links
- `styles.css`: responsive layout and styling
- `app.js`: search, filtering, bookmarks, presenter instructions, and calendar export
- `WITS-2026-Tentative-Program.pdf`: downloadable conference program
- `program.json`: structured conference data
- `program-data.js`: the same data as a buildless JavaScript payload

Keep both data files synchronized. The extractor in `scripts/extract_program.py` can regenerate them from the original document layout with `python scripts/extract_program.py /path/to/program.docx` (requires lxml). Review revised document structures, event times, and room assignments before publishing.

All times use Europe/Lisbon. Individual presentation times are not inferred; calendar exports use session blocks. Presenter markings and unassigned discussants are preserved from the supplied program.

## Assets

The WITS wordmark and Lisbon image come from https://witsconf.org/. Conference and venue links point to the official WITS website.
