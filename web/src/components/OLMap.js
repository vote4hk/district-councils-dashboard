import React, { Component } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import GeoJSON from 'ol/format/GeoJSON'
import { Style, Stroke, Fill } from 'ol/style'
import Select from 'ol/interaction/Select'

import dc2015 from '../data/DCCA_2015'


class OLMap extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }

        this.featureSource = new VectorSource({
            features: (new GeoJSON()).readFeatures(dc2015)
        })
    }

    componentDidMount() {
        const { year, code } = this.props

        const styleFunction = feature => {
            if (feature.getProperties().CACODE === code) {
                return new Style({
                    fill: new Fill({
                        color: 'rgba(74, 144, 226, 0.5)'
                    }),
                    stroke: new Stroke({
                        color: '#3e59ef',
                        width: 2
                    })
                })
            }
            return new Style({
                fill: new Fill({
                    color: 'rgba(74, 144, 226, 0.05)'
                }),
                stroke: new Stroke({
                    color: '#3e59ef',
                    width: 2
                })
            })
        }

        // getFeaturesByYearCode(year, code)

        const featuresLayer = new VectorLayer({
            source: this.featureSource,
            style: styleFunction
        })

        // create map object with feature layer
        const map = new Map({
            target: this.refs.mapContainer,
            layers: [
                //default OSM layer
                new TileLayer({
                    source: new XYZ({
                        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
                    })
                }),
                featuresLayer
            ],
            view: new View({
                projection: 'EPSG:4326',
                center: [114.2029, 22.3844],
                zoom: 13,
            })
        })

        this.setState({
            map,
            view: map.getView(),
            featuresLayer: featuresLayer
        }, () => this.setView(this.featureSource))

        const select = new Select()

        if (select !== null) {
            map.addInteraction(select);
            select.on('select', this.handleMapClick)
        }

    }

    componentDidUpdate(prevProps) {
        const { year, code } = this.props
        if (year !== prevProps.year) {
        }

        if (code !== prevProps.code) {
            this.setView(this.featureSource)
        }
    }

    handleMapClick = e => {
        const { year, changeDistrict } = this.props
        const selectedFeature = e.target.getFeatures().getArray()

        if (selectedFeature[0]) {
            changeDistrict(year, selectedFeature[0].getProperties().CACODE)
        }
    }

    setView = featureSource => {
        const { map, view } = this.state
        const { code } = this.props

        // Fit to feature 
        const features = featureSource.getFeatures()
        for (let i = 0; i < features.length; i++) {
            if (features[i].getProperties().CACODE === code) {
                const extent = features[i].getGeometry().getExtent()
                map.getView().fit(extent, {
                    size: map.getSize(),
                    padding: [10, 10, 10, 10]
                })

                view.animate({
                    // center: the coordinate of the centre of the selected Feature,
                    duration: 2000,
                    easing: t => {
                        return Math.pow(2, -10 * t) * Math.sin((t - 0.075) * (2 * Math.PI) / 0.3) + 1;
                    }
                })
                this.setState({ map })
            }
        }
    }

    render() {
        return (
            <div ref="mapContainer"> </div>
        )
    }

}

export default OLMap