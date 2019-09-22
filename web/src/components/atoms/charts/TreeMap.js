import React, { Component } from 'react'
import zingchart from 'zingchart'

// MUST define modulesdir for treemaps
// https://www.zingchart.com/docs/api/modules/standard/#modules__modules_list
zingchart.MODULESDIR = 'https://cdn.zingchart.com/modules/'

class TreeMap extends Component {
  componentDidMount() {
    zingchart.render({
      id: this.props.id,
      data: this.props.data,
    })
  }

  //Used to check the values being passed in to avoid unnecessary changes.
  shouldComponentUpdate(nextProps, nextState) {
    //Lazy object comparison
    return !(JSON.stringify(nextProps.data) === JSON.stringify(this.props.data))
  }

  componentWillUpdate(nextProps) {
    zingchart.exec(this.props.id, 'setdata', {
      data: nextProps.data,
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

export default TreeMap
