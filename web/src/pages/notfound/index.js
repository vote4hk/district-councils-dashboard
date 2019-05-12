import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import createMuiTheme from '../../ui/theme'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

const theme = createMuiTheme

const styles = theme => ({
  content: {
  },
})

class NotFoundPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
     
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
      TODO - <a href='https://notfound.collaction.hk/'>404</a>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles, { withTheme: true })(NotFoundPage)
