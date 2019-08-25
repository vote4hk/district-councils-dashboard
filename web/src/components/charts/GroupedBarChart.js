import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import * as d3 from 'd3'
import _ from 'lodash'

export default props => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const d3Container = useRef(null)

  const drawChart = data => {
    if (dimensions.width === 0) {
      return
    }

    const color = d3.scaleOrdinal().range(['#ca0020', '#f4a582'])

    const margin = { top: 50, right: 20, bottom: 30, left: 40 }

    const width = dimensions.width - margin.left - margin.right
    const height = dimensions.width - margin.top - margin.bottom

    const max = _.maxBy(data, r => _.max(r.values)).values[0]

    const svg = d3
      .select(d3Container.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)

    svg.selectAll('g').remove()
    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    const yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, max]) // space for showing legend

    const x0 = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map(s => s.label))
      .padding(0.1)

    const x1 = d3
      .scaleBand()
      .domain(d3.range(2))
      .range([0, x0.bandwidth() - 10])
    // y axis
    chart.append('g').call(d3.axisLeft(yScale))

    // draw the lines
    chart
      .append('g')
      .style('color', 'lightgrey')
      .style('stroke-opacity', '0.7')
      .call(
        d3
          .axisLeft(yScale)
          .tickSizeOuter(0)
          .tickSizeInner(-width)
          .tickFormat('')
      )

    // x axis
    chart
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x0))
      .selectAll('text')
      .attr('transform', 'translate(0,0)rotate(-45)')
      .style('text-anchor', 'end')
      .style('fill', '#69a3b2')

    const slice = svg
      .selectAll('.slice')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'g')
      .attr(
        'transform',
        d => `translate(${x0(d.label) + margin.left + 5},${margin.top})`
      )

    slice
      .selectAll('rect')
      .data(d => d.values)
      .enter()
      .append('rect')
      .attr('width', x1.bandwidth())
      .attr('x', (d, i) => x1(i))
      .attr('y', d => yScale(0))
      .attr('height', d => height - yScale(0))
      .style('fill', (d, i) => color(i))

    slice
      .selectAll('rect')
      .transition()
      .delay(function(d) {
        return Math.random() * 1000
      })
      .duration(1000)
      .attr('y', d => yScale(d))
      .attr('height', d => height - yScale(d))

    //Legend
    const legend = svg
      .selectAll('.legend')
      .data(data[0].labels)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(0, ${i * 20})`)

    legend
      .append('rect')
      .attr('x', width - 20)
      .attr('width', 14)
      .attr('height', 14)
      .style('fill', function(d) {
        return color(d)
      })

    legend
      .append('text')
      .attr('x', width)
      .attr('y', 7)
      .attr('dy', '.35em')
      .style('text-anchor', 'start')
      .text(function(d) {
        return d
      })
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
      <svg
        ref={d3Container}
        style={{ height: dimensions.width, width: '100%' }}
      ></svg>
    </>
  )
}
