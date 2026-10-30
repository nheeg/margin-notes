import { useActiveSection } from '../hooks/useActiveSection.js'

// Discreet section index fixed to the right edge on wide screens.
export default function SectionRail({ sections }) {
  const active = useActiveSection(sections.map((s) => s.id))

  return (
    <nav className="rail" aria-label="Sections">
      <ol>
        {sections.map((s, i) => (
          <li key={s.id}>
            <a href={`#${s.id}`} aria-current={active === s.id ? 'true' : undefined}>
              <span className="rail-label">{s.label}</span>
              <span className="rail-num">{String(i + 1).padStart(2, '0')}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
