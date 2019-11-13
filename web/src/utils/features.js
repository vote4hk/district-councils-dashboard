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

export const adjustConcavePolygonCentroid = (year, code) => {
  const mapping = {
    2003: {
      D14: [114.154877, 22.248274],
      L12: [113.989521, 22.365375],
      L28: [113.984099, 22.41374],
      P03: [114.165739, 22.455871],
      P16: [114.1620147228241, 22.45361940935254],
    },

    2007: {
      D01: [114.154877, 22.248274],
      L12: [113.989521, 22.365375],
      L28: [113.984099, 22.41374],
      P03: [114.165739, 22.455871],
      P16: [114.1620147228241, 22.45361940935254],
    },

    2011: {
      D01: [114.154877, 22.248274],
      L12: [113.989521, 22.365375],
      L28: [113.984099, 22.41374],
      P03: [114.165739, 22.455871],
      P16: [114.1620147228241, 22.45361940935254],
    },
    2015: {
      D01: [114.154877, 22.248274],
      L12: [113.989521, 22.365375],
      L28: [113.984099, 22.41374],
      P03: [114.165739, 22.455871],
      P16: [114.1620147228241, 22.45361940935254],
    },

    2019: {
      D01: [114.154877, 22.248274],
      L12: [114.006628, 22.377846],
      L13: [113.989521, 22.365375],
      L30: [113.984099, 22.41374],
      P02: [114.165739, 22.455871],
      P16: [114.1620147228241, 22.45361940935254],
      R09: [114.198862, 22.370661],
    },
  }

  if (!mapping[year][code]) return
  return mapping[year][code]
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
    // finetune for concave polygon for 2019 districts
    return (
      adjustConcavePolygonCentroid(year, code) || centroid.geometry.coordinates
    )
  }
  return
}
