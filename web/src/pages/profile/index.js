import React, { Component } from 'react'
import { withTheme } from '@material-ui/core/styles'
import candidates from '../../data/candidates'

class ProfilePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
     
    }
  }

  render() {
    const { match: { params } } = this.props
    return (
        <React.Fragment>
          {params.name}
        </React.Fragment>
    )
  }
}

export default withTheme()(ProfilePage)
