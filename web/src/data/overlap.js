const fs = require('fs')
const turf = require('@turf/turf')
const jsts = require('jsts')

const curr_year = 2019

// https://stackoverflow.com/questions/36118883/using-jsts-buffer-to-identify-a-self-intersecting-polygon
const jsts_validate = function(geom) {
  if (geom instanceof jsts.geom.Polygon) {
    if (geom.isValid()) {
      geom.normalize() // validate does not pick up rings in the wrong order - this will fix that
      return geom // If the polygon is valid just return it
    }
    var polygonizer = new jsts.operation.polygonize.Polygonizer()
    jsts_addPolygon(geom, polygonizer)
    return jsts_toPolygonGeometry(polygonizer.getPolygons(), geom.getFactory())
  } else if (geom instanceof jsts.geom.MultiPolygon) {
    if (geom.isValid()) {
      geom.normalize() // validate does not pick up rings in the wrong order - this will fix that
      return geom // If the multipolygon is valid just return it
    }
    var polygonizer = new jsts.operation.polygonize.Polygonizer()

    for (var n = geom.getNumGeometries(); n > 0; n--) {
      jsts_addPolygon(geom.getGeometryN(n - 1), polygonizer)
    }
    return jsts_toPolygonGeometry(polygonizer.getPolygons(), geom.getFactory())
  } else {
    return geom // In my case, I only care about polygon / multipolygon geometries
  }
}
const checkOverlap = (feature1, feature2) => {
  console.log(feature1.properties.CACODE)
  // if (feature1.properties.CACODE.substring(0, 3) === 'T09') {
  // feature1.properties.CACODE === 'A01'
  const result = []
  let poly1 = turf.polygon(feature1.geometry.coordinates)
  const kinks1 = turf.kinks(poly1)
  poly1 = (typeof kinks1 !== 'undefined' && jsts_validate(poly1)) || poly1
  feature2.features.forEach(feature2 => {
    let poly2 = turf.polygon(feature2.geometry.coordinates)
    const kinks2 = turf.kinks(poly2)
    poly2 = (typeof kinks2 !== 'undefined' && jsts_validate(poly2)) || poly2
    if (turf.booleanOverlap(poly1, poly2)) {
      let intersection
      try {
        intersection = turf.intersect(poly1, poly2)
      } catch (e) {
        if (
          e &&
          e.message &&
          e.message.includes('found non-noded intersection between')
        ) {
          console.log(`${feature1.properties.CACODE} ,self-intersection`)
        }
      } finally {
        if (intersection && intersection.geometry.coordinates) {
          const area = turf.area(intersection)
          if (area > 0) {
            result.push({
              code: feature2.properties.CACODE,
              area,
            })
          }
        }
      }
    }
  })

  result.sort((a, b) => b.area - a.area)
  return result
  // }
}

const enable_prev = curr_year === 2003 ? false : true
const enable_next = curr_year === 2019 ? false : true

const curr_polygon = JSON.parse(fs.readFileSync(`DCCA_${curr_year}.json`))
const prev_polygon =
  enable_prev && JSON.parse(fs.readFileSync(`DCCA_${curr_year - 4}.json`))
const next_polygon =
  enable_next && JSON.parse(fs.readFileSync(`DCCA_${curr_year + 4}.json`))

const result = []
curr_polygon.features.forEach(feature1 => {
  const curr = feature1.properties.CACODE

  const prev = enable_prev && checkOverlap(feature1, prev_polygon)
  const next = enable_next && checkOverlap(feature1, next_polygon)

  const output = {
    [curr]: {},
  }
  if (prev) output[curr]['prev'] = prev
  if (next) output[curr]['next'] = next
  // console.log(output)
  result.push(output)
})

result.sort((a, b) => {
  if (Object.keys(b)[0] < Object.keys(a)[0]) return 1
  if (Object.keys(b)[0] > Object.keys(a)[0]) return -1
})
const json = JSON.stringify(result, null, 2)
fs.writeFile(`overlap_${curr_year}.json`, json, (err, result) => {})
