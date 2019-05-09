import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import { getBoundingBox } from '../utils/features'

class MapboxMap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hoveredStateId: null,
            clickedStateId: null
        }
      }

    componentDidMount() {
        // set map properties
        const { token, center, zoom, minZoom, styleID, mapLayers, selectedDCCA, onMapClicked, onMapFeatureClicked, onMapPanned, color } = this.props

        const mapConfig = {
            container: 'map',
            style: `mapbox://styles/${styleID}`,
            center: center,
            zoom: zoom,
            minZoom: minZoom
        }

        mapboxgl.accessToken = token
        this.map = new mapboxgl.Map(mapConfig)

        this.map.on('load', () => {
            // Get the map style and set it in the state tree
            const style = this.map.getStyle()
            //   this.props.setStyle(style)

            mapLayers.forEach((layer, index) => {
                this.map.addSource(layer.name, {
                    type: 'geojson',
                    data: layer,
                    generateId: true
                    // When enabled, the feature.id property will be auto assigned based on its index in the features array, over-writing any previous values.
                })

                this.map.addLayer({
                    id: `${layer.name}-lines`,
                    type: 'line',
                    source: layer.name,
                    layout: {
                        'visibility': layer.checked ? 'visible': 'none'
                    },
                    paint: {
                        'line-color': color[index],
                        'line-width': 2
                    }
                })

                this.map.addLayer({
                    id: `${layer.name}-hovers`,
                    type: 'fill',
                    source: layer.name,
                    layout: {
                        'visibility': layer.checked ? 'visible': 'none'
                    },
                    paint: {
                        "fill-color": "#000",
                        "fill-opacity": ["case",
                            ["boolean", ["feature-state", "hover"], false],
                            0.1,
                            0
                        ]
                    }
                })

                this.map.addLayer({
                    id: `${layer.name}-highlight`,
                    type: 'fill',
                    source: layer.name,
                    layout: {
                        'visibility': layer.checked ? 'visible': 'none'
                    },
                    paint: {
                        "fill-color": color[index],
                        "fill-opacity": ["case",
                            ["boolean", ["feature-state", "highlight"], false],
                            0.3,
                            0
                        ]
                    }
                })

                // When the user moves their mouse over the state-fill layer, we'll update the
                // feature state for the feature under the mouse.
                // this.map.on("mousemove", `${layer.name}-hovers`, function (e) {
                    // if (e.features.length > 0) {
                        // if (this.state.hoveredStateId !== null) {
                        //     this.setFeatureState({ source: layer.name, id: this.state.hoveredStateId }, { hover: false })
                        // }
                        // let currentFeatureId = e.features[0].id
                        // this.setFeatureState({ source: layer.name, id: currentFeatureId }, { hover: true })
                        // this.setState({hoveredStateId: currentFeatureId})
                    // }
                // })

                // When the mouse leaves the state-fill layer, update the feature state of the
                // previously hovered feature.
                // this.map.on("mouseleave", `${layer.name}-hovers`, function () {
                //     if (hoveredStateId) {
                //         this.setFeatureState({ source: layer.name, id: hoveredStateId }, { hover: false })
                //     }
                //     hoveredStateId = null
                // })

                // this.map.on("click", `${layer.name}-highlight`, function (e) {
                // 
                    // if (clickedStateId) {
                    //     this.setFeatureState({ source: layer.name, id: clickedStateId }, { highlight: false })
                    //     clickedStateId = null
                    // }
                    // clickedStateId = e.features[0].id
                    // this.setFeatureState({ source: layer.name, id: clickedStateId }, { highlight: true })
                    // let bounds = getBoundingBox(e.features[0])
                    // bounds = new mapboxgl.LngLatBounds(new mapboxgl.LngLat(bounds.xMin, bounds.yMin), new mapboxgl.LngLat(bounds.xMax, bounds.yMax))
                    // this.fitBounds(bounds, {
                    //     padding: 50,
                    //     maxZoom: 13.5
                    // })
                // })

            })

            this.map.on('click', e => {
                this.getMapboxFeature(e.point)
                onMapClicked(e)
            })

            this.map.on('move', () => {
                const { lng, lat } = this.map.getCenter()
                onMapPanned(lng.toFixed(4), lat.toFixed(4), this.map.getZoom().toFixed(2))
            })


            
        })

    }

    getMapboxFeature = (coordinate) => {
        const current = this.props.mapLayers.find(layer => layer.checked)
        const features = this.map.queryRenderedFeatures(
            coordinate, { layers: [`${current.name}-highlight`] }
          );
          return features
    }

    zoomToBound = (feature) => {
        let bounds = getBoundingBox(feature)
        bounds = new mapboxgl.LngLatBounds(new mapboxgl.LngLat(bounds.xMin, bounds.yMin), new mapboxgl.LngLat(bounds.xMax, bounds.yMax))

        this.map.fitBounds(bounds, {
            padding: 50,
            maxZoom: 13.5
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.mapLayers !== prevProps.mapLayers) {

            const status = this.props.mapLayers.map(layer => {
                return {
                    name: layer.name,
                    visibility: layer.checked ? 'visible' : 'none'
                }
            })

            status.forEach(layer => {
                if (this.map.getLayer(`${layer.name}-lines`)) {
                    this.map.setLayoutProperty(`${layer.name}-lines`, 'visibility', layer.visibility)
                    this.map.setLayoutProperty(`${layer.name}-hovers`, 'visibility', layer.visibility)
                    this.map.setLayoutProperty(`${layer.name}-highlight`, 'visibility', layer.visibility)
                }
            })
        }

        if (this.props.lastClick !== prevProps.lastClick) {
                if (this.state.clickedStateId) {
                    this.map.setFeatureState({ source: 'DCCA_2015', id: this.state.clickedStateId }, { highlight: false })
                }

                if (this.props.lastClick) {
                    const newFeature = this.getMapboxFeature(this.map.project(this.props.lastClick))[0]
                    const newFeatureId = newFeature.id
                    this.zoomToBound(newFeature)
                    
                    setTimeout(() => {
                        this.map.setFeatureState({ source: 'DCCA_2015', id: newFeatureId }, { highlight: true }) 
                    }, 1000)
                    

                    this.setState({
                        clickedStateId: newFeatureId
                    })
                }
                
                
        }
    }

    render() {
        return (
            <div id='map'
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    width: '100%',
                    height: '100%',
                }}
            ></div>
        )
    }
}

export default MapboxMap