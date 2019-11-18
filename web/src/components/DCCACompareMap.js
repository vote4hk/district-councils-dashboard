import React, { Component } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import GeoJSON from 'ol/format/GeoJSON'
import { Style, Stroke, Fill, Text, Icon } from 'ol/style'
import Select from 'ol/interaction/Select'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import styled from 'styled-components'
import { COLORS } from 'ui/theme'

import dc2003 from '../data/DCCA_2003'
import dc2007 from '../data/DCCA_2007'
import dc2011 from '../data/DCCA_2011'
import dc2015 from '../data/DCCA_2015'
import dc2019 from '../data/DCCA_2019'

import { adjustConcavePolygonCentroid } from 'utils/features'
import { withLanguage } from 'utils/helper'

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`

const regionStyle = new Style({
  fill: new Fill({
    color: 'rgba(255, 255, 255, 0.1)',
  }),
  stroke: new Stroke({
    color: '#356272',
    width: 1,
  }),
  text: new Text({
    font: '14px Noto Sans TC, sans-serif',
    fill: new Fill({
      color: '#356272',
    }),
    stroke: new Stroke({
      color: '#fff',
      width: 3,
    }),
  }),
})

const highlightStyle = new Style({
  stroke: new Stroke({
    color: COLORS.main.primary,
    width: 2,
  }),
  fill: new Fill({
    color: 'rgba(255,255,255,0.5)',
  }),
  text: new Text({
    font: 'bold 16px Noto Sans TC, sans-serif',
    fill: new Fill({
      color: COLORS.main.primary,
    }),
    stroke: new Stroke({
      color: 'white',
      width: 3,
    }),
  }),
})

const hoverStyle = new Style({
  stroke: new Stroke({
    color: COLORS.main.primary,
    width: 2,
  }),
  fill: new Fill({
    color: 'rgba(255,255,0,0.2)',
  }),
  text: new Text({
    font: 'bold 16px Noto Sans TC, sans-serif',
    fill: new Fill({
      color: COLORS.main.primary,
    }),
    stroke: new Stroke({
      color: 'white',
      width: 3,
    }),
  }),
})

class DCCACompareMap extends Component {
  featureOverlay
  featureHover
  highlightedFeature
  hoveredFeature

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { year, code, handleMapLoaded } = this.props
    const dc = [dc2003, dc2007, dc2011, dc2015, dc2019].find(
      d => d.name === `DCCA_${year}`
    )
    let isDCDataExist = dc ? true : false
    let featuresLayer
    let vectorLayer
    let geoMarker

    if (isDCDataExist) {
      this.featureSource = new VectorSource({
        features: new GeoJSON().readFeatures(dc),
      })

      featuresLayer = new VectorLayer({
        source: this.featureSource,
        style: feature => {
          regionStyle
            .getText()
            .setText(
              withLanguage(
                feature.getProperties().ENAME,
                feature.getProperties().CNAME
              )
            )
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
      controls: [],
    })

    this.featureOverlay = new VectorLayer({
      source: new VectorSource(),
      map: map,
      style: function(feature) {
        highlightStyle
          .getText()
          .setText(
            `${withLanguage(
              feature.getProperties().ENAME,
              feature.getProperties().CNAME
            )}`
          )
        return highlightStyle
      },
    })

    // Add layer for placing marker, set marker's style
    let markerCoordinates = this.props.currentPoint
    vectorLayer = new VectorLayer({
      name: 'marker',
      source: new VectorSource(),
      style: function(feature) {
        return new Style({
          image: new Icon({
            anchor: [0.5, 1],
            scale: 0.25,
            src: '/static/images/marker.png',
          }),
        })
      },
    })
    map.addLayer(vectorLayer)

    this.featureHover = new VectorLayer({
      source: new VectorSource(),
      map: map,
      style: function(feature) {
        hoverStyle.getText().setText(`${feature.getProperties().CNAME}`)
        return hoverStyle
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

          const loadedResult = {
            centroid:
              adjustConcavePolygonCentroid(2019, code) ||
              features[i] // hardcode as 2019
                .getGeometry()
                .getInteriorPoint()
                .getCoordinates(),
          }

          handleMapLoaded(loadedResult)
          break
        }
      }
    }

    // Add marker to the place user clicked
    geoMarker = new Feature({
      type: 'geoMarker',
      geometry: new Point([markerCoordinates['lng'], markerCoordinates['lat']]),
    })
    geoMarker.setProperties({ ENAME: '', CNAME: '' })

    vectorLayer.getSource().addFeature(geoMarker)

    this.setState({
      map,
      view: map.getView(),
      featuresLayer: isDCDataExist ? featuresLayer : null,
    })

    const selectBySingleClick = new Select()
    map.addInteraction(selectBySingleClick)
    selectBySingleClick.on('select', this.mapClick)

    // const selectByHover = new Select({
    //   condition: pointerMove,
    // })
    // map.addInteraction(selectByHover)
    // selectByHover.on('select', this.mapHover)
  }

  highlightFeature(feature) {
    if (this.highlightedFeature) {
      this.featureOverlay.getSource().removeFeature(this.highlightedFeature)
    }

    this.featureOverlay.getSource().addFeature(feature)
    this.highlightedFeature = feature
  }

  highlightHoveredFeature(feature) {
    if (this.hoveredFeature) {
      this.featureHover.getSource().removeFeature(this.hoveredFeature)
    }

    this.featureHover.getSource().addFeature(feature)
    this.hoveredFeature = feature
  }

  mapClick = e => {
    const { year, changeDistrict, handleMapClick } = this.props
    const selectedFeature = e.target.getFeatures().item(0)

    let geoMarker = new Feature({
      type: 'geoMarker',
      geometry: new Point(e.mapBrowserEvent.coordinate),
    })
    geoMarker.setProperties({ ENAME: '', CNAME: '' })

    this.state.map.getLayers().forEach(layer => {
      if (layer.get('name') !== undefined && layer.get('name') === 'marker') {
        layer.getSource().clear()
        layer.getSource().addFeature(geoMarker)
      }
    })
    handleMapClick(e.mapBrowserEvent.coordinate)

    if (selectedFeature) {
      this.highlightFeature(selectedFeature)
      changeDistrict(year, selectedFeature.get('CACODE'))
      this.state.map.getView().fit(selectedFeature.getGeometry().getExtent(), {
        duration: 200,
      })
    }

    // No more select polygon
    e.target.getFeatures().clear()
  }

  mapHover = e => {
    //const { year, changeDistrict, handleMapClick } = this.props
    const selectedFeature = e.target.getFeatures().item(0)

    if (selectedFeature) {
      this.highlightHoveredFeature(selectedFeature)
    }
  }

  render() {
    return <MapContainer ref="mapContainer"> </MapContainer>
  }
}

export default DCCACompareMap
