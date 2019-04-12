import React, { Component } from 'react'
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { withStyles } from '@material-ui/core/styles';
import SideBar from './components/SideBar';
import BoundariesMap from './components/BoundariesMap'
import MapboxMap from './components/MapboxMap'
import createMuiTheme from './ui/theme';
import DCCAElectionResult from './components/DCCAElectionResult'
import { getAllFeaturesFromPoint } from './utils/features'

import './App.css'

import dc2003 from './data/DCCA_2003'
import dc2007 from './data/DCCA_2007'
import dc2011 from './data/DCCA_2011'
import dc2015 from './data/DCCA_2015'
import dc2019 from './data/DCCA_2019'
import electors from './data/electors'


import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

const drawerWidth = 240;

const theme = createMuiTheme

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1
  },
  toolbar: theme.mixins.toolbar,
});

const TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';
const LONG = 114.2029;
const LAT = 22.3844;
const ZOOM = 11;
const STYLE_ID = 'mapbox/streets-v9';
const MIN_ZOOM = 10;



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      map: {
        center: [LONG, LAT],
        zoom: ZOOM,
        styleID: STYLE_ID,
        lastClick: null
      },
      selectedDCCA: null
    }

    this.dccaList = [dc2003, dc2007, dc2011, dc2015, dc2019]

  }

  componentDidMount() {
    // this.props.actions.loadDCCAdata([dc2003, dc2007, dc2011, dc2015, dc2019])
  }

  onMapPanned = (lng, lat, zoom) => {
    this.setState({
      map: {
        center: [lng, lat],
        zoom,
      }
    })
  }

  onMapClicked = (e) => {
    this.setState({
      map: {
        lastClick : [e.lngLat.lng, e.lngLat.lat]
      },
      selectedDCCA: getAllFeaturesFromPoint(e.lngLat, this.dccaList)
    })
  }

  render() {
    const { map: {center, zoom, lastClick}, selectedDCCA } = this.state
    const { classes, map } = this.props

    return (
      <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              District Council Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />

          <Divider />
          <div>{center && zoom && `Longitude: ${center[0]} Latitude: ${center[1]} Zoom: ${zoom}`}</div><br />
          <div>{lastClick ? `lastClick: ${lastClick[0]} ${lastClick[1]}` : ''}</div>
          {console.log(this.state)}
          <Stepper orientation="vertical">
            {selectedDCCA && selectedDCCA.map((feature, index) => (
              <Step key={feature.year} active={true}>
                <StepLabel>{feature.year}</StepLabel>
                <StepContent>
                  <Typography>{`${feature.CNAME} ${feature.ENAME}`}</Typography>
                  <div className={classes.actionsContainer}>
                    <DCCAElectionResult
                      electors={electors}
                      year={feature.year}
                      cacode={feature.CACODE} />
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>

        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.dccaList &&
            <MapboxMap
              mapLayers={this.dccaList}
              token={TOKEN}
              center={center}
              zoom={zoom}
              showPopUp={true}
              styleID={STYLE_ID}
              minZoom={MIN_ZOOM}
              onMapClicked={this.onMapClicked}
              onMapPanned={this.onMapPanned}
            />}
        </main>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App)