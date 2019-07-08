import * as turf from '@turf/turf'

import dc2003 from '../data/DCCA_2003'
import dc2007 from '../data/DCCA_2007'
import dc2011 from '../data/DCCA_2011'
import dc2015 from '../data/DCCA_2015'
import dc2019 from '../data/DCCA_2019'

export const getAllFeaturesFromPoint = (
  point,
  featuresArray = [dc2003, dc2007, dc2011, dc2015, dc2019]
) => {
  const pt = turf.point([point.lng, point.lat])
  const result = featuresArray.map(feature => {
    let polygonProps = {}
    for (let i = 0, n = feature.features.length; i < n; i++) {
      const poly = turf.multiPolygon(feature.features[i].geometry.coordinates)
      if (turf.booleanPointInPolygon(pt, poly)) {
        polygonProps = { ...feature.features[i].properties }
        break
      }
    }
    return {
      year: feature.name.split('_')[1],
      ...polygonProps,
    }
  })
  return result
}
