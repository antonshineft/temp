# RMA of Michigan — December batch (three versions per asset)

Source: `RMAMI_December_Social_Graphics_Brief.pdf`. All slide copy is the brief's graphic text,
used verbatim. The brief says to prioritise what can be done in the next two weeks, so the first
two posting weeks (Nov 29 – Dec 12) are built first. Weeks 7–9 come next.

Figma: Sandbox page, title "December batch — RMA of Michigan" (node 316:15684).

- Each week is a column with its own "RF …" heading, matching the brief's section names.
- Each asset has rows A / B / C.
- Frames are named `RMA Michigan_Instagram_Dec_<asset>_<version>_<slide>`.

## Status

| Week | Asset | Status |
| --- | --- | --- |
| 5 (Nov 29 – Dec 5) | 1. Giving Tuesday | **On hold** (per brief): placeholder made from the November trend template |
| | 2. New on the Blog: FSA or HSA? (static) | A / B / C built |
| | 3. What Does an IVF Nurse Do? (5-slide carousel) | A / B / C built, using the 8 nurse photos from rmami.com |
| | 4. Trend slot | Placeholder (template) |
| 6 (Dec 6–12) | 1. Universal Health Coverage Day | **On hold** (per brief): placeholder |
| | 2. Your Treatment Plan Can Change (5-slide carousel) | A / B / C built |
| | 3. Ask a Physician: Is IVF the Only Fertility Treatment? | A / B / C built |
| | 4. Trend slot | Placeholder (template) |
| 7–9 (Dec 13–30) | Year-end questions, Embryology, IVF myth, Holiday cheer, Office hours, A Year of Questions, Elizabeth Carr, New Year, 2027 consultation | Next. Week headings are already on the page. |

Previews:
- `previews/dec-w5-fsa-hsa-blog-A-B-C.png`
- `previews/dec-w5-ivf-nurses-A-B-C.png`
- `previews/dec-w6-treatment-plan-A-B-C.png`
- `previews/dec-w6-ask-a-physician-ivf-A-B-C.png`

## Per-version pass: Taste Engine + Impeccable on every version

Each version was checked separately on its render:
- **Taste Engine:** a `lookup_slop` query describing that version's actual layout.
- **Impeccable:** the critique rubric, craft floor and layout/typeset rules (squint test,
  grouping, rhythm, eyebrow ban, one emphasis device).

| Asset · version | Taste Engine (closest slop dimension) | Impeccable finding | Change made |
| --- | --- | --- | --- |
| FSA · A | Footer / final impression: the page ends on the logo after the text block. | "New on the blog" (icon + label) sat above the headline as an eyebrow, which the craft floor bans. | The label now closes the text block as a sign-off under the subtitle. |
| FSA · B | Card treatment: distinction should come from material and hierarchy (no side accent used). | The tag pill above the title was an eyebrow. | The tag moved onto the photo as the blog card's own tag; the title now leads. |
| FSA · C | Typographic play: a one-word size change is a slop move. | "or" was the only variation, and the label was an eyebrow. | "FSA / or HSA?" are now the same size, with "or" varying by weight and tone (Regular, 60%). The label closes the block. |
| Nurses · A | Section layouts: a headshot grid with a headline below is a template. | Squint test: the cover read as a staff directory, with the headline second. | The headline is now a navy 2×2 block inside the wall. The inner pairs stay as they are, because the repetition helps people recognise the series. |
| Nurses · B | Section layouts: a template stack. | Slides 2–4 repeated title → visual → body with a dead band above the logo. Slide 4 had split the brief's sentence into a list. | The body now sits on the bottom line, with the visual centred between title and body. Slide 4 is back to the exact sentence, set over the icon rows. |
| Nurses · C | Typographic play: tone-only dimming. | It used the same emphasis device as Treatment Plan C. | Switched to weight contrast: the headline in Regular, the key phrase in Bold, at full colour. "Thank you" is Bold on slide 5. |
| Plan · A | Section layouts / section transitions. | Rhythm holds: full-bleed slides (1, 3, 5) alternate with split slides (2, 4). Slide 3's text had low contrast over the hand. | Stronger fade behind slide 3's text; line breaks fixed on slides 3 and 5. |
| Plan · B | Section transition: "great" means one continuous element across sections, which this is. | The squint test holds: the headline reads first, the route second. | No structural change. Fixed the line break on the closing slide. |
| Plan · C | Contrast + typographic play. | It shared the dimmed-word device with Nurses · C, and the emphasis worked on only one dimension. | Scale + tone: a small 60% lead-in line with the key phrase at poster size (split over two lines). Highlighter removed, so each slide has one emphasis device. |
| Ask · A | Section transition: a hard break between the photo and the navy. | "Ask a Physician" isn't in the graphic text, so it was an added eyebrow. | Label removed. The photo now fades into the navy answer area. |
| Ask · B | Components: consistent card, distinguished by material. Holds. | The card header continues the November series (it is the note's own header, not an eyebrow). The chips are 5 items, one over the 4-item chunking guide. | No change. The chips are flagged below. |
| Ask · C | Contrast and single focus hold. | The added series label was an eyebrow. | Label removed. The question leads and "No." dominates. |

Taste Engine's brand-asset extraction (2 credits per image) was not run. It extracts a design
system rather than critiquing a design. It can be run on each version if you want a measured
read.

## Process: Impeccable + Taste Engine (tastelabs)

- **Taste Engine:**
  - Slop lookups for each format: team carousel, blog announcement and FAQ/myth.
  - They flagged:
    - template layouts that could come from any builder;
    - centred single columns;
    - the rigid Title / Body / CTA stack;
    - one-side accent borders on cards.
  - Each version below therefore has its own structural idea instead of a shared template.
  - The rmami.com extraction (navy, white, editorial photography with a navy fade) is still the
    brand reference.
- **Impeccable:**
  - Its playbooks (craft floor, layout, typeset, colour, polish) were applied by hand. Its launcher
    is blocked in this environment.
  - Rules carried over:
    - Keep the established world and vary the structure.
    - No decorative eyebrow labels or numbering.
    - No hero-metric template.
    - No glass.
    - One emphasis device per slide.
    - Every slide must still read when blurred.

## System

- **Type:** Lora Bold / SemiBold / Regular (the client's Instagram face). DM Sans only for small
  interface labels (tag pill, badge role line, note-card header).
- **Colour:**
  - Navy #003887, deep navy #062D50 and white. Sand #FFF8F1 only on the note card.
  - **No #F2B489 (peach) anywhere.** Emphasis comes from type, not colour, and each version has
    its own device:
    - Nurses C: weight (Regular headline, Bold key phrase).
    - Plan C: scale + tone (small lead-in at 60%, key phrase at poster size).
    - FSA C: weight + tone on "or".
    - No December frame uses a highlighter.
  - **Contrast check (craft floor):** small captions moved from grey #787C8A (about 4.2:1, below
    the 4.5:1 minimum for small text) to ink #3A3A4A and enlarged by 1–2 px. This covers the
    names on Nurses C1, the badge role lines and the thank-you card names on B5. Text on navy is
    white, with nothing below 60% opacity on large type.
- **Icons:** Lucide (lucide-static v1.72.0, ISC licence), in the colour of their surroundings.
  Layers are named `Lucide / <icon>`.
- **Grid:**
  - 96 px side margins.
  - Headlines start at y 140–176.
  - Content ends at or above y 1060.
  - RMA logo 200 px, centred, y 1140, on every slide.

## The three versions

| Asset | A | B | C |
| --- | --- | --- | --- |
| FSA or HSA? (static) | **Photo-led.** A year-end kitchen-table photo (AI) with a navy fade. "FSA or HSA?" is the display line. | **Article page.** The post looks like the blog article itself: a "New on the blog" tag, the title, then the photo. | **Poster type.** "FSA" over "HSA?" at poster scale, with a small "or" between them. |
| What Does an IVF Nurse Do? (5) | **Team wall.** The cover is a wall of all eight nurses, with the headline as a navy block inside it. Each inner slide features two nurses (every nurse appears), with the copy below. | **ID badges + Lucide.** The cover lays out the eight nurses as staff badges. Slide 2 shows the steps between two appointments (phone, pill, clipboard, message). Slide 3 is a progress track. Slide 4 is the brief's sentence set over four icon rows. Slide 5 is a thank-you card signed with the team's faces. | **Interlocking rings.** Portraits overlap like the two rings in the RMA logo, with names listed below. Inner slides are poster type with weight contrast (Regular headline, Bold key phrase), alternating navy and white. |
| Your Treatment Plan Can Change (5) | **Photo-led.** A plan drawn in pencil, partly erased and redrawn (AI), cropped differently on each slide. The closing slide is a consultation photo (hands only). | **The route.** One line runs across all five slides. A dashed line is the plan as first written; the navy line is the path as it changes: new information bends it, the body detours it, and the goal moves. On the last slide the care team's line joins and runs alongside. | **Poster type, scale + tone.** A small lead-in line, then the key phrase at poster size. Placement alternates between top and bottom. |
| Ask a Physician: Is IVF the only fertility treatment? | **Photo-led.** The question over a consultation photo, which fades into the navy answer area. | **Note card.** Continues the November Ask a Physician note-card look you picked: the question, "No.", then the options. The series name stays in the card header. | **Poster type.** A giant "No." |

## Flags for the client / account team

1. **IVF nurse responsibilities.** Confirm with RMA that the slide copy reflects the IVF nurse
   role (as the brief asks).
2. **Nurse photos** come from rmami.com's staff page and follow the brief's order.
   - Taylor J.'s photo is only 500×500 on the site. Ask RMA for a higher-resolution file.
   - Version B's badges add "RN, IVF Nurse", which is each nurse's title on the website.
3. **No patient information** is visible: the nurse photos are studio headshots, and the AI
   photos show hands only.
4. **Ask a Physician, version B** shows option chips (Ovulation induction, Medication, Surgery,
   IUI, IVF) taken from the caption.
   - They are set as equals so IVF reads as one option, which follows the brief's sensitivity
     note.
   - Remove them if only the graphic text should appear.
5. **Series label.** "Ask a Physician" is not in the brief's graphic text. It now appears only in
   version B's card header, matching the November series. Add it back to A and C if RMA wants
   the series named on every version.
6. **FSA / HSA.** No dates or deadlines are shown on the graphic, because rules and deadlines vary
   by plan.
7. **AI photography:**
   - FSA desk scene.
   - Pencil plan.
   - Consultation (hands only; an earlier take with a blurred face was discarded).
8. **On hold, per the brief:** Giving Tuesday (resource not chosen yet) and Universal Health
   Coverage Day (direction not confirmed). Placeholders hold the brief's graphic text.
9. **Coming next, and what it needs:**
   - Embryology: one confirmed RMA-specific detail.
   - Holiday Cheer: a team or office photo. A branded fallback can be designed without one.
   - Holiday office hours: confirmed hours and after-hours instructions. Until then the layout
     will use clearly marked placeholder hours.
10. **Build kit.** A temporary text layer named "zz build kit (temporary, safe to delete)" sits on
   the Misc. page. It holds reusable layout code for the rest of December and will be removed
   when the batch is done.
