// The presentation at /, top to bottom.
//
// Each entry is one section. `kind` picks its layout (see src/presentation/kinds.js):
//   opening    headline + interactive figure
//   statement  a large line and an optional short paragraph. `title` can be a string or
//              an array of lines (the last line is set in italic, like the opening).
//              Optional: `emphasis: true` for opening-sized type; `figure` adds a still
//              field of points beside the text.
//   points     a title, optional paragraph, and up to three short numbered points
//   invite     link to the audience page, with an optional preview list (`steps`)
//              and optional QR image (`qr`, e.g. './qr.svg' placed in public/)
//
// Reorder, edit or delete entries freely; section numbers update automatically.
// `id` becomes the section's anchor (e.g. /#premise).

export const sections = [
  {
    id: 'opening',
    kind: 'opening',
    label: 'Opening',
    hero: {
      eyebrow: 'A working space',
      title: ['Most things', 'start in the margin.'],
      lede: "A quiet place for ideas that aren't finished yet.",
    },
    study: {
      label: 'Fig. 1',
      caption: 'Forty-eight points, looking for a shape.',
      action: 'Try another',
    },
  },
  {
    id: 'premise',
    kind: 'statement',
    label: 'Premise',
    title: "The points don't make the shape.",
    body: 'We do. Usually before we can say why.',
  },
  {
    id: 'your-turn',
    kind: 'invite',
    label: 'Invitation',
    title: 'Your turn.',
    body: 'Open it on your phone. One minute, nothing saved.',
    linkLabel: 'Audience page',
  },
  {
    id: 'reflection',
    kind: 'statement',
    label: 'Reflection',
    title: 'There was no right answer.',
    body: 'Only the way you got there.',
  },
  {
    id: 'closing',
    kind: 'points',
    label: 'Closing',
    title: 'How ideas take shape.',
    items: [
      { title: 'Notice', body: 'Start with the question.' },
      { title: 'Try', body: 'Make it rough. Let it be wrong.' },
      { title: 'Keep', body: 'Hold on to what holds up.' },
    ],
  },
  {
    id: 'last-word',
    kind: 'statement',
    label: 'Last word',
    title: ['What will you', 'give shape to?'],
    emphasis: true,
  },
]
