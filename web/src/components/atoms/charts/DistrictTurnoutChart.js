import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import * as d3 from 'd3'
import _ from 'lodash'
import * as moment from 'moment'
import { COLORS } from 'ui/theme'
import { useTranslation } from 'react-i18next'

const TOTAL_RECORDS = 15

export default props => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const d3Container = useRef(null)
  const { t } = useTranslation()

  const drawChart = (data, labels) => {
    if (dimensions.width === 0) {
      return
    }

    const COLOR_CONSTITUENCY = COLORS.main.primary
    const COLOR_DISTRICT = '#ff574f'
    const COLOR_TOTAL = '#ffbc4c'

    const startTime = moment('07:30', 'HH:mm')
    const times = _.times(TOTAL_RECORDS, n =>
      startTime.add(1, 'hour').format('HH:mm')
    )

    const margin = { top: 20, right: 20, bottom: 50, left: 50 }

    const width = dimensions.width - margin.left - margin.right
    const height = (dimensions.width * 2) / 3 - margin.top - margin.bottom

    const max = Math.max(
      Math.min(
        _.maxBy(
          _.concat(data.constituency, data.total, data.district),
          d => d || 0
        ) + 0.05,
        1.0
      ),
      0.2
    )

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

    // x axis
    chart
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).tickFormat((d, i) => times[i]))
      .selectAll('text')
      .attr('transform', 'translate(0,0)rotate(-45)')
      .style('text-anchor', 'end')
      .style('fill', '#69a3b2')

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

    // 7. d3's line generator
    const lineFunc = d3
      .line()
      .x((_, i) => xScale(i))
      .y(d => yScale(d))

    const drawLine = (lineData, label, styles) => {
      const validData = lineData.filter(d => d !== null)
      const animTime = 1500 + Math.random() * 2000

      svg
        .append('path')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .datum(validData)
        .attr('fill', 'none')
        .attr('stroke', styles.color)
        .attr('stroke-width', 1.5)
        .attr('opacity', styles.opactiy || 1.0)
        .attr('stroke-dashoffset', width * 2)
        .attr('stroke-dasharray', [width * 2, width * 2])
        .attr('d', lineFunc)
        .transition()
        .duration(animTime)
        .attr('stroke-dashoffset', 0)
        .transition()
        .duration(0)
        .attr('stroke-dasharray', styles['stroke-dasharray'])

      svg
        .append('g')
        .selectAll('.dot')
        .data(validData)
        .enter()
        .append('circle')
        .attr('fill', styles.color)
        .attr('class', 'dot')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .attr('cx', (d, i) => xScale(i))
        .attr('cy', d => yScale(d))
        .attr('r', 2)
        .attr('opacity', 0)
        .transition()
        .delay(animTime - 500)
        .duration(2000)
        .attr('opacity', styles.opactiy || 1.0)
    }

    if (data.constituency[0] !== null) {
      drawLine(data.constituency, labels.constituency, {
        color: COLOR_CONSTITUENCY,
      })
      drawLine(data.district, labels.district, {
        color: COLOR_DISTRICT,
        'stroke-dasharray': '5, 2',
        opactiy: 0.8,
      })
      drawLine(data.total, labels.total, {
        color: COLOR_TOTAL,
        'stroke-dasharray': '5, 5',
        opactiy: 0.5,
      })
    } else {
      svg
        .append('g')
        .append('text')
        .attr('font-size', '30px')
        .style('text-anchor', 'middle')
        .style('fill', COLOR_CONSTITUENCY)
        .text(t('turnont_chart.no_data'))
        .attr(
          'transform',
          `translate(${width / 2 + margin.left},${height / 2 +
            margin.top})rotate(-30)`
        )
    }

    //Legend
    const legend = svg
      .selectAll('.legend')
      .data(Object.values(labels))
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(${margin.left + i * 140}, 0)`)

    legend
      .append('rect')
      .attr('width', 14)
      .attr('height', 14)
      .style('fill', function(d, i) {
        return [COLOR_CONSTITUENCY, COLOR_DISTRICT, COLOR_TOTAL][i]
      })

    legend
      .append('text')
      .attr('x', 16)
      .attr('y', 7)
      .attr('dy', '.35em')
      .style('text-anchor', 'start')
      .style('fill', function(d, i) {
        return [COLOR_CONSTITUENCY, COLOR_DISTRICT, COLOR_TOTAL][i]
      })
      .text(function(d) {
        return d
      })
  }

  useEffect(() => {
    drawChart(props.data, props.labels)
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
        style={{ height: (dimensions.width * 2) / 3, width: '100%' }}
      ></svg>
    </>
  )
}
