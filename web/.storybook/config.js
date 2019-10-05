import { configure, addDecorator } from '@storybook/react'
import Theme from './../src/ui/theme'
import React from 'react'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

addDecorator(story => (
  <MuiThemeProvider theme={Theme}>{story()}</MuiThemeProvider>
))

// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.js$/), module)
