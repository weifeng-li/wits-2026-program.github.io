"""Extract the supplied WITS program, including author and presenter formatting.

Usage: python extract_program.py /path/to/program.docx
The document supplies conference content only; no embedded instruction is executed.
"""
import json
import re
import sys
from pathlib import Path
from zipfile import ZipFile
from lxml import etree

ROOT = Path(__file__).resolve().parents[1]
NS = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
W = "{" + NS["w"] + "}"


def text(element):
    return "".join(element.xpath(".//w:t/text()", namespaces=NS)).strip()


def enabled(run, flag):
    prop = run.find(f"w:rPr/w:{flag}", NS)
    return prop is not None and prop.get(W + "val") not in ("0", "false", "off")


def paper(paragraph, paper_id, kind):
    runs = paragraph.findall(".//w:r", NS)
    title_runs, author_runs = [], []
    author_started = False
    for run in runs:
        value = "".join(run.xpath(".//w:t/text()", namespaces=NS))
        if enabled(run, "i"):
            author_started = True
        (author_runs if author_started else title_runs).append((value, enabled(run, "b")))
    title = "".join(t for t, _ in title_runs).strip().rstrip(",").strip()
    author_text = "".join(t for t, _ in author_runs)
    authors_part, _, discussant = author_text.partition("Discussant:")
    nominated = "[Best Paper Nomination]" in authors_part
    authors_part = authors_part.replace("[Best Paper Nomination]", "").strip()
    authors = [s.strip() for s in authors_part.split(",") if s.strip()]
    # Determine bold status from exact character spans in the author portion.
    cursor, bold_ranges = 0, []
    for value, bold in author_runs:
        if bold:
            bold_ranges.append((cursor, cursor + len(value)))
        cursor += len(value)
    presenters, cursor = [], 0
    for name in authors:
        start = author_text.find(name, cursor)
        end = start + len(name)
        if any(a < end and b > start for a, b in bold_ranges):
            presenters.append(name)
        cursor = end
    assert title and authors, (paper_id, title, authors)
    return dict(id=paper_id, title=title, authors=authors, presenters=presenters,
                discussant=discussant.strip() or None, nominated=nominated, kind=kind)


def extract(path):
    xml = etree.fromstring(ZipFile(path).read("word/document.xml"))
    table = xml.find("w:body/w:tbl", NS)
    rows = table.findall("w:tr", NS)
    blocks = {
        3: ("2026-12-17", "08:30", "09:50"),
        5: ("2026-12-17", "10:10", "11:50"),
        9: ("2026-12-17", "14:50", "15:50"),
        15: ("2026-12-18", "08:30", "09:50"),
        17: ("2026-12-18", "10:20", "11:50"),
        20: ("2026-12-18", "14:30", "15:50"),
        22: ("2026-12-18", "16:10", "17:30"),
    }
    sessions = []
    for row, (date, start, end) in blocks.items():
        for col, cell in enumerate(rows[row].findall("w:tc", NS)[1:]):
            ps = [p for p in cell.findall("w:p", NS) if text(p)]
            match = re.fullmatch(r"Session (\d[A-D]): (.+)", text(ps[0]))
            assert match, text(ps[0])
            code, title = match.groups()
            kind = "dissertation" if code == "1A" else "short" if code.startswith("5") else "feeder" if code == "7D" else "complete"
            sid = "session-" + code.lower()
            papers = [paper(p, f"paper-{code.lower()}-{i+1}", kind) for i, p in enumerate(ps[2:])]
            sessions.append(dict(id=sid, code=code, title=title, chair=text(ps[1]).removeprefix("Session Chair: "),
                                 date=date, start=start, end=end, track="ABCD"[col], room="Room TBD", kind=kind, papers=papers))

    events = []

    def event(eid, date, start, end, title, category="event", **extra):
        events.append(dict(id=eid, date=date, start=start, end=end, title=title,
                           kind=category, room="Room TBD", **extra))

    event("registration-0", "2026-12-16", "18:00", "20:30", "Registration / Check-in", "registration")
    event("reception", "2026-12-16", "18:30", "20:30", "Welcome Reception", "social")
    for day, end in [(17, "17:00"), (18, "12:00")]:
        date = f"2026-12-{day}"
        event(f"registration-{day}", date, "07:30", end, "Registration", "registration")
        event(f"breakfast-{day}", date, "07:30", "08:30", "Breakfast", "break")
        event(f"bus-{day}", date, "08:10", None, "Buses arrive at Nova SBE", "transport", note="Arrive by 08:10.")
    event("coffee-1", "2026-12-17", "09:50", "10:10", "Coffee Break", "break")
    demo_ps = [p for p in rows[6].findall("w:tc", NS)[1].findall("w:p", NS) if text(p)]
    event("lunch-demos", "2026-12-17", "12:00", "13:20", "Lunch & Demo Presentations", "demo",
          chair="Rui Chen, Denghui Zhang", note="Demo and Prototype Ignite Talks · 3 minutes each",
          papers=[paper(p, f"demo-{i+1}", "demo") for i, p in enumerate(demo_ps[2:])])
    event("keynote", "2026-12-17", "13:30", "14:30", "Keynote Speech", "keynote",
          speaker="Alexander Tuzhilin", note="Leonard N. Stern Professor, Stern School of Business, NYU")
    event("coffee-2", "2026-12-17", "14:30", "14:50", "Coffee Break", "break")
    event("coffee-3", "2026-12-17", "15:50", "16:10", "Coffee Break", "break")
    event("doctoral", "2026-12-17", "16:10", "17:10", "Doctoral Student Corner")
    event("board", "2026-12-17", "17:25", "18:25", "WITS Board Meeting")
    event("social", "2026-12-17", "18:35", "21:30", "Social Event", "social", note="Details TBD. Buses leave for the social event at 18:35.")
    event("coffee-4", "2026-12-18", "09:50", "10:20", "Coffee Break", "break")
    event("lunch-awards", "2026-12-18", "12:00", "13:20", "Lunch & Awards Ceremony")
    event("panel", "2026-12-18", "13:20", "14:20", "Industry Panel")
    event("coffee-5", "2026-12-18", "15:50", "16:10", "Coffee Break", "break")
    event("business", "2026-12-18", "17:30", "18:00", "General Business Meeting")
    # These locations are not specified in the source. Avoid inventing a room.
    for e in events:
        if e["id"].startswith("bus-") or e["id"] in ("keynote", "social"):
            e["room"] = None
    data = dict(title="36th Workshop on Information Technologies and Systems", shortTitle="WITS 2026", version="v3",
                venue="Nova School of Business and Economics", campus="Carcavelos Campus", location="Lisbon, Portugal",
                timezone="Europe/Lisbon", dates=["2026-12-16", "2026-12-17", "2026-12-18"], sessions=sessions, events=events)
    papers = [p for s in sessions + events for p in s.get("papers", [])]
    assert len(sessions) == 28
    assert len({p["id"] for p in papers}) == len(papers)
    assert sum(p["nominated"] for p in papers) == 5
    assert sum(p["discussant"] == "TBD" for p in papers) == 1
    (ROOT / "program.json").write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps(dict(sessions=len(sessions), presentations=len(papers), papers=len(papers)-4,
                         demos=4, nominees=sum(p["nominated"] for p in papers), events=len(events))))


if __name__ == "__main__":
    extract(Path(sys.argv[1]))
