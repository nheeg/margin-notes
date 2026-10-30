import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js'
import ShapeField, { shapeAt } from './ShapeField.jsx'

// Fig. 1: the figure with its caption and "Try another" control.
export default function Study({ label, caption, action }) {
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(null) // null = unformed, before the first shape settles

  // Let the first shape settle shortly after load.
  useEffect(() => {
    const id = setTimeout(() => setIndex(0), reduced ? 0 : 500)
    return () => clearTimeout(id)
  }, [reduced])

  const shape = shapeAt(index)

  return (
    <figure className="study">
      <ShapeField index={index} />
      <figcaption className="study-caption">
        <span>
          <span className="meta">{label}</span> {caption}
        </span>
        <span className="study-controls">
          <span className="meta" aria-live="polite">
            {shape ? `No. ${String(index + 1).padStart(2, '0')} · ${shape.name}` : 'Gathering…'}
          </span>
          <button type="button" className="button" onClick={() => setIndex((i) => (i ?? -1) + 1)}>
            {action}
            <span aria-hidden="true"> →</span>
          </button>
        </span>
      </figcaption>
    </figure>
  )
}
