import React, { useContext } from 'react'
import { hot } from 'react-hot-loader/root'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'

import { AppContext } from './contexts'
import { lightTheme, darkTheme } from './themes'
import { Routes } from './Routes'

export const App = hot(() => {
  const { theme } = useContext(AppContext)

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  )
})
