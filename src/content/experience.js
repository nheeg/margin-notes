// The audience page at /experience/.
//
// The activity is a list of steps. Each step is a question with options; choosing
// an option reveals its feedback. Add, remove or rewrite steps freely.
// An option's optional `shape` (Ring, Wave, Spiral or Knot) sets the figure above
// the question. Nothing is stored or sent anywhere: answers live only in the page.

export const experience = {
  backLink: '← Back to Margin',
  eyebrow: 'For the audience',
  title: 'A minute, and a choice or two.',
  lede: 'Tap an answer to see what it reveals. Nothing you choose is saved or sent anywhere.',
  footnote: 'No sign-in, nothing stored. Close the tab whenever you like.',

  activity: {
    labels: {
      progress: (n, total) => `Question ${n} of ${total}`,
      next: 'Continue',
      finish: 'Finish',
    },
    steps: [
      {
        id: 'shape',
        prompt: 'Which shape feels most like an idea taking form?',
        hint: 'Tap one. You can change your mind.',
        options: [
          { id: 'ring', label: 'Ring', shape: 'Ring', feedback: 'Closed and steady: an idea that already knows its edges.' },
          { id: 'wave', label: 'Wave', shape: 'Wave', feedback: 'Still moving: an idea that changes as it travels.' },
          { id: 'spiral', label: 'Spiral', shape: 'Spiral', feedback: 'Small at the centre, widening: an idea that grows outward.' },
          { id: 'knot', label: 'Knot', shape: 'Knot', feedback: 'Looping back on itself: an idea worth untangling.' },
        ],
      },
      {
        id: 'how',
        prompt: 'How did you choose?',
        options: [
          { id: 'instinct', label: 'Instinct', feedback: 'First impressions are data too.' },
          { id: 'reasoning', label: 'Reasoning', feedback: 'You looked for a rule, and found one.' },
          { id: 'both', label: 'A bit of both', feedback: 'Most good decisions are.' },
        ],
      },
    ],
    done: {
      title: 'Thank you.',
      body: "That's all for now. You can look up again.",
      restart: 'Start again',
    },
  },
}
