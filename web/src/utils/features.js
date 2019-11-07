import * as turf from '@turf/turf'

import dc2003 from '../data/DCCA_2003'
import dc2007 from '../data/DCCA_2007'
import dc2011 from '../data/DCCA_2011'
import dc2015 from '../data/DCCA_2015'
import dc2019 from '../data/DCCA_2019'

export const getSingleFeatureFromPoint = ({ lng, lat }) => {
  const pt = turf.point([lng, lat])
  // TODO: consider using different year in future
  // but need to take care of app size
  const result = {
    code: null,
    year: 2019,
    name_zh: null,
    name_en: null,
  }
  for (let i = 0; i < dc2019.features.length; i++) {
    const feature = dc2019.features[i]
    const poly = turf.polygon(feature.geometry.coordinates)
    if (turf.booleanPointInPolygon(pt, poly)) {
      result.code = feature.properties.CACODE
      result.name_zh = feature.properties.CNAME
      result.name_en = feature.properties.ENAME
      break
    }
  }
  return result
}

export const getAllFeaturesFromPoint = (
  point,
  featuresArray = [dc2003, dc2007, dc2011, dc2015, dc2019]
) => {
  const pt = turf.point([point.lng, point.lat])
  const result = featuresArray.map(feature => {
    let polygonProps = {}
    for (let i = 0, n = feature.features.length; i < n; i++) {
      const poly = turf.polygon(feature.features[i].geometry.coordinates)
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

export const getCentroidFromYearAndCode = (year, code) => {
  const featuresArray = [dc2003, dc2007, dc2011, dc2015, dc2019]
  const selectedIndex = [2003, 2007, 2011, 2015, 2019].findIndex(
    y => y === year
  )

  if (selectedIndex > -1) {
    const selectedFeature = featuresArray[selectedIndex]
    const polygon = selectedFeature.features.find(
      feature => feature.properties.CACODE === code
    )
    const centroid = turf.centroid(polygon)
    return centroid.geometry.coordinates
  }
  return
}
