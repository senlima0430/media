import React from 'react'
import { Router } from '@reach/router'

import { Home } from './pages'

export const Routes = () => {
  return (
    <Router>
      <Home path="/" />
    </Router>
  )
}
