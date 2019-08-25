import { createMuiTheme } from '@material-ui/core/styles'

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

export default createMuiTheme({
  typography,
  palette: {
    primary: {
      main: '#fff',
      contrastText: '#000',
    },
    secondary: {
      main: '#3e474f',
      contrastText: '#fff',
    },
    button: {
      primary: '#ffd731',
      secondary: '#ffd731',
    },
  },
})

export const styledComponentTheme = {
  main: {
    backgroundColor: 'white',
    color: 'black',
  },
  dark: {
    backgroundColor: '#3e474f',
    color: 'white',
  },
  secondaryBackgroundColor: '#f2f2f3', // grey
  subtextColor: '#ffb500', // organe
}

/**
 * 泛民 - green #00e676
建制 - red #e64a19
本土 - yellow #ffc400
其他  - blue #4fc3f7
不明 - grey #999999
 */
export const COLOR_CAMP_PAN_DEMO = '#00e676'
export const COLOR_CAMP_PAN_EST = '#e64a19'
export const COLOR_CAMP_OTHER = '#999999'
