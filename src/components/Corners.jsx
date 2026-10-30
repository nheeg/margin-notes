// Registration marks for a framed element. The parent needs position: relative.
export default function Corners() {
  return (
    <>
      <span className="corner tl" aria-hidden="true" />
      <span className="corner tr" aria-hidden="true" />
      <span className="corner bl" aria-hidden="true" />
      <span className="corner br" aria-hidden="true" />
    </>
  )
}
