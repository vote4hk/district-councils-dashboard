import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";

const styles = theme => ({
  grow: {
    flexGrow: 1,
  }
})

class NavBar extends Component {
    render() {
        const { classes } = this.props
        return (
            <AppBar position="fixed">
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.grow}>
              District Council Dashboard
              </Typography>
              <Button component={NavLink} to="/">Search</Button>
              <Button component={NavLink} to="/map">Map</Button>
            </Toolbar>
          </AppBar>
        )
    }
}

export default withStyles(styles, { withTheme: true })(NavBar)