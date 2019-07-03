import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";
import Container from '@material-ui/core/Container'
import { relative } from 'path';

const styles = theme => ({
  headerParent: {
    boxShadow: 'none'
  },
  header: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main
  },
  title: {
    flexGrow: 1
  }
})

class NavBar extends Component {
    render() {
        const { classes } = this.props
        return (
          <Container maxWidth="lg">
            <AppBar position="relative" className={classes.headerParent}>
            <Toolbar disableGutters className={classes.header}>
              <Typography variant="h6" color="inherit" className={classes.title}>
              Vote for Hong Kong
              </Typography>
              <Button component={NavLink} to="/">Search</Button>
            </Toolbar>
          </AppBar>
          </Container>
        )
    }
}

export default withStyles(styles, { withTheme: true })(NavBar)