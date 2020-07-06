import React, { useState, createContext } from 'react'
import PropTypes from 'prop-types'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [locale, setLocale] = useState(window.navigator.language)
  const [theme, setTheme] = useState(
    window.localStorage.getItem('theme') || 'light'
  )
  const defaultVal = { locale, setLocale, theme, setTheme }

  return (
    <AppContext.Provider value={defaultVal}>{children}</AppContext.Provider>
  )
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
