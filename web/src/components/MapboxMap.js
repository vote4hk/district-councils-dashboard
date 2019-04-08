import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import mapboxgl from 'mapbox-gl'
import { panMap, clickMap, clickDCCA } from '../actions/map'
import { getAllFeaturesFromPoint, getBoundingBox } from '../utils/features'

class MapboxMap extends Component {
    componentDidMount() {
        // set map properties
        const { token, longitude, latitude, zoom, minZoom, styleID, mapLayers } = this.props;

        const mapConfig = {
            container: 'map',
            style: `mapbox://styles/${styleID}`,
            center: [longitude, latitude],
            zoom: zoom,
            minZoom: minZoom
        };

        mapboxgl.accessToken = token;
        let map = new mapboxgl.Map(mapConfig);

        map.on('load', () => {
            // Get the map style and set it in the state tree
            const style = map.getStyle();
            //   this.props.setStyle(style);

            map.addSource('2019', {
                type: 'geojson',
                data: this.props.mapLayers.dccaList[4],
                generateId: true
                // When enabled, the feature.id property will be auto assigned based on its index in the features array, over-writing any previous values.
            });

            map.addLayer({
                id: '2019-lines',
                type: 'line',
                source: '2019',
                paint: {
                    'line-color': 'rgba(255, 0, 0, 1)',
                    'line-width': 2
                }
            });

            map.addLayer({
                id: '2019-hovers',
                type: 'fill',
                source: '2019',
                paint: {
                    "fill-color": "#627BC1",
                    "fill-opacity": ["case",
                        ["boolean", ["feature-state", "hover"], false],
                        0.3,
                        0
                    ]
                }
            });

            map.addLayer({
                id: '2019-highlight',
                type: 'fill',
                source: '2019',
                paint: {
                    "fill-color": "#ff0000",
                    "fill-opacity": ["case",
                        ["boolean", ["feature-state", "highlight"], false],
                        0.3,
                        0
                    ]
                }
            });

            let hoveredStateId = null;
            let clickedStateId = null;
            // When the user moves their mouse over the state-fill layer, we'll update the
            // feature state for the feature under the mouse.
            map.on("mousemove", "2019-hovers", function (e) {
                if (e.features.length > 0) {
                    if (hoveredStateId) {
                        map.setFeatureState({ source: '2019', id: hoveredStateId }, { hover: false });
                    }
                    hoveredStateId = e.features[0].id;
                    map.setFeatureState({ source: '2019', id: hoveredStateId }, { hover: true });
                }
            });

            // When the mouse leaves the state-fill layer, update the feature state of the
            // previously hovered feature.
            map.on("mouseleave", "2019-hovers", function () {
                if (hoveredStateId) {
                    map.setFeatureState({ source: '2019', id: hoveredStateId }, { hover: false });
                }
                hoveredStateId = null;
            });

            map.on("click", "2019-highlight", function (e) {
                if (clickedStateId) {
                    map.setFeatureState({ source: '2019', id: clickedStateId }, { highlight: false });
                    clickedStateId = null;
                }
                clickedStateId = e.features[0].id;
                map.setFeatureState({ source: '2019', id: clickedStateId }, { highlight: true });

                
                let bounds = getBoundingBox(e.features[0])

                bounds = new mapboxgl.LngLatBounds(new mapboxgl.LngLat(bounds.xMin, bounds.yMin), new mapboxgl.LngLat(bounds.xMax, bounds.yMax));

                map.fitBounds(bounds, {
                    padding: 50,
                    maxZoom: 13.5
                });

            });


            map.on('click', e => {
                this.props.actions.clickMap(e.lngLat)
                this.props.actions.clickDCCA(getAllFeaturesFromPoint(e.lngLat, this.props.mapLayers.dccaList))
            });

            map.on('move', () => {
                const { lng, lat } = map.getCenter();

                this.props.actions.panMap({
                    lng: lng.toFixed(4),
                    lat: lat.toFixed(4),
                    zoom: map.getZoom().toFixed(2)
                })

            });

        });

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
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        mapConfig: state.map
    }
}

const mapDispatchToProps = dispatch => {
    return { actions: bindActionCreators({ panMap, clickMap, clickDCCA }, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapboxMap)