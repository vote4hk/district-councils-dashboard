import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import * as d3 from 'd3'
import _ from 'lodash'
import * as moment from 'moment'

const TOTAL_RECORDS = 15

export default props => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const d3Container = useRef(null)

  const drawChart = data => {
    if (dimensions.width === 0) {
      return
    }

    const startTime = moment('07:30', 'HH:mm')
    const times = _.times(TOTAL_RECORDS, n =>
      startTime.add(1, 'hour').format('HH:mm')
    )

    const color = d3
      .scaleOrdinal()
      .range([
        props.firstColor ? props.firstColor : '#ca0020',
        props.secondColor ? props.secondColor : '#f4a582',
      ])

    const margin = { top: 50, right: 20, bottom: 30, left: 40 }

    const width = dimensions.width - margin.left - margin.right
    const height = dimensions.width - margin.top - margin.bottom

    const max = _.max(data.constituency)

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
      .domain([0, max])

    const xScale = d3
      .scalePoint()
      .range([0, width])
      .domain(_.range(TOTAL_RECORDS))

    // y axis
    chart.append('g').call(d3.axisLeft(yScale).tickFormat(d3.format('.0%')))

    // // draw the lines
    // chart
    //   .append('g')
    //   .style('color', 'lightgrey')
    //   .style('stroke-opacity', '0.7')
    //   .call(
    //     d3
    //       .axisLeft(yScale)
    //       .tickSizeOuter(0)
    //       .tickSizeInner(-width)
    //       .tickFormat('')
    //   )

    // x axis
    chart
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).tickFormat((d, i) => times[i]))
      .selectAll('text')
      .attr('transform', 'translate(0,0)rotate(-45)')
      .style('text-anchor', 'end')
      .style('fill', '#69a3b2')

    // 7. d3's line generator
    const line = d3
      .line()
      .x((_, i) => xScale(i))
      .y(d => yScale(d))

    const drawLine = (lineData, label, color) => {
      const validData = lineData.filter(d => d !== null)
      const animTime = 1500 + Math.random() * 2000

      svg
        .append('path')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .datum(validData)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', 1.5)
        .attr('stroke-dashoffset', 385)
        .attr('stroke-dasharray', [385, 385])
        .attr('d', line)
        .transition()
        .duration(animTime)
        .attr('stroke-dashoffset', 0)

      svg
        .append('g')
        .selectAll('.dot')
        .data(validData)
        .enter()
        .append('circle')
        .attr('fill', color)
        .attr('class', 'dot')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .attr('cx', (d, i) => xScale(i))
        .attr('cy', d => yScale(d))
        .attr('r', 2)
        .attr('opacity', 0)
        .transition()
        .delay(animTime - 500)
        .duration(2000)
        .attr('opacity', 100)

      svg
        .append('text')
        .attr('class', 'legend')
        .attr('x', xScale(validData.length - 1) + margin.left + 4)
        .attr('y', yScale(validData[validData.length - 1]) + margin.top)
        .attr('dy', '.15em')
        .attr('fill', color)
        .style('text-anchor', 'start')
        .text(label)
        .attr('opacity', 0)
        .transition()
        .delay(animTime - 500)
        .duration(2000)
        .attr('opacity', 100)
    }

    drawLine(data.constituency, 'A01', 'black')
    drawLine(data.district, 'A', 'lightgreen')
    drawLine(data.total, 'HK Total', 'steelblue')
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
