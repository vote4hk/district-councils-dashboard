import React, { Component } from 'react'
import * as d3 from 'd3'

/**
 * Idea from https://gist.github.com/XavierGimenez/8070956
 */

class WaffleChart extends Component {
  drawChart(data) {
    var total = 0
    var width,
      height,
      widthSquares = 20,
      heightSquares = 20,
      squareSize = 20,
      squareValue = 0,
      gap = 1,
      theData = []
    var color = d3.scaleOrdinal(d3.schemeCategory10)
    //total

    total = d3.sum(data, function(d) {
      return d.population
    })
    //value of a square
    squareValue = total / (widthSquares * heightSquares)
    console.log(squareValue)
    //remap data
    data.forEach(function(d, i) {
      d.population = +d.population
      d.units = Math.round(d.population / squareValue)
      d.percentage = Math.floor((d.population * 100) / total)
      theData = theData.concat(
        Array(d.units + 1)
          .join(1)
          .split('')
          .map(function() {
            return {
              squareValue: squareValue,
              units: d.units,
              population: d.population,
              percentage: d.percentage,
              groupIndex: i,
            }
          })
      )
    })
    width = squareSize * widthSquares + widthSquares * gap + 25
    height = squareSize * heightSquares + heightSquares * gap + 25
    d3.select('#waffle')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .selectAll('div')
      .data(theData)
      .enter()
      .append('rect')
      .attr('width', squareSize)
      .attr('height', squareSize)
      .attr('fill', function(d) {
        return color(d.groupIndex)
      })
      .attr('y', function(d, i) {
        // const row = i % heightSquares;
        // return (heightSquares * squareSize) - ((row * squareSize) + (row * gap))
        const row = Math.floor(i / widthSquares)
        return row * squareSize + row * gap
      })
      .attr('x', function(d, i) {
        //group n squares for column
        // const col = Math.floor(i / heightSquares);
        // return (col * squareSize) + (col * gap);
        const col = i % widthSquares
        return col * squareSize + col * gap
      })
      .append('title')
      .text(function(d, i) {
        return (
          data[d.groupIndex].name +
          ' | ' +
          d.population +
          ' , ' +
          d.percentage +
          '%'
        )
      })
    //add legend with categorical data
    var legend = d3
      .select('#legend')
      .append('svg')
      .attr('width', 300)
      .attr('height', 200)
      .append('g')
      .selectAll('div')
      .data(data)
      .enter()
      .append('g')
      .attr('transform', function(d, i) {
        return 'translate(0,' + i * 20 + ')'
      })
    legend
      .append('rect')
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', function(d, i) {
        return color(i)
      })
    legend
      .append('text')
      .attr('x', 25)
      .attr('y', 13)
      .text(function(d) {
        return d.name
      })
    //add value of a unit square
    var legend2 = d3
      .select('#legend')
      .select('svg')
      .append('g')
      .attr('transform', 'translate(200,0)')
    legend2
      .append('text')
      .attr('y', '14')
      .attr('font-size', '18px')
      .text('Total: ' + total)
      .attr('fill', '#444444')
  }

  componentDidMount() {
    this.drawChart(this.props.data)
  }

  render() {
    return (
      <>
        <div id="waffle"></div>

        <div id="legend"></div>
      </>
    )
  }
}

export default WaffleChart
