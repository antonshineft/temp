# RMA of Michigan — November trend slots (3 posts × 3 versions)

Source: `RMA_SCF_Trend_Slots_November.pdf`, RMAMI section only (the SpringCreek Fertility concepts
were not built). All slide copy is the PDF's graphic text, verbatim.

Figma: Sandbox page, section "Trend slots — November (RMA)" (node 233:6440).
Each post has three rows (A, B, C), one slide per column, 1080×1350. Frames are named
`RMA Michigan_Instagram_Trend Nov_<post>_<version>_<slide>`.

## Round 3 — Impeccable + Taste Engine rework (current)

Rounds 1 and 2 were replaced. This round used two design tools:

- **Taste Engine (tastelabs).**
  - Its slop lookup flagged the patterns round 2 still had: the same Title / Body / visual stack
    on every slide, centred single columns, and template layouts.
  - A website extraction of rmami.com confirmed the brand world:
    - Navy #062D50 on white, with sand, aqua and peach #F2B489 accents.
    - Editorial photography with a navy fade.
- **Impeccable (pbakaus/impeccable).**
  - Its command-line launcher was blocked in this environment, so its playbooks (craft floor,
    typeset, layout, colour, bolder, polish, persuade mode) were applied by hand.
  - Rules taken from it:
    - Inherit the established world and vary the structure.
    - No eyebrow labels or decorative numbering.
    - No hero-metric template.
    - No cream + italic serif + hairline "AI editorial" cluster.
    - One accent colour.
    - Every slide must still read when blurred: one primary element, then the support.

### System (all 57 slides)

- **Type:** Lora Bold / SemiBold / Regular, the face on the client's own Instagram (page "Sept-Oct
  RMA Content"). No italics. DM Sans only inside interface mock-ups.
- **Colour:**
  - Navy #003887 (client Instagram), deep navy #062D50 (rmami.com) and white.
  - **Peach #F2B489** is the single accent, taken from rmami.com. It is used only on navy (and as
    a highlighter on white), where it has contrast.
- **Grid:**
  - 96 px side margins.
  - Headline top at y 176.
  - All content ends at or above y 1060.
  - RMA logo 200 px wide, centred, y 1140, on every slide.
  - No progress rail.
  - A geometry audit and a visual review were done on every slide.

### The three versions

| Version | Idea | 50% treatment (post 1, slide 4) |
| --- | --- | --- |
| **A · Photo-led** | Real-feeling photography with the client's navy fade (left, top or bottom). Four new AI photos: a laptop late at night, a consult desk, a lab, a phone in bed. | "50%" in peach at poster size, then the sentence it belongs to. No chart. |
| **B · Annotated evidence** | White pages that look fact-checked by hand: navy pen circles, underlines, ticks, crosses and boxes, plus a peach highlighter. Screenshots are the evidence. | Ten AI reply bubbles, five crossed out. |
| **C · Poster type** | Alternating navy and white fields, with poster-scale Lora carrying the message. No imagery. | The numeral straddles a frame split exactly half navy, half white. |

| Post | A · Photo-led | B · Annotated evidence | C · Poster type |
| --- | --- | --- | --- |
| 1. AI vs. Your Fertility Specialist (6) | The AMH question as a chat bubble over the laptop photo. "AI can help with" and "Your specialist can" in two photo halves. The checklist sits under a consult-desk photo strip. | The cover question circled. A chat screenshot with the typing dots circled. Ticks for AI, a hand-drawn box for the specialist. Empty checkboxes for "Before trusting an answer, ask". | The question set as a pull quote. The specialist half sits on a navy field. The closing line has peach on navy. |
| 2. NIH Women's Health Division (6) | Lab photography, with the date in peach. A timeline with peach nodes over the photo. A photo strip above the research-areas list. | A cut-out of the order's title on the cover. The date and "Infertility" circled. A pen-drawn timeline. A ticked list of areas. | "October 19, 2026" and "Infertility" at poster scale. The timeline is set as three peach headings on navy. |
| 3. Before You Believe That Fertility TikTok (7) | Each check is a full-screen Reel with an RMA fact-check sheet sliding up: a navy check for checks 1–2, a peach caution for 3–5. Check 2 is a search screen. | Reel screenshots with the pen pointing at what to check: the handle, the sources, the caption, "View product", "Day 12". The close circles the like count. | Giant check numerals 1–5 bleed off the top right, with a check or caution mark. |

Previews (rows A / B / C):
- `previews/trend-nov-1-ai-vs-specialist-A-B-C.png`
- `previews/trend-nov-2-nih-explainer-A-B-C.png`
- `previews/trend-nov-3-fertility-tiktok-A-B-C.png`

### History

- **Round 1:** glass panels and placeholder bars. The client said it looked "very AI".
- **Round 2:** a cream / navy editorial rebuild with italic accents and a progress rail.
- Feedback carried into round 3:
  - No circle chart for 50%.
  - A different 50% approach per version.
  - No meaningless decorative circles.
  - The Reels must look real.

## Flags for the client / account team

1. **Sources.** The PDF lists "Source: URL" without the links. Check these against the real
   sources before publishing:
   - the 50% figure (post 1);
   - the executive-order details (post 2);
   - the 37% TikTok finding (post 3 caption).

   Post 1 slide 4 shows "ASRM 2026 Scientific Congress research." as written.
2. **Post 1, slide 2.**
   - "An example question … that someone might enter into an AI tool" reads as a note to the
     designer, so it is not on the graphic.
   - Only the one example question supplied is used. The AI reply is shown as a typing indicator.
3. **Post 2, slide 2 wording.** "A new executive order is passed": executive orders are signed,
   not passed, and slide 3 says "signed". Suggest "signed".
4. **Post 2, version B cover.** The order title ("Advancing Women's Health to Improve Outcomes in
   All Phases of Life") comes from the brief's background paragraph, not the slide copy. Remove
   it if only graphic text should appear.
5. **Post 3 phone screens are mock-ups.**
   - The UI is modelled on Instagram Reels (the post is about TikTok; the user asked for "reels").
     No platform logos are used.
   - Handles (ttc.notes, wellness.with.you, the.supplement.shelf), captions and counts are made
     up. Captions are deliberately neutral so the post does not repeat a misleading claim.
   - Check the handles do not match real accounts.
6. **Photography is AI-generated.**
   - Version A's four photos (laptop, consult desk, lab, phone in bed) show hands and partial
     figures only, with no identifiable faces.
   - The three Reel stills (creator setup, wellness flat lay, supplement bottle) show objects
     only.
7. **Peach accent.** Peach #F2B489 is from rmami.com but is not yet on the Instagram feed.
   Confirm it is welcome there, or swap it for white.
8. **Trend-slot dates.** The PDF does not say which week each concept is for. Confirm the slots.
