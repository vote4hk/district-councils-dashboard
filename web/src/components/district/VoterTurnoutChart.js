import React, { Component } from 'react'
import zingchart from 'zingchart'

// MUST define modulesdir for VoterTurnoutChart
// https://www.zingchart.com/docs/api/modules/standard/#modules__modules_list
zingchart.MODULESDIR = 'https://cdn.zingchart.com/modules/'

const chartJSON = chartData => {
  const data = { male: [], female: [] }

  Object.values(chartData.data).map(value => {
    data['male'].push(value['male'])
    data['female'].push(value['female'])
  })

  const titles = Object.keys(chartData.data)

  // Demo
  // https://codepen.io/pen/?editors=1010

  return {
    type: 'bar',
    stacked: true,
    'stack-type': 'normal',
    title: {
      text: '投票人士年齡分布',
      x: '40px',
      y: '5px',
      align: 'left',
    },
    subtitle: {
      text: '佔全部',
      x: '175px',
      y: '5px',
      align: 'left',
      bold: false,
      'font-size': '10px',
      'font-color': '#7E7E7E',
      'background-color': 'none',
    },
    plot: {
      'bar-width': '25px',
      'hover-state': {
        visible: false,
      },
      animation: {
        delay: 300,
        sequence: 1,
      },
      valueBox: {
        text: '%total',
        rules: [
          {
            rule: '%stack-top == 0',
            visible: 0,
          },
        ],
        decimals: 0,
      },
    },
    'scale-x': {
      values: titles,
      tick: {
        visible: false,
      },
      guide: {
        visible: false,
      },
      item: {
        'font-color': '#8B8B8B',
      },
    },
    'scale-y': {
      short: true,
      'line-color': '#7E7E7E',
      tick: {
        visible: false,
      },
      guide: {
        'line-style': 'solid',
      },
      item: {
        'font-color': '#8B8B8B',
      },
    },
    series: [
      {
        values: data.male,
        'background-color': '#003f5c',
      },
      {
        values: data.female,
        'background-color': '#ff6361',
      },
    ],
    tooltip: {
      visible: false,
    },
  }
}

class VoterTurnoutChart extends Component {
  componentDidMount() {
    zingchart.render({
      id: this.props.id,
      // data: this.props.data,
      data: chartJSON(this.props.data),
    })
  }

  //Used to check the values being passed in to avoid unnecessary changes.
  shouldComponentUpdate(nextProps, nextState) {
    //Lazy object comparison
    return !(JSON.stringify(nextProps.data) === JSON.stringify(this.props.data))
  }

  componentWillUpdate(nextProps) {
    zingchart.exec(this.props.id, 'setdata', {
      data: chartJSON(nextProps.data), //nextProps.data,
    })
  }

  render() {
    return (
      <div
        id={this.props.id}
        style={{
          width: this.props.width || '100%',
          height: this.props.height || '450px',
        }}
      ></div>
    )
  }
}

export default VoterTurnoutChart
