import Corners from '../components/Corners.jsx'

// Points the audience to /experience/. The address is worked out from wherever
// the presentation is running, so it is correct locally and once deployed.
// `qr` (optional) is the path to a real QR image, e.g. './qr.svg' in public/.
export default function Invite({ title, body, steps, linkLabel, qr }) {
  const url = new URL('./experience/', window.location.href)
  const address = `${url.host}${url.pathname.replace(/\/$/, '')}`
  // Allow long addresses to wrap only after dots and before slashes.
  const addressParts = address.split(/(?<=\.)|(?=\/)/)

  return (
    <div className="invite">
      <div className="invite-text">
        <h2 className="statement-title reveal">{title}</h2>
        {body && <p className="statement-body reveal" style={{ '--d': 1 }}>{body}</p>}
        {steps && (
          <ol className="invite-steps reveal" style={{ '--d': 2 }}>
            {steps.map((step, i) => (
              <li key={step}>
                <span className="point-num">{String(i + 1).padStart(2, '0')}</span>
                {step}
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className="invite-access reveal" style={{ '--d': 2 }}>
        <a className="invite-link" href="./experience/">
          <span className="meta">{linkLabel}</span>
          <span className="invite-address">
            {addressParts.map((part, i) => (
              <span key={i}>
                {i > 0 && <wbr />}
                {part}
              </span>
            ))}
          </span>
          <span className="invite-arrow" aria-hidden="true">→</span>
          <Corners />
        </a>
        {qr && <img className="invite-qr" src={qr} alt={`QR code for ${address}`} />}
      </div>
    </div>
  )
}
