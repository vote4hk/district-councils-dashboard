import React, { Component } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import GeoJSON from 'ol/format/GeoJSON'
import { Style, Stroke, Fill, Text } from 'ol/style'
import Select from 'ol/interaction/Select'
import styled from 'styled-components'

import dc2003 from '../data/DCCA_2003'
import dc2007 from '../data/DCCA_2007'
import dc2011 from '../data/DCCA_2011'
import dc2015 from '../data/DCCA_2015'
import dc2019 from '../data/DCCA_2019'

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`

const regionStyle = new Style({
  fill: new Fill({
    color: 'rgba(255, 255, 255, 0.2)',
  }),
  stroke: new Stroke({
    color: '#319FD3',
    width: 1,
  }),
  text: new Text({
    font: '16px Calibri,sans-serif',
    fill: new Fill({
      color: '#000',
    }),
    stroke: new Stroke({
      color: '#fff',
      width: 2,
    }),
  }),
})

const highlightStyle = new Style({
  stroke: new Stroke({
    color: '#f00',
    width: 1,
  }),
  fill: new Fill({
    color: 'rgba(255,0,0,0.1)',
  }),
  text: new Text({
    font: '16px Calibri,sans-serif',
    fill: new Fill({
      color: '#000',
    }),
    stroke: new Stroke({
      color: '#f00',
      width: 2,
    }),
  }),
})

class DCCACompareMap extends Component {
  featureOverlay
  highlightedFeature

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { year, code } = this.props
    const dc = [dc2003, dc2007, dc2011, dc2015, dc2019].find(
      d => d.name === `DCCA_${year}`
    )
    let isDCDataExist = dc ? true : false
    let featuresLayer

    if (isDCDataExist) {
      this.featureSource = new VectorSource({
        features: new GeoJSON().readFeatures(dc),
      })

      featuresLayer = new VectorLayer({
        source: this.featureSource,
        style: feature => {
          regionStyle.getText().setText(feature.getProperties().CNAME)
          return regionStyle
        },
      })
    }

    // create map object with feature layer
    const layers = [
      //default OSM layer
      new TileLayer({
        source: new XYZ({
          url:
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
        }),
      }),
    ]

    if (isDCDataExist) {
      layers.push(featuresLayer)
    }

    const map = new Map({
      target: this.refs.mapContainer,
      layers,
      view: new View({
        projection: 'EPSG:4326',
        center: [114.2029, 22.3844],
        zoom: 13,
      }),
    })

    this.featureOverlay = new VectorLayer({
      source: new VectorSource(),
      map: map,
      style: function(feature) {
        highlightStyle.getText().setText(`${feature.getProperties().CNAME}`)
        return highlightStyle
      },
    })

    if (isDCDataExist) {
      // Fit to feature
      const features = this.featureSource.getFeatures()
      for (let i = 0; i < features.length; i++) {
        if (features[i].getProperties().CACODE === code) {
          const extent = features[i].getGeometry().getExtent()
          map.getView().fit(extent, {
            size: map.getSize(),
            padding: [10, 10, 10, 10],
          })

          this.highlightFeature(features[i])
          break
        }
      }
    }

    this.setState({
      map,
      view: map.getView(),
      featuresLayer: isDCDataExist ? featuresLayer : null,
    })

    const select = new Select()

    if (select !== null) {
      map.addInteraction(select)
      select.on('select', this.handleMapClick)
    }
  }

  highlightFeature(feature) {
    if (this.highlightedFeature) {
      this.featureOverlay.getSource().removeFeature(this.highlightedFeature)
    }

    this.featureOverlay.getSource().addFeature(feature)
    this.highlightedFeature = feature
  }

  handleMapClick = e => {
    const { year, changeDistrict } = this.props
    const selectedFeature = e.target.getFeatures().item(0)

    if (selectedFeature) {
      this.highlightFeature(selectedFeature)
      changeDistrict(year, selectedFeature.get('CACODE'))
      this.state.map.getView().fit(selectedFeature.getGeometry().getExtent(), {
        duration: 200,
      })
    }
  }

  render() {
    return <MapContainer ref="mapContainer"> </MapContainer>
  }
}

export default DCCACompareMap
