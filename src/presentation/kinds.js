import Opening from './Opening.jsx'
import Statement from './Statement.jsx'
import Points from './Points.jsx'
import Invite from './Invite.jsx'
import Progression from './Progression.jsx'

// Each section in src/content/presentation.js names one of these kinds.
// To add a new layout, create a component here and register it below.
export const SECTION_KINDS = {
  opening: Opening,
  statement: Statement,
  points: Points,
  invite: Invite,
  progression: Progression,
}
