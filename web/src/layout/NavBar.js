import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AutoSearch from '../components/AutoSearch'

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
              District Council Dashboard
              </Typography>
              <Link to="/"><Button color="inherit">Search</Button></Link>
              <Link to="/map"><Button color="inherit">Map</Button></Link>

            <AutoSearch className={classes.searchBox} />
            </Toolbar>
          </AppBar>
        )
    }
}

export default withStyles(styles, { withTheme: true })(NavBar)