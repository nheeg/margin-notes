# Margin — hackathon starter

A small Vite + React site with two pages that share one look:

| URL            | Page                  | Built for                                       |
| -------------- | --------------------- | ----------------------------------------------- |
| `/`            | Presentation          | Laptop or projector; scroll through a ~5-minute pitch |
| `/experience/` | Audience experience   | Phones; a short tap-through activity (e.g. via QR code) |

The pages run independently: the audience page works on its own while the presentation is on screen.
There are no accounts, APIs, databases, tracking or external services. Answers on the audience page stay in the browser and are gone when the tab closes.

## Run it locally

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

- Presentation: http://localhost:5174/
- Audience page: http://localhost:5174/experience/

To try the audience page on a phone on the same Wi-Fi, run `npm run dev -- --host` and open the "Network" address it prints.

## Build for production

```bash
npm run build     # outputs static files to dist/
npm run preview   # serves dist/ locally to check the build
```

## Hosting settings

This is a static site, so any static host works (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

| Setting          | Value           |
| ---------------- | --------------- |
| Framework preset | Vite            |
| Install command  | `npm install`   |
| Build command    | `npm run build` |
| Output directory | `dist`          |
| Node version     | 20 or later     |

On Vercel these settings are already in `vercel.json` (which also redirects `/experience` to `/experience/`),
so importing the GitHub repository is enough; every push to `main` redeploys.

No environment variables or rewrite rules are needed. Each page is a real HTML file in the build
(`dist/index.html` and `dist/experience/index.html`), so both URLs work when opened directly or refreshed.
`base: './'` in `vite.config.js` keeps asset paths relative, so the build also works from a sub-path.

## Project structure

```
index.html                    Presentation page shell
experience/index.html         Audience page shell
public/                       Static files copied as-is (favicon; later the QR image)
src/
  main.jsx                    Presentation entry
  experience.jsx              Audience entry
  mount.jsx                   Shared start-up (global styles + render)

  content/                    ← all wording lives here
    site.js                   Shared: name, header label, footer line
    presentation.js           The presentation's sections, in order
    experience.js             The audience page copy and activity steps

  pages/
    Presentation.jsx          Header, sections, section rail, footer
    Experience.jsx            Header, intro, activity, footer

  presentation/               Presentation building blocks
    Section.jsx               Frame for every section (number + label in the margin)
    kinds.js                  Which component draws each section "kind"
    Opening.jsx, Hero.jsx     The original Margin intro + figure
    Statement.jsx             One large sentence + paragraph (+ optional still figure)
    Points.jsx                Title, optional paragraph, numbered points
    Invite.jsx                Link to the audience page (+ optional QR image)
    SectionRail.jsx           Small section index on wide screens
    presentation.css

  experience/
    Activity.jsx              Question → choice → feedback → next, then a thank-you
    experience.css

  components/                 Shared by both pages
    Header.jsx, Footer.jsx, Corners.jsx
    ShapeField.jsx            The animated field of 48 points and its shapes
    Study.jsx                 Fig. 1: ShapeField + caption + "Try another"
    study.css

  hooks/                      Reduced-motion, reveal-on-scroll, active section
  styles/
    tokens.css                Colours, fonts, spacing (dark by default)
    base.css                  Reset, page frame, header, footer, buttons
```

## Changing the presentation (`/`)

Edit **`src/content/presentation.js`**. Each entry in `sections` is one section, top to bottom.

The current narrative:

1. **Opening** — the Margin headline and the interactive figure (Fig. 1).
2. **Premise** — "The points don't make the shape."
3. **Invitation** — "Your turn." and a link panel to the audience page (deliberately no preview of the activity).
4. **Reflection** — "There was no right answer."
5. **Closing** — Notice / Try / Keep.
6. **Last word** — "What will you give shape to?"

Keep each section to one line and, at most, one short sentence beneath it.

- **Reorder / remove:** move or delete entries. Numbers (01, 02…) and the side rail update automatically.
- **Edit:** change `label`, `title`, `body`, `items` or `steps`.
- **Add:** copy an entry, give it a new `id`, and pick a `kind`:
  - `opening` — the Margin headline and interactive figure
  - `statement` — one large line and an optional short paragraph. `title` can be an array of lines
    (the last is italic, like the opening); `emphasis: true` uses opening-sized type;
    `figure: { label, caption }` adds a still field of points beside it
  - `points` — a title, optional `body` paragraph, and up to three numbered points
  - `invite` — a link panel to the audience page; optional `steps` preview list and `qr` image
- **New layout:** create a component in `src/presentation/`, register it in `src/presentation/kinds.js`,
  then use its name as a `kind`. Add `className="reveal"` to elements that should fade in on scroll.

The audience link shows the page's address, worked out automatically from wherever the site is running.

**Adding a QR code** (only once the public URL is confirmed): generate a QR code for that URL, save it as
`public/qr.svg` (or `.png`), and add `qr: './qr.svg'` to the `your-turn` (Invitation) section. It appears below the link panel.

## Changing the audience experience (`/experience/`)

Edit **`src/content/experience.js`**.

- **Copy:** `title`, `lede`, `footnote`, and `backLink` (the "← Back to Margin" link in the header).
- **Questions:** each item in `activity.steps` has a `prompt`, optional `hint`, and `options`.
  Each option has a `label` and the `feedback` revealed when it's tapped. Add or remove steps freely;
  "Question 1 of N" appears automatically when there's more than one.
- **Figure:** an option's optional `shape` (`Ring`, `Wave`, `Spiral` or `Knot`) reshapes the figure.
- **Ending:** `activity.done`.

For a different kind of activity (a slider, a quiz with scoring, a simulation), replace
`src/experience/Activity.jsx` or add a new component beside it and use it in `src/pages/Experience.jsx`.

## Look and feel

- **Colours, fonts, spacing:** `src/styles/tokens.css`. Dark is the default; a light palette is
  included and switches on with `<html data-theme="light">`.
- **New figure shapes:** add an entry to `SHAPES` in `src/components/ShapeField.jsx`.

Both pages respect the viewer's reduced-motion setting, work with the keyboard, and use system fonts.
