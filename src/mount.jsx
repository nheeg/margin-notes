import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/base.css'

// Shared start-up for every page: global styles, then render the page component.
export function mount(Page) {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Page />
    </StrictMode>,
  )
}
