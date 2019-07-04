import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: "'Noto Sans TC', sans-serif",
  },
  palette: {
    primary: {
      light: '#ffffff',
      main: '#000000',
      dark: '#cccccc',
    },
    secondary: {
      light: '#2c2c2c',
      main: '#000000',
      dark: '#000000',
    },
    background: {
      default: '#ffffff',
    },
  },
  text: {
    primary: '#000000',
  },
})

console.log(theme)
export default theme
