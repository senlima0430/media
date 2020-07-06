import { createMuiTheme } from '@material-ui/core/styles'

export const lightTheme = createMuiTheme({
  palette: {
    background: {
      default: '#ffffff',
    },
    secondary: {
      main: '#515151',
    },
  },
})

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#000000',
    },
    primary: {
      main: '#ffd54f',
    },
    secondary: {
      main: '#ffffff',
    },
  },
})
