import * as turf from '@turf/turf'

export const getAllFeaturesFromPoint = (point, featuresArray) => {
    const pt = turf.point([point.lng, point.lat])
    const result = featuresArray.map(feature => {
        let polygonProps = {}
        for (let i= 0, n = feature.features.length; i < n; i++) {
            const poly = turf.multiPolygon(feature.features[i].geometry.coordinates)
            if (turf.booleanPointInPolygon(pt, poly)) {
                polygonProps = {...feature.features[i].properties}
                break
            }
        }
        return {
            year: feature.name.split('_')[1],
            ...polygonProps
        }
    })
    return result
}