import { useReveal } from '../hooks/useReveal.js'
import { SECTION_KINDS } from './kinds.js'

// Shared frame for every section: number and label in the margin, content beside it.
// Elements with className "reveal" inside a section fade in when it scrolls into view.
export default function Section({ section, number }) {
  const [ref, visible] = useReveal()
  const Body = SECTION_KINDS[section.kind]

  if (!Body) {
    console.warn(`Unknown section kind "${section.kind}" for section "${section.id}"`)
    return null
  }

  return (
    <section
      id={section.id}
      ref={ref}
      aria-label={section.label}
      className={`section section--${section.kind}${visible ? ' is-visible' : ''}`}
    >
      <div className="section-margin" aria-hidden="true">
        <span className="section-num">{String(number).padStart(2, '0')}</span>
        <span className="meta">{section.label}</span>
      </div>
      <div className="section-body">
        <Body {...section} />
      </div>
    </section>
  )
}
