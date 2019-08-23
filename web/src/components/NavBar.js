import React, { Component } from 'react'
import MobileAppBar from './atoms/MobileAppBar'

const navs = [
  { url: '/', title: 'Search' },
  { url: '/', title: 'District' },
  { url: '/', title: 'People' },
]

class NavBar extends Component {
  render() {
    return (
      <>
        <MobileAppBar navs={navs} />
      </>
    )
  }
}

export default NavBar
