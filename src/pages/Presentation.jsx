import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Section from '../presentation/Section.jsx'
import SectionRail from '../presentation/SectionRail.jsx'
import { sections } from '../content/presentation.js'
import { site } from '../content/site.js'
import '../presentation/presentation.css'

// The presentation at /. Sections come from src/content/presentation.js.
export default function Presentation() {
  return (
    <div className="page page--presentation">
      <Header>
        <span className="meta header-edition">{site.edition}</span>
        <a className="header-link" href="./experience/">
          {site.audienceLink}
          <span aria-hidden="true"> →</span>
        </a>
      </Header>
      <main>
        {sections.map((section, i) => (
          <Section key={section.id} section={section} number={i + 1} />
        ))}
      </main>
      <SectionRail sections={sections} />
      <Footer />
    </div>
  )
}
