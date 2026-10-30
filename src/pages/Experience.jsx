import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Activity from '../experience/Activity.jsx'
import { experience } from '../content/experience.js'
import '../experience/experience.css'

// The audience page at /experience/. Copy and steps come from src/content/experience.js.
export default function Experience() {
  return (
    <div className="page page--audience">
      <Header>
        <a className="header-link" href="../">{experience.backLink}</a>
      </Header>
      <main className="audience">
        <div className="audience-intro">
          <p className="eyebrow">{experience.eyebrow}</p>
          <h1 className="audience-title">{experience.title}</h1>
          <p className="audience-lede">{experience.lede}</p>
        </div>
        <Activity {...experience.activity} />
      </main>
      <Footer note={experience.footnote} />
    </div>
  )
}
