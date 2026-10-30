import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js'
import Corners from './Corners.jsx'
import './study.css'

const COUNT = 48
const SIZE = 400
const DURATION = 1600

// Small seeded RNG so each study is slightly different but reproducible.
function rng(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Each shape maps point i of n to unit coordinates in [-1, 1].
export const SHAPES = [
  {
    name: 'Ring',
    closed: true,
    at: (i, n, r) => {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2
      const rad = 0.72 + (r() - 0.5) * 0.08
      return [Math.cos(a) * rad, Math.sin(a) * rad]
    },
  },
  {
    name: 'Wave',
    closed: false,
    at: (i, n, r) => {
      const x = -0.85 + (1.7 * i) / (n - 1)
      return [x, Math.sin(x * Math.PI * 1.4) * 0.34 + (r() - 0.5) * 0.06]
    },
  },
  {
    name: 'Spiral',
    closed: false,
    at: (i, n, r) => {
      const t = i / (n - 1)
      const a = t * Math.PI * 3.4
      const rad = 0.08 + t * 0.74 + (r() - 0.5) * 0.03
      return [Math.cos(a) * rad, Math.sin(a) * rad]
    },
  },
  {
    name: 'Knot',
    closed: true,
    at: (i, n, r) => {
      const a = (i / n) * Math.PI * 2
      const j = (r() - 0.5) * 0.04
      return [Math.sin(3 * a + Math.PI / 2) * 0.76 + j, Math.sin(2 * a) * 0.76 + j]
    },
  },
]

export const shapeAt = (index) => (index === null ? null : SHAPES[index % SHAPES.length])
export const shapeIndex = (name) => SHAPES.findIndex((s) => s.name === name)

function scatter(seed) {
  const r = rng(seed)
  return Array.from({ length: COUNT }, () => [(r() - 0.5) * 1.8, (r() - 0.5) * 1.8])
}

function layout(index) {
  const r = rng(index + 1)
  return Array.from({ length: COUNT }, (_, i) => shapeAt(index).at(i, COUNT, r))
}

const ease = (t) => 1 - Math.pow(1 - t, 3)
const toPx = (v) => ((v + 1) / 2) * SIZE

// The framed field of points. `index` picks a shape (it cycles through SHAPES);
// null leaves the points scattered. Changing it animates the points into place.
export default function ShapeField({ index }) {
  const reduced = usePrefersReducedMotion()
  const [points, setPoints] = useState(() => scatter(7))
  const current = useRef(points)

  useEffect(() => {
    const from = current.current
    const to = index === null ? scatter(7) : layout(index)

    if (reduced) {
      current.current = to
      setPoints(to)
      return
    }

    let frame
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - start) / DURATION)
      // Stagger each point slightly so the shape gathers rather than snaps.
      const next = from.map(([fx, fy], i) => {
        const local = ease(Math.min(1, Math.max(0, t * 1.35 - (i / COUNT) * 0.35)))
        return [fx + (to[i][0] - fx) * local, fy + (to[i][1] - fy) * local]
      })
      current.current = next
      setPoints(next)
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [index, reduced])

  const shape = shapeAt(index)
  const path =
    points.map(([x, y], i) => `${i ? 'L' : 'M'}${toPx(x).toFixed(1)} ${toPx(y).toFixed(1)}`).join(' ') +
    (shape?.closed ? ' Z' : '')

  return (
    <div className="study-frame">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label={shape ? `${COUNT} points arranged as a ${shape.name.toLowerCase()}` : `${COUNT} scattered points`}
      >
        <g className="study-guides" aria-hidden="true">
          <line x1={SIZE / 2} y1="16" x2={SIZE / 2} y2={SIZE - 16} />
          <line x1="16" y1={SIZE / 2} x2={SIZE - 16} y2={SIZE / 2} />
          <circle cx={SIZE / 2} cy={SIZE / 2} r={SIZE * 0.36} />
        </g>
        <path className={shape ? 'study-line' : 'study-line is-hidden'} d={path} />
        {points.map(([x, y], i) => (
          <circle
            key={i}
            className={i % 12 === 0 ? 'study-dot is-marked' : 'study-dot'}
            cx={toPx(x)}
            cy={toPx(y)}
            r={i % 12 === 0 ? 3.6 : 2.4}
          />
        ))}
      </svg>
      <Corners />
    </div>
  )
}
