import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import createMuiTheme from '../../ui/theme'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

const theme = createMuiTheme

const styles = theme => ({
  content: {
  },
})

class ProfilePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
     
    }
  }

  render() {
    const { classes, match: { params } } = this.props
    return (
      <MuiThemeProvider theme={theme}>
        {params.name}
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles, { withTheme: true })(ProfilePage)
