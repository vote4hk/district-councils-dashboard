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
            <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap>
              District Council Dashboard
              </Typography>
              <NavLink to="/"><Button color="inherit">Search</Button></NavLink>
              <NavLink to="/map"><Button color="inherit">Map</Button></NavLink>
            </Toolbar>
          </AppBar>
        )
    }
}

export default withStyles(styles, { withTheme: true })(NavBar)