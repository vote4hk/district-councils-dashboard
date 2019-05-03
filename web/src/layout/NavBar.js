import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
              {/* <Link to="/map"><Button color="inherit">地圖（2003-2019）</Button></Link> */}
              {/* <Link to="/table"><Button color="inherit">原始資料</Button></Link> */}
            </Toolbar>
          </AppBar>
        )
    }
}

export default withStyles(styles, { withTheme: true })(NavBar)