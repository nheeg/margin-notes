import { site } from '../content/site.js'

// Wordmark on the left; whatever the page passes as children on the right.
export default function Header({ children }) {
  return (
    <header className="header">
      <span className="wordmark">
        <span className="wordmark-rule" aria-hidden="true" />
        {site.name}
      </span>
      <div className="header-aside">{children}</div>
    </header>
  )
}
