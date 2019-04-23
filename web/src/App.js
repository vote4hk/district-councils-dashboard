import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import { withStyles } from '@material-ui/core/styles'
import NavBar from './layout/NavBar'
import MapboxMap from './components/MapboxMap'
import InfoCard from './components/InfoCard'
import createMuiTheme from './ui/theme'
import { getAllFeaturesFromPoint } from './utils/features'
import Button from '@material-ui/core/Button'

import './App.css'

import dc2003 from './data/DCCA_2003'
import dc2007 from './data/DCCA_2007'
import dc2011 from './data/DCCA_2011'
import dc2015 from './data/DCCA_2015'
import dc2019 from './data/DCCA_2019'
import electors from './data/electors'

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

const drawerWidth = 240

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
  yearButton: {
    position: 'absolute',
    width: 100,
    top: '15%'
  }
})

const TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'
const LONG = 114.2029
const LAT = 22.3844
const ZOOM = 11
const STYLE_ID = 'mapbox/streets-v9'
const MIN_ZOOM = 10

const color = [
  '#6e40e6',
  '#f49600',
  '#ff5d55',
  '#005ecd',
  '#ad0000'
]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dccaList: [dc2003, dc2007, dc2011, dc2015, dc2019],
      open: false,
      map: {
        center: [LONG, LAT],
        zoom: ZOOM,
        styleID: STYLE_ID,
        lastClick: null
      },
      selectedDCCA: null
    }
  }

  componentDidMount() {
    this.onYearBtnClicked('DCCA_2011')
    this.onYearBtnClicked('DCCA_2015')
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
      selectedDCCA: getAllFeaturesFromPoint(e.lngLat, this.state.dccaList)
    })
  }

  onYearBtnClicked = (name) => {
    const idx = this.state.dccaList.findIndex(dcca => dcca.name === name)
    let dccaList = [...this.state.dccaList]
    dccaList.forEach(dcca => {dcca.checked = false})
    dccaList[idx].checked = true
    this.setState({ dccaList })
  }

  render() {
    const { map: {center, zoom, lastClick}, selectedDCCA, dccaList } = this.state
    const { classes, map } = this.props

    const currentFeature = dccaList.length > 0 ? dccaList.find(dcca => dcca.checked) : null
    const currentYear = currentFeature ? currentFeature.name.split('_')[1] : null
    return (
      <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <NavBar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {dccaList &&
            <MapboxMap
              mapLayers={dccaList}
              token={TOKEN}
              center={center}
              zoom={zoom}
              showPopUp={true}
              styleID={STYLE_ID}
              minZoom={MIN_ZOOM}
              color={color}
              onMapClicked={this.onMapClicked}
              onMapPanned={this.onMapPanned}
            />}
            <InfoCard 
            electors={electors}
            year={currentYear}
            cacode={currentYear && selectedDCCA && selectedDCCA.find(feature => feature.year === currentYear).CACODE}
            />
            <div className={classes.yearButton}>
              <List>
                {dccaList.map((dcca, index) => <ListItem key={`${dcca.name}`}>
                  <Button
                    onClick={() => this.onYearBtnClicked(dcca.name)}
                    key={dcca.name} variant="contained"
                    style={{
                      backgroundColor: dccaList.findIndex(d => d.name === dcca.name && d.checked === true) > -1 ? color[index] : '#e0e0e0'
                    }}
                    className={classes.button}>
                    {dcca.name.split('_')[1]}
                  </Button>
                </ListItem>)}
              </List>
            </div>
        </main>
      </div>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles, { withTheme: true })(App)