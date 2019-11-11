import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import styled from 'styled-components'
import { Box } from '@material-ui/core'
import * as d3 from 'd3'
import { FONT_FAMILY, COLORS } from 'ui/theme'
import {
  getConstituencyUriFromTag,
  getCodeFromDistrictName,
} from 'utils/helper'

const ROW_HEIGHT = 20

const Styled = styled(Box)`
  && {
    .link {
      text {
        cursor: pointer;
        color: ${COLORS.main.primary};
        font-weight: 500;
      }
    }
  }
`

export default props => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const hideLegend = !!props.hideLegend

  const CAMP_COLORS = [
    COLORS.camp.establishment.background,
    COLORS.camp.other.background,
    COLORS.camp.democracy.background,
  ]

  const d3Container = useRef(null)

  const updateLegend = (res, svg) => {
    if (hideLegend) {
      return
    }
    const data = [
      {
        camp: 'establishment',
        label: '建制',
        color: CAMP_COLORS[0],
        count: res.data.map(d => d['建制']).reduce((c, v) => c + v, 0),
        overhalf_count: res.data
          .map(d => (d['建制'] > d.total / 2 ? 1 : 0))
          .reduce((c, v) => c + v, 0),
      },
      // {
      //   camp: 'other',
      //   label: '其他',
      //   color: CAMP_COLOR_OTH,
      //   count: res.data.map(d => d['其他']).reduce((c, v) => c + v, 0),
      // },
      {
        camp: 'democracy',
        label: '民主',
        color: CAMP_COLORS[2],
        count: res.data.map(d => d['民主']).reduce((c, v) => c + v, 0),
        overhalf_count: res.data
          .map(d => (d['民主'] > d.total / 2 ? 1 : 0))
          .reduce((c, v) => c + v, 0),
      },
    ]

    svg.selectAll('.legend').remove()

    const legend = svg
      .selectAll('legend')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr(
        'transform',
        (d, i) => `translate(${i * (dimensions.width - 90)}, 8)`
      )

    legend
      .append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('dy', '.5em')
      .style('text-anchor', 'start')
      .attr('font-size', '14px')
      .text(function(d) {
        return d.overhalf_count > 9
          ? `${d.label}${d.overhalf_count}區過半數`
          : ''
      })

    legend
      .append('rect')
      .attr('x', 0)
      .attr('y', 16)
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', function(d, i) {
        return d.color
      })

    legend
      .append('text')
      .attr('x', 24)
      .attr('y', 29)
      .style('text-anchor', 'start')
      .text(function(d) {
        return `${d.label} ${d.count}席`
      })
  }

  const drawChart = res => {
    const { columns, data } = res

    if (dimensions.width === 0) {
      return
    }

    const margin = { top: 65, right: 15, bottom: 0, left: 50 }
    let rowHeight = ROW_HEIGHT
    if (hideLegend) {
      margin.top = 0
      margin.left = 15
      rowHeight = ROW_HEIGHT * 1.5
    }
    const width = dimensions.width
    const height = data.length * rowHeight + margin.top + margin.bottom

    const labels = ['建制', '其他', '民主']
    const series = d3
      .stack()
      .keys(columns.slice(1))
      .offset(d3.stackOffsetExpand)(data)

    series.forEach((s, index) => {
      s.forEach((d, y) => {
        d.count = data[y][labels[index]]
        d.index = index
      })
    })

    const yAxis = g =>
      g
        .style('font', `12px ${FONT_FAMILY}`)
        .attr('transform', `translate(${margin.left},0)`)
        .attr('class', 'link')
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
      .range(CAMP_COLORS)
      .unknown('#ccc')

    const y = d3
      .scaleBand()
      .domain(data.map(d => d.name))
      .range([margin.top, height - margin.bottom])
      .padding(0.1)

    const x = d3.scaleLinear().range([margin.left, width - margin.right])

    const isCreate = d3
      .select(d3Container.current)
      .select('svg')
      .empty()

    if (isCreate) {
      const svg = d3
        .select(d3Container.current)
        .append('svg')
        .attr('width', width)
        .attr('height', height)

      const bar = svg
        .append('g')
        .selectAll('g')
        .data(series)
        .enter()
        .append('g')

      bar
        .attr('fill', d => color(d.key))
        .selectAll('rect')
        .data(d => d)
        .join('rect')
        .attr('x', d => (d.index === 0 ? x(d[0]) : x(d[1])))
        .attr('y', (d, i) => y(d.data.name))
        .attr('width', 0)
        .attr('height', y.bandwidth())

      bar
        .selectAll('rect')
        .transition()
        .delay(function(d) {
          return Math.random() * 1000
        })
        .duration(1000)
        .attr('x', d => x(d[0]))
        .attr('width', d => x(d[1]) - x(d[0]))
      bar
        .selectAll('text')
        .data(d => d)
        .join('text')
        .text(function(d, i, groups, f) {
          return d.count === 0
            ? ''
            : d.count + (d.count / d.data.total > 0.1 ? '席' : '')
        })
        .attr('x', d => {
          switch (d.index) {
            case 0:
              return x(d[0]) + 8
            case 2:
              return x(d[1]) - 8
            default:
              return x(d[0]) + (x(d[1]) - x(d[0])) / 2
          }
        })
        .attr('y', (d, i) => y(d.data.name) + y.bandwidth() / 2)
        .attr('alignment-baseline', 'central')
        .attr('text-anchor', d => {
          switch (d.index) {
            case 0:
              return 'start'
            case 2:
              return 'end'
            default:
              return 'middle'
          }
        })
        .attr('font-family', 'sans-serif')
        .attr('font-size', '12px')
        .attr('fill', d => {
          switch (d.index) {
            case 0:
            case 2:
              return 'black'
            default:
              return 'white'
          }
        })

      if (!hideLegend) {
        // Add the y axis and add on click function to it
        svg.append('g').call(yAxis)
        svg.selectAll('.tick').on('click', function(d, i) {
          const code = getCodeFromDistrictName(d)
          window.location = getConstituencyUriFromTag(code)
        })

        svg.append('g').call(xAxis)
      }

      // middle line
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
      updateLegend(res, svg)
    } else {
      // Update chart
      const svg = d3.select(d3Container.current).select('svg')

      const bar = svg
        .select('g')
        .selectAll('g')
        .data(series)

      bar
        .selectAll('rect')
        .data(d => d)
        .join('rect')
        .transition()
        .delay(function(d) {
          return Math.random() * 1000
        })
        .duration(1000)
        .attr('x', d => {
          return x(d[0])
        })
        .attr('y', (d, i) => y(d.data.name))
        .attr('width', d => x(d[1]) - x(d[0]))
        .attr('height', y.bandwidth())

      bar
        .selectAll('text')
        .data(d => d)
        .join('text')
        .text(function(d, i, groups, f) {
          return d.count === 0
            ? ''
            : d.count + (d.count / d.data.total > 0.1 ? '席' : '')
        })
        .attr('opacity', 0)
        .attr('x', d => {
          switch (d.index) {
            case 0:
              return x(d[0]) + 8
            case 2:
              return x(d[1]) - 8
            default:
              return x(d[0]) + (x(d[1]) - x(d[0])) / 2
          }
        })
        .attr('y', (d, i) => y(d.data.name) + y.bandwidth() / 2)
        .attr('alignment-baseline', 'central')
        .attr('text-anchor', d => {
          switch (d.index) {
            case 0:
              return 'start'
            case 2:
              return 'end'
            default:
              return 'middle'
          }
        })
      bar
        .selectAll('text')
        .transition()
        .delay(function(d) {
          return 800 + Math.random() * 500
        })
        .attr('opacity', 1)

      updateLegend(res, svg)
    }
  }

  const updateWindowSize = () => {
    if (d3Container.current) {
      setDimensions({
        width: d3Container.current.clientWidth,
      })
    }
  }

  useEffect(() => {
    window.addEventListener('resize', updateWindowSize)
    drawChart(props.data)
  })

  useLayoutEffect(() => {
    updateWindowSize()
  }, [])

  return (
    <Styled>
      <div ref={d3Container} style={{ height: 'auto', width: '100%' }}></div>
    </Styled>
  )
}
