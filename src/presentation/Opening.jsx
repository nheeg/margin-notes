import Study from '../components/Study.jsx'
import Hero from './Hero.jsx'

export default function Opening({ hero, study }) {
  return (
    <div className="intro">
      <Hero {...hero} />
      <Study {...study} />
    </div>
  )
}
