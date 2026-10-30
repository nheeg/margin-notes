import { useEffect, useState } from 'react'

// Returns the id of the section currently crossing the middle of the viewport.
export function useActiveSection(ids) {
  const key = ids.join(',')
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const els = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [key])

  return active
}
