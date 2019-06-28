import * as turf from '@turf/turf'
import dc2003 from '../data/DCCA_2003'
import dc2007 from '../data/DCCA_2007'
import dc2011 from '../data/DCCA_2011'
import dc2015 from '../data/DCCA_2015'
import dc2019 from '../data/DCCA_2019'

const jsonArray = [dc2003, dc2007, dc2011, dc2015, dc2019]

export const getFeaturesByYearCode = (year, code) => {
    const selectedJson = jsonArray.find(json => json.name === `DCCA_${year}`)
    if (!selectedJson) return

    const selectedFeature = selectedJson.features.find(feature => feature.properties.CACODE === code)
    console.log(selectedFeature)
    return selectedFeature
}

export const getBoundsFromYearCode = (year, code) => {
    const line = turf.lineString([[-74, 40], [-78, 42], [-82, 35]]);
    const bbox = turf.bbox(line);
    const bboxPolygon = turf.bboxPolygon(bbox)
    return bboxPolygon
}