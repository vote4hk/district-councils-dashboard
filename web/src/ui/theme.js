import { createMuiTheme } from '@material-ui/core/styles'
import { red, green } from '@material-ui/core/colors'
export const headingFontFamily = 'Noto Sans TC, sans-serif'
export const bodyFontFamily = 'Noto Sans TC, sans-serif'

export const FONT_FAMILY = [
  'Noto Sans TC',
  'sans-serif',
  '-apple-system',
  '"Helvetica Neue"',
  'Arial',
]

export const typography = {
  useNextVariants: true,
  fontSize: 16,
  fontFamily: FONT_FAMILY.join(','),
  h1: {
    fontFamily: headingFontFamily,
    fontSize: 24,
    fontWeight: 500,
  },
  h2: {
    fontFamily: headingFontFamily,
    fontSize: 24,
    fontWeight: 500,
  },
  h3: {
    fontFamily: headingFontFamily,
    fontSize: 22,
    fontWeight: 500,
  },
  h4: {
    fontFamily: FONT_FAMILY,
    fontSize: 18,
    fontWeight: 500,
  },
  h5: {
    fontFamily: headingFontFamily,
    fontSize: 16,
    fontWeight: 500,
  },
  h6: {
    fontFamily: headingFontFamily,
    fontSize: 14,
    fontWeight: 500,
  },
  body1: {
    fontFamily: bodyFontFamily,
    fontSize: 14,
    lineHeight: 1.4,
  },
  body2: {
    fontFamily: bodyFontFamily,
    fontSize: 12,
  },
}

export const COLORS = {
  main: {
    text: '#000',
    highlightedText: '#ffb500', // organe
    background: '#fff',
  },
  mainText: 'black',

  dark: {
    backgroundColor: '#3e474f',
    color: 'white',
  },
  camp: {
    democracy: '#00c376',
    establishment: '#ff6779',
    localist: '#ffcd00',
    other: '#45b6ff',
    uncertain: '#a8a8ad',
  },
  common: {
    success: green[800],
    failure: red[800],
  },
  secondaryBackgroundColor: '#f2f2f3', // grey
}

export default createMuiTheme({
  typography,
  palette: {
    primary: {
      main: COLORS.main.background,
      contrastText: COLORS.main.text,
    },
    secondary: {
      main: '#3e474f',
      contrastText: '#fff',
    },
  },
})
