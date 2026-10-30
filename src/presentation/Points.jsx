export default function Points({ title, body, items }) {
  const offset = body ? 2 : 1

  return (
    <div className="points">
      {(title || body) && (
        <div className="points-head">
          {title && <h2 className="points-title reveal">{title}</h2>}
          {body && <p className="statement-body reveal" style={{ '--d': 1 }}>{body}</p>}
        </div>
      )}
      <ol className="points-list" data-count={items.length}>
        {items.map((item, i) => (
          <li key={item.title} className="point reveal" style={{ '--d': i + offset }}>
            <span className="point-num">
              {String(i + 1).padStart(2, '0')}
              {item.tag && <span className="point-tag"> · {item.tag}</span>}
            </span>
            <h3 className="point-title">{item.title}</h3>
            <p className="point-body">{item.body}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
