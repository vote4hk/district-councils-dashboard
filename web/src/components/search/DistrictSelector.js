import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import area from '../../data/area'
import district from '../../data/district'
import Button from '@material-ui/core/Button'
import { NavLink } from 'react-router-dom'

const Container = styled.div`
  && {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
`

const SideBar = styled(Box)`
  && {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    min-width: 200px;
    max-width: 200px;
  }
`

const MainContent = styled(Box)`
  && {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: baseline;
    padding-left: 32px;
    padding-right: 32px;
    flex-grow: 1;
  }
`

const SideBarItem = styled(Button)`
  && {
    width: 100%;
  }
`

const DistrictContainer = styled(Button)`
  && {
    width: 120px;
    justify-content: left;
  }
`

class DistrictSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDistrict: null,
    }
  }
  renderDCCA = code => {
    if (!code) return null
    return (
      <div>
        {Object.keys(district['2019'][code]).map(dcca => {
          return (
            <DistrictContainer
              component={NavLink}
              to={`/district/2019/${dcca}`}
              key={district['2019'][code][dcca].code}
              color="secondary"
            >
              <Typography variant="h6">
                {district['2019'][code][dcca].name}
              </Typography>
            </DistrictContainer>
          )
        })}
      </div>
    )
  }

  render() {
    return (
      <Container maxWidth="lg">
        <SideBar>
          {area.map(a => (
            <SideBarItem
              key={a.dccode}
              color="primary"
              onClick={() => this.setState({ selectedDistrict: a.dccode })}
            >
              {a.dname_chi}
            </SideBarItem>
          ))}
        </SideBar>
        <MainContent>
          <Typography variant="subtitle1">
            {this.renderDCCA(this.state.selectedDistrict)}
          </Typography>
        </MainContent>
      </Container>
    )
  }
}

export default DistrictSelector
