import * as turf from '@turf/turf'

import dc2019 from '../data/DCCA_2019'

export const getAllFeaturesFromPoint = ({ lng, lat }) => {
  const pt = turf.point([lng, lat])
  // TODO: consider using different year in future
  // but need to take care of app size
  const result = {
    code: null,
    year: 2019,
  }
  for (let i = 0; i < dc2019.features.length; i++) {
    const feature = dc2019.features[i]
    const poly = turf.polygon(feature.geometry.coordinates)
    if (turf.booleanPointInPolygon(pt, poly)) {
      result.code = feature.properties.CACODE
      break
    }
  }
  return result
}
