/*
  📘 LESSON: The Entry Point — Where React Meets the DOM

  This is the FIRST file that runs. It does ONE thing:
  1. Finds the <div id="root"> in index.html
  2. Creates a React "root" on that element
  3. Renders the <App /> component into it

  After this, React takes over. All UI is managed by React components.

  StrictMode:
  - Development-only wrapper (removed in production builds)
  - Calls components twice to detect side effects
  - Warns about deprecated APIs
  - Helps you write better React code
*/

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
