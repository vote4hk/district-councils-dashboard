import React, { Component } from 'react'
import * as d3 from 'd3'
import {
  COLOR_CAMP_PAN_DEMO,
  COLOR_CAMP_PAN_EST,
  COLOR_CAMP_OTHER,
  FONT_FAMILY,
} from 'ui/theme/main'
const ROW_HEIGHT = 50

class StackedNormalizedHorizontalBarChart extends Component {
  drawChart(data) {
    const margin = { top: 50, right: 20, bottom: 50, left: 80 }
    const height = data.length * ROW_HEIGHT + margin.top + margin.bottom
    const width = 1000

    const series = d3
      .stack()
      .keys(data.columns.slice(1))
      .offset(d3.stackOffsetExpand)(data)

    const yAxis = g =>
      g
        .style('font', `24px ${FONT_FAMILY}`)
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).tickSizeOuter(0))
        .call(g => g.selectAll('.domain').remove())

    const xAxis = g =>
      g
        .style('font', `24px ${FONT_FAMILY}`)
        .attr('transform', `translate(0,${margin.top})`)
        .call(d3.axisTop(x).ticks(width / 100, '%'))
        .call(g => g.selectAll('.domain').remove())

    const color = d3
      .scaleOrdinal()
      .domain(series.map(d => d.key))
      .range(['#ea3c53', '#eeeeee', '#63b9e9'])
      .unknown('#ccc')

    const y = d3
      .scaleBand()
      .domain(data.map(d => d.name))
      .range([margin.top, height - margin.bottom])
      .padding(0.1)

    const x = d3.scaleLinear().range([margin.left, width - margin.right])

    const svg = d3
      .select('#stacked')
      .append('svg')
      .attr('viewBox', [0, 0, width, height])
      .style('overflow', 'visible')

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
      .attr('stroke-width', 3)
      .attr('stroke', '#3a3a3a')
      .style('stroke-dasharray', '10, 10')
  }

  componentDidMount() {
    const { data } = this.props
    this.drawChart(data)
  }

  render() {
    return (
      <>
        <div id="stacked" style={{ height: 'auto', width: '100%' }}></div>
      </>
    )
  }
}

export default StackedNormalizedHorizontalBarChart
