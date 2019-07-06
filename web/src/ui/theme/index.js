import { createMuiTheme } from '@material-ui/core/styles'

export const headingFontFamily = 'PingFangTC-Medium, sans-serif'
export const bodyFontFamily = 'PT Serif, sans-serif'

export const fontFamily = [
  'PingFangTC',
  'Noto Sans TC',
  'sans-serif',
  '-apple-system',
  '"Helvetica Neue"',
  'Arial',
]

export const typography = {
  useNextVariants: true,
  fontSize: 16,
  fontFamily: fontFamily.join(','),
  h1: {
    fontFamily: headingFontFamily,
  },
  h2: {
    fontFamily: headingFontFamily,
    fontSize: 24,
  },
  h3: {
    fontFamily: headingFontFamily,
    fontSize: 40,
    fontWeight: 500,
  },
  h4: {
    fontFamily: headingFontFamily,
    fontSize: 30,
    fontWeight: 500,
  },
  h5: {
    fontFamily: headingFontFamily,
    fontSize: 24,
    fontWeight: 500,
  },
  h6: {
    fontFamily: headingFontFamily,
    fontSize: 18,
    fontWeight: 500,
  },
  body1: {
    fontFamily: bodyFontFamily,
  },
}

export default createMuiTheme({
  typography,
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
