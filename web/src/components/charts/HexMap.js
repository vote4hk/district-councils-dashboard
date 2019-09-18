import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import * as d3 from 'd3'
import hexmap from './hexmap.svg'
import districtData from './district-data.csv'

export default props => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const d3Container = useRef(null)

  const drawChart = data => {
    if (dimensions.width === 0) {
      return
    }

    const margin = { top: 16, right: 16, bottom: 16, left: 16 }
    const width = dimensions.width
    const height = 500

    const svg = d3
      .select(d3Container.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    var colorScale = d3.scaleSequential(d3.interpolateCool).domain([0, 40])

    var line = d3.line()
    var path = d3.geoPath()

    Promise.all([d3.xml(hexmap), d3.csv(districtData)]).then(ready)

    function ready([hexFile, datapoints]) {
      // Get ready to process the hexagon svg file with D3
      let imported = d3.select(hexFile).select('svg')
      // Remove the stylesheets Illustrator saved
      imported.selectAll('style').remove()
      // Inject the imported svg's contents into our real svg
      svg.html(imported.html())

      // Loop through our csv, finding the g for each state.
      // Use d3 to attach the datapoint to the group.
      // e.g. d3.select("#" + d.code) => d3.select("#CA")
      datapoints.forEach(d => {
        svg
          .select('#' + d.code)
          .attr('class', 'hex-group')
          .each(function() {
            d3.select(this).datum(d)
          })
      })
      // Go through each group.
      // Find the polygons inside, then set their color
      // using our scale
      svg
        .selectAll('.hex-group')
        .each(function(d) {
          var group = d3.select(this)
          group
            .selectAll('polygon')
            .attr('fill', colorScale(d.value))
            .attr('opacity', 1)
            .attr('stroke', 'black')
            .attr('stroke-width', 1)
        })
        .on('mouseover', function(d) {
          d3.select(this)
            .selectAll('polygon')
            .attr('opacity', 0.8)
        })
        .on('mouseout', function(d) {
          d3.select(this)
            .selectAll('polygon')
            .attr('opacity', 1)
        })
        .on('click', function(d) {
          props.onHexClick(d3.select(this).attr('id'))
        })
    }
  }

  useEffect(() => {
    drawChart(props.data)
  })

  useLayoutEffect(() => {
    if (d3Container.current) {
      setDimensions({
        width: d3Container.current.clientWidth,
      })
    }
  }, [])

  return (
    <>
      <div ref={d3Container} style={{ height: 'auto', width: '100%' }}></div>
    </>
  )
}
