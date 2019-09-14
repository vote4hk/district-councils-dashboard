import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import * as d3 from 'd3'
import { FONT_FAMILY } from 'ui/theme/main'
const ROW_HEIGHT = 20

export default props => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const d3Container = useRef(null)

  const drawChart = data => {
    if (dimensions.width === 0) {
      return
    }

    const margin = { top: 110, right: 15, bottom: 20, left: 50 }
    const width = dimensions.width
    const height = data.length * ROW_HEIGHT + margin.top + margin.bottom

    const labels = ['建制', '其他', '非建制']
    const series = d3
      .stack()
      .keys(data.columns.slice(1))
      .offset(d3.stackOffsetExpand)(data)

    const yAxis = g =>
      g
        .style('font', `12px ${FONT_FAMILY}`)
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).tickSizeOuter(0))
        .call(g => g.selectAll('.domain').remove())

    const xAxis = g =>
      g
        .style('font', `12px ${FONT_FAMILY}`)
        .attr('transform', `translate(0,${margin.top})`)
        .call(d3.axisTop(x).ticks(width / 100, '%'))
        .call(g => g.selectAll('.domain').remove())

    const color = d3
      .scaleOrdinal()
      .domain(series.map(d => d.key))
      .range(['#ff6779', '#eeeeee', '#00c376'])
      .unknown('#ccc')

    const y = d3
      .scaleBand()
      .domain(data.map(d => d.name))
      .range([margin.top, height - margin.bottom])
      .padding(0.1)

    const x = d3.scaleLinear().range([margin.left, width - margin.right])

    const svg = d3
      .select(d3Container.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
    // .attr('viewBox', [0, 0, width, height])
    // .style('overflow', 'visible')

    svg
      .append('g')
      .selectAll('g')
      .data(series)
      .enter()
      .append('g')
      .attr('fill', d => color(d.key))
      .selectAll('rect')
      .data(d => d)
      .join('rect')
      .attr('x', d => x(d[0]))
      .attr('y', (d, i) => y(d.data.name))
      .attr('width', d => x(d[1]) - x(d[0]))
      .attr('height', y.bandwidth())

    svg.append('g').call(xAxis)
    svg.append('g').call(yAxis)

    const middle = (width + margin.left - margin.right) / 2
    svg
      .append('line')
      .attr('x1', middle + 1)
      .attr('y1', margin.top)
      .attr('x2', middle + 1)
      .attr('y2', height - margin.bottom)
      .attr('stroke-width', 1)
      .attr('stroke', '#3a3a3a')
      .attr('opacity', '0.6')
      .style('stroke-dasharray', '10, 4')

    //Legend
    const legend = svg
      .selectAll('.legend')
      .data(labels)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(0, ${10 + i * 23})`)

    legend
      .append('rect')
      .attr('x', width - margin.right - 50)
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', function(d) {
        return color(d)
      })

    legend
      .append('text')
      .attr('x', width - margin.right - 20)
      .attr('y', 9)
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
      <div ref={d3Container} style={{ height: 'auto', width: '100%' }}></div>
    </>
  )
}
