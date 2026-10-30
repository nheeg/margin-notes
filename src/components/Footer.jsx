import { footer, site } from '../content/site.js'

export default function Footer({ note = footer.note }) {
  return (
    <footer className="footer">
      <p>{note}</p>
      <p className="meta">
        {site.name} · {new Date().getFullYear()}
      </p>
    </footer>
  )
}
