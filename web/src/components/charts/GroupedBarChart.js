import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import * as d3 from 'd3'

export default props => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const d3Container = useRef(null)

  const drawChart = () => {
    const sample = [
      {
        language: 'kotlin',
        value: 200,
      },
    ]
    // TODO: get from react?
    const margin = 50

    const width = dimensions.width - 2 * margin
    const height = dimensions.width - 2 * margin

    console.log(dimensions.width)

    const svg = d3.select(d3Container.current)
    svg.selectAll('g').remove()
    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin}, ${margin})`)

    const yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, 100])

    chart.append('g').call(d3.axisLeft(yScale))

    const xScale = d3
      .scaleBand()
      .range([0, width])
      .domain(sample.map(s => s.language))
      .padding(0.2)

    chart
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))
    chart
      .append('g')
      .attr('class', 'grid')
      .call(
        d3
          .axisLeft()
          .scale(yScale)
          .tickSize(-width, 0, 0)
          .tickFormat('')
      )
    chart
      .selectAll()
      .data(sample)
      .enter()
      .append('rect')
      .attr('x', s => xScale(s.language))
      .attr('y', s => yScale(s.value))
      .attr('height', s => height - yScale(s.value))
      .attr('width', xScale.bandwidth())
  }

  useEffect(() => {
    drawChart()
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
      <svg
        ref={d3Container}
        style={{ height: dimensions.width, width: '100%' }}
      ></svg>
    </>
  )
}
