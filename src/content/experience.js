// The audience page at /experience/.
//
// The activity is a list of steps. Each step is a question with options; choosing
// an option reveals its feedback. Add, remove or rewrite steps freely.
// An option's optional `shape` (Ring, Wave, Spiral or Knot) sets the figure above
// the question. Nothing is stored or sent anywhere: answers live only in the page.

export const experience = {
  backLink: '← Back to Margin',
  eyebrow: 'For the audience',
  title: 'Two questions about learning AI.',
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
        id: 'start',
        prompt: 'A first-year business student opens an AI tool for the first time. Where should they start?',
        hint: 'Tap one. You can change your mind.',
        options: [
          {
            id: 'effective',
            label: 'Using it well',
            shape: 'Ring',
            feedback: 'A natural first step. Fluency and good habits make everything after them easier.',
          },
          {
            id: 'responsible',
            label: 'Using it responsibly',
            shape: 'Wave',
            feedback: 'Early guardrails matter. Knowing what to avoid is part of using it well.',
          },
          {
            id: 'critical',
            label: 'Questioning it',
            shape: 'Spiral',
            feedback: 'Healthy doubt from day one. Bias and limits are easier to spot once you start looking.',
          },
          {
            id: 'strategic',
            label: 'Creating value with it',
            shape: 'Knot',
            feedback: 'Ambitious. It tends to land best once the basics are second nature.',
          },
        ],
      },
      {
        id: 'leave',
        prompt: 'Four years later, which of these should they have left behind?',
        options: [
          {
            id: 'effective',
            label: 'Using it well',
            feedback: 'Still there in Year 4, just quicker and more assured.',
          },
          {
            id: 'responsible',
            label: 'Using it responsibly',
            feedback: 'Never finished. The questions only get harder as the stakes rise.',
          },
          {
            id: 'critical',
            label: 'Questioning it',
            feedback: 'Strategy without scrutiny is a risk. This one stays.',
          },
          {
            id: 'strategic',
            label: 'Creating value with it',
            feedback: 'This is where Year 4 leans most, not least.',
          },
          {
            id: 'none',
            label: 'None of them',
            feedback: 'Exactly. The emphasis moves each year; none of the four is left behind.',
          },
        ],
      },
    ],
    done: {
      title: 'Four competencies. Every year.',
      body: 'The emphasis moves from using AI, to using it responsibly, to questioning it, to using it strategically. None of them is ever finished.',
      restart: 'Start again',
    },
  },
}
