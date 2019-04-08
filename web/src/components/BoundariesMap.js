import React from 'react'
import { Map, View } from 'ol'
import { Group as LayerGroup, Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import XYZ from 'ol/source/XYZ'
import GeoJSON from 'ol/format/GeoJSON'
import { Stroke, Fill, Style } from 'ol/style'
import { Vector as VectorSource } from 'ol/source'
import { click } from 'ol/events/condition'
import Select from 'ol/interaction/Select'
import dc2003 from '../data/DCCA_2003'
import dc2007 from '../data/DCCA_2007'
import dc2011 from '../data/DCCA_2011'
import dc2015 from '../data/DCCA_2015'
import dc2019 from '../data/DCCA_2019'

class BoundariesMap extends React.Component {

  state = {
    map: null,
    selectedFeatures: [],
    lastClick: null
  }


  componentDidMount() {
    const { mapLayers } = this.props
    console.log(mapLayers)
    const red = [
      new Style({
        stroke: new Stroke({
          color: 'red',
          width: 1
        }),
        fill: new Fill({
          color: 'rgba(255,255,255,0.1)'
        })
      })
    ];

    const blue = [
      new Style({
        stroke: new Stroke({
          color: 'blue',
          width: 1
        }),
        fill: new Fill({
          color: 'rgba(255,255,255,0.1)'
        })
      })
    ];

    // const dc2015Layer = new VectorLayer({
    //   source: new VectorSource({
    //     features: (new GeoJSON()).readFeatures(dc2015)
    //   }),
    //   style: blue
    // })

    const dc2019Layer = new VectorLayer({
      source: new VectorSource({
        features: (new GeoJSON()).readFeatures(dc2019)
      }),
      style: red
    })

    let map = new Map({
      target: this.refs.mapContainer,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        }), new LayerGroup({
          layers: [
            // dc2011Layer,
            // dc2015Layer,
            dc2019Layer
          ]
        })
      ],
      view: new View({
        center: [114.1401483, 22.379149],
        projection: 'EPSG:4326',
        zoom: 11,
      })
    })

    // select interaction working on "click"
    let interaction = new Select({
      condition: click,
      multi: true
    });


    if (interaction !== null) {
      map.addInteraction(interaction)
      interaction.on('select', this.onFeatureSelected)
    }

    map.on('singleclick', (event) => {
      this.setState({
        lastClick: event.coordinate
      })
      console.log(this.state)
    })

    this.setState({
      map,
      interaction
    })
  }


  onFeatureSelected = event => {
    if (event.target.getFeatures().getLength() > 0) {
      let features = event.target.getFeatures()
      console.log(features)
      if (event.target.getFeatures().getLength() > 3) features.clear()
      this.setState({
        selectedFeatures: features.getArray()
      })
    }
  }

  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <div ref="mapContainer" style={classes}></div>
      {this.state.selectedFeatures.map((feature, index) => 
        <li key={index}>
        {feature.getProperties().CACODE}
        {feature.getProperties().CANAME}
        </li>
      )}
      </React.Fragment>
    )
  }

}


export default BoundariesMap