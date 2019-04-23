import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    }
})

class NavBar extends Component {
    render() {
        const { classes } = this.props
        return (
            <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap>
              區議會選區分界地圖（2003-2019）
              </Typography>
            </Toolbar>
          </AppBar>
        )
    }
}

export default withStyles(styles, { withTheme: true })(NavBar)