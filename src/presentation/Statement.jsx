import ShapeField from '../components/ShapeField.jsx'

// A large line and an optional short paragraph. `title` may be an array of lines;
// the last line is set in italic. With `figure`, a still field of unformed points
// sits beside the text. `emphasis` uses opening-sized type.
export default function Statement({ title, body, figure, emphasis }) {
  const lines = Array.isArray(title) ? title : [title]
  const classes = ['statement', figure && 'has-figure', emphasis && 'is-emphasis'].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <div className="statement-text">
        <h2 className="statement-title reveal">
          {lines.map((line, i) => (
            <span key={i} className="statement-line">
              {line}
            </span>
          ))}
        </h2>
        {body && <p className="statement-body reveal" style={{ '--d': 1 }}>{body}</p>}
      </div>
      {figure && (
        <figure className="statement-figure reveal" style={{ '--d': 2 }}>
          <ShapeField index={null} />
          <figcaption className="study-caption">
            <span>
              <span className="meta">{figure.label}</span> {figure.caption}
            </span>
          </figcaption>
        </figure>
      )}
    </div>
  )
}
