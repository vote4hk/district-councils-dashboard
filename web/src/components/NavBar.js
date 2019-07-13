import React, { Component } from 'react'
import MobileAppBar from './atom/MobileAppBar'
import DesktopAppBar from './atom/DesktopAppBar'

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
        <DesktopAppBar navs={navs} />
      </>
    )
  }
}

export default NavBar
