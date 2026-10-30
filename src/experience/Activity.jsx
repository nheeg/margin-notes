import { useEffect, useRef, useState } from 'react'
import ShapeField, { shapeIndex } from '../components/ShapeField.jsx'

// A short sequence of questions. Choosing an option reveals its feedback; answers
// are kept in memory only and cleared on "Start again" or when the page closes.
export default function Activity({ steps, done, labels }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState({}) // step id -> option id
  const headingRef = useRef(null)
  const moved = useRef(false)

  const finished = stepIndex >= steps.length
  const step = steps[stepIndex]
  const selected = step ? answers[step.id] : null
  const selectedOption = step?.options.find((o) => o.id === selected)

  // The figure follows the most recent answer that names a shape.
  const shape = steps
    .map((s) => s.options.find((o) => o.id === answers[s.id])?.shape)
    .filter(Boolean)
    .at(-1)

  // After moving between steps, put focus on the new heading for keyboard and screen-reader users.
  useEffect(() => {
    if (moved.current) headingRef.current?.focus()
  }, [stepIndex])

  const choose = (id) => setAnswers((a) => ({ ...a, [step.id]: id }))
  const go = (i) => {
    moved.current = true
    setStepIndex(i)
  }
  const restart = () => {
    setAnswers({})
    go(0)
  }

  return (
    <div className="activity">
      <div className="activity-figure">
        <ShapeField index={shape ? shapeIndex(shape) : null} />
      </div>

      {finished ? (
        <div className="activity-step" key="done">
          <h2 className="activity-prompt" ref={headingRef} tabIndex={-1}>
            {done.title}
          </h2>
          <p className="activity-feedback is-shown">{done.body}</p>
          <button type="button" className="button-solid" onClick={restart}>
            {done.restart}
          </button>
        </div>
      ) : (
        <div className="activity-step" key={step.id}>
          {steps.length > 1 && <p className="meta">{labels.progress(stepIndex + 1, steps.length)}</p>}
          <h2 className="activity-prompt" id="activity-prompt" ref={headingRef} tabIndex={-1}>
            {step.prompt}
          </h2>
          {step.hint && <p className="activity-hint">{step.hint}</p>}

          <div className="options" role="group" aria-labelledby="activity-prompt">
            {step.options.map((o) => (
              <button
                key={o.id}
                type="button"
                className="option"
                aria-pressed={selected === o.id}
                onClick={() => choose(o.id)}
              >
                {o.label}
              </button>
            ))}
          </div>

          <p className={selectedOption ? 'activity-feedback is-shown' : 'activity-feedback'} aria-live="polite">
            {selectedOption?.feedback}
          </p>

          <button type="button" className="button-solid" disabled={!selected} onClick={() => go(stepIndex + 1)}>
            {stepIndex === steps.length - 1 ? labels.finish : labels.next}
          </button>
        </div>
      )}
    </div>
  )
}
