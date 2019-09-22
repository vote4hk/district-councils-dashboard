import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

class NotFoundPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <>
        TODO - <a href="https://notfound.collaction.hk/">404</a>
      </>
    )
  }
}

export default withStyles(NotFoundPage)
