// The presentation at /, top to bottom.
//
// Each entry is one section. `kind` picks its layout (see src/presentation/kinds.js):
//   opening      headline + interactive figure
//   statement    a large line and an optional short paragraph. `title` can be a string or
//                an array of lines (the last line is set in italic, like the opening).
//                Optional: `emphasis: true` for opening-sized type; `figure` adds a still
//                field of points beside the text.
//   points       a title, optional paragraph, and up to four short numbered points
//                (each may have a small `tag` above its title)
//   progression  the four-competency, four-year grid; tap a year to focus it
//   invite       link to the audience page, with an optional preview list (`steps`)
//                and optional QR image (`qr`, e.g. './qr.svg' placed in public/)
//
// Reorder, edit or delete entries freely; section numbers update automatically.
// `id` becomes the section's anchor (e.g. /#framework).

// The four competencies, in the order their emphasis peaks (Year 1 to Year 4).
// Used by both the framework and progression sections.
export const competencies = [
  {
    name: 'Effective use',
    short: 'Effective',
    body: 'General AI skills, and the working habits that make them reliable.',
  },
  {
    name: 'Responsible use',
    short: 'Responsible',
    body: 'What appropriate use looks like, and the mistakes worth avoiding.',
  },
  {
    name: 'Critical evaluation',
    short: 'Critical',
    body: 'Seeing the biases and limits, and weighing the impact of using AI at all.',
  },
  {
    name: 'Strategic use',
    short: 'Strategic',
    body: 'Creating value in HR, marketing and beyond: leading change, meeting resistance, shifting boundaries.',
  },
]

export const sections = [
  {
    id: 'opening',
    kind: 'opening',
    label: 'Opening',
    hero: {
      eyebrow: 'AI in the business degree',
      title: ['Learning AI', 'takes four years.'],
      lede: 'A proposal for how undergraduate business students grow from using AI well to using it wisely.',
    },
    study: {
      label: 'Fig. 1',
      caption: 'The same points, read four ways.',
      action: 'Try another',
    },
  },
  {
    id: 'premise',
    kind: 'statement',
    label: 'Premise',
    title: 'Not four courses. One thread.',
    body: 'Every competency runs through every year. What changes is the emphasis, and the depth.',
  },
  {
    id: 'framework',
    kind: 'points',
    label: 'Framework',
    title: 'Four competencies.',
    items: competencies.map((c, i) => ({
      tag: `Leads in Year ${i + 1}`,
      title: c.name,
      body: c.body,
    })),
  },
  {
    id: 'progression',
    kind: 'progression',
    label: 'Four years',
    title: 'All four, every year.',
    body: 'One leads. The others keep going, a little deeper each time.',
    prompt: 'Select a year to see where the emphasis sits.',
    legend: { lead: 'Emphasis', reinforced: 'Reinforced', introduced: 'Introduced' },
    years: [
      { label: 'Year 1', note: 'Effective use leads. Responsible, critical and strategic use are introduced alongside it.' },
      { label: 'Year 2', note: 'Responsible use leads. Effective use deepens; critical and strategic use keep building.' },
      { label: 'Year 3', note: 'Critical evaluation leads. Effective and responsible use are reinforced at greater depth.' },
      { label: 'Year 4', note: 'Strategic use leads, drawing on everything that came before it.' },
    ],
  },
  {
    id: 'your-turn',
    kind: 'invite',
    label: 'Invitation',
    title: 'Your turn.',
    body: 'Open it on your phone. Two questions, under a minute, nothing saved.',
    linkLabel: 'Audience page',
  },
  {
    id: 'takeaway',
    kind: 'statement',
    label: 'Takeaway',
    title: ['From using AI', 'to thinking with it.'],
    emphasis: true,
  },
]
