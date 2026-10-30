import { useState } from 'react'
import { competencies } from '../content/presentation.js'

// Each competency's emphasis in a given year: it leads in "its" year, is
// reinforced (and deepens) after that, and is introduced before it.
const levelOf = (row, year) => (year === row ? 'lead' : year > row ? 'reinforced' : 'introduced')

// The four competencies across four years. Selecting a year brings its column
// forward and explains it; selecting it again shows the whole picture.
export default function Progression({ title, body, prompt, legend, years }) {
  const [active, setActive] = useState(null)

  return (
    <div className="progression">
      <div className="progression-head">
        <h2 className="statement-title reveal">{title}</h2>
        {body && <p className="statement-body reveal" style={{ '--d': 1 }}>{body}</p>}
      </div>

      <div className="matrix reveal" style={{ '--d': 2 }}>
        <table className={active === null ? 'matrix-table' : 'matrix-table has-active'}>
          <caption className="sr-only">Emphasis of each AI competency in each year of the degree</caption>
          <thead>
            <tr>
              <td />
              {years.map((y, i) => (
                <th key={y.label} scope="col" className={active === i ? 'is-active' : undefined}>
                  <button
                    type="button"
                    className="matrix-year"
                    aria-pressed={active === i}
                    onClick={() => setActive(active === i ? null : i)}
                  >
                    {y.label}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {competencies.map((c, row) => (
              <tr key={c.name}>
                <th scope="row" className="matrix-label">
                  <span className="matrix-label-full">{c.name}</span>
                  <span className="matrix-label-short" aria-hidden="true">{c.short}</span>
                </th>
                {years.map((y, col) => {
                  const level = levelOf(row, col)
                  return (
                    <td key={y.label} className={`matrix-cell is-${level}${active === col ? ' is-active' : ''}`}>
                      <span className="matrix-dot" style={{ '--year': col }} aria-hidden="true" />
                      <span className="sr-only">{legend[level]}</span>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="matrix-foot">
          <p className="matrix-note" aria-live="polite">
            {active === null ? prompt : years[active].note}
          </p>
          <ul className="matrix-legend" aria-hidden="true">
            {['lead', 'reinforced', 'introduced'].map((level) => (
              <li key={level} className={`is-${level}`}>
                <span className="matrix-dot" style={{ '--year': 1 }} />
                {legend[level]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
