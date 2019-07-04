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
import styled from 'styled-components';

import dc2003 from '../data/DCCA_2003'
import dc2007 from '../data/DCCA_2007'
import dc2011 from '../data/DCCA_2011'
import dc2015 from '../data/DCCA_2015'
import dc2019 from '../data/DCCA_2019'

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;


class OLMap extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        const { year, code } = this.props
        const dc = [dc2003, dc2007, dc2011, dc2015, dc2019].find(d => d.name === `DCCA_${year}`);
        var isDCDataExist = true;
        var featuresLayer;

        if(dc === undefined) {
            isDCDataExist = false;
        }

        if(isDCDataExist) {
            this.featureSource = new VectorSource({
                features: (new GeoJSON()).readFeatures(dc)
            })
            
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
    
            featuresLayer = new VectorLayer({
                source: this.featureSource,
                style: styleFunction
            })
        }

        // create map object with feature layer
        var layers = [
            //default OSM layer
            new TileLayer({
                source: new XYZ({
                    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
                })
            })
        ];
        
        if(isDCDataExist) {
            layers.push(featuresLayer)
        }

        const map = new Map({
            target: this.refs.mapContainer,
            layers,
            view: new View({
                projection: 'EPSG:4326',
                center: [114.2029, 22.3844],
                zoom: 13,
            })
        })

        if(isDCDataExist) {
            // Fit to feature 
            const features = this.featureSource.getFeatures()
            for (let i = 0; i < features.length; i++) {
                if (features[i].getProperties().CACODE === code) {
                    const extent = features[i].getGeometry().getExtent()
                    map.getView().fit(extent, {
                        size: map.getSize(),
                        padding: [10, 10, 10, 10]
                    })
                    break
                }
            }
        }
        
        this.setState({
            map,
            view: map.getView(),
            featuresLayer: isDCDataExist ? featuresLayer : null
        })

        const select = new Select()

        if (select !== null) {
            map.addInteraction(select);
            select.on('select', this.handleMapClick)
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.year !== this.props.year
    }


    handleMapClick = e => {
        const { year, changeDistrict } = this.props
        const selectedFeature = e.target.getFeatures().getArray()
        // const selectedFeatureExtent = selectedFeature[0].getGeometry().getExtent()
        // this.state.map.getView().fit(selectedFeatureExtent)

        if (selectedFeature[0]) {
            changeDistrict(year, selectedFeature[0].getProperties().CACODE)
        }
    }

    render() {
        return (
            <MapContainer ref="mapContainer"> </MapContainer>
        )
    }

}

export default OLMap