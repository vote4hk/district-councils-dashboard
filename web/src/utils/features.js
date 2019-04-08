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


export const getBoundingBox = data => {
    var bounds = {}, coords, point, latitude, longitude;
  
    // We want to use the “features” key of the FeatureCollection (see above)
    // data = data.features;
  
    // Loop through each “feature”
    // for (var i = 0; i < data.length; i++) {
  
      // Pull out the coordinates of this feature
      coords = data.geometry.coordinates[0];
  
      // For each individual coordinate in this feature's coordinates…
      for (var j = 0; j < coords.length; j++) {
  
        longitude = coords[j][0];
        latitude = coords[j][1];
  
        // Update the bounds recursively by comparing the current
        // xMin/xMax and yMin/yMax with the coordinate
        // we're currently checking
        bounds.xMin = bounds.xMin < longitude ? bounds.xMin : longitude;
        bounds.xMax = bounds.xMax > longitude ? bounds.xMax : longitude;
        bounds.yMin = bounds.yMin < latitude ? bounds.yMin : latitude;
        bounds.yMax = bounds.yMax > latitude ? bounds.yMax : latitude;
      }
  
    // }
  
    // Returns an object that contains the bounds of this GeoJSON
    // data. The keys of this object describe a box formed by the
    // northwest (xMin, yMin) and southeast (xMax, yMax) coordinates.
    return bounds;
  }