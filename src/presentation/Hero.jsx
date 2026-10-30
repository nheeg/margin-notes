export default function Hero({ eyebrow, title, lede }) {
  return (
    <div className="hero">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="hero-title">
        {title.map((line, i) => (
          <span key={i} className="hero-line" style={{ '--i': i }}>
            {line}
          </span>
        ))}
      </h1>
      <p className="hero-lede">{lede}</p>
    </div>
  )
}
