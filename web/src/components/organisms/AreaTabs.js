import React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import { COLORS } from 'ui/theme'

const AreasTabs = styled(Tabs)`
  && {
  }
`
// Updated 2019-10-19 Hackathon - make the AreasTab look like a button
const AreasTab = styled(Tab)`
  && {
    background-color: ${COLORS.main.primary};
    color: ${COLORS.main.background};
    margin: 3px 5px;
    :hover {
      color: ${COLORS.main.primary};
      background-color: ${COLORS.main.background};
      border-color: 1px ${COLORS.main.primary} solid;
    }
  }
`

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component="div"
      role="tabpanel"
      id={`district-tabpanel-${index}`}
      aria-labelledby={`district-tab-${index}`}
      {...other}
    >
      <>{children}</>
    </Typography>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  titles: PropTypes.array,
}

export default function AreaTabs(props) {
  const [selectedTab, setSelectedTab] = React.useState(
    props.expanded ? 0 : false
  )
  const [expanded, setExpanded] = React.useState(props.expanded)
  const { titles, children } = props

  function handleChange(event, newValue) {
    if (selectedTab === newValue) {
      setExpanded(!expanded)
      setSelectedTab(false)
    } else {
      setExpanded(true)
      setSelectedTab(newValue)
    }
  }

  return (
    <>
      <AreasTabs value={selectedTab} onChange={handleChange} centered>
        {titles.map((title, index) => (
          <AreasTab
            label={title}
            id={`district-tab-${index}`}
            key={index}
            aria-controls={`district-tabpanel-${index}`}
          />
        ))}
      </AreasTabs>
      {// TODO: support single tab
      children &&
        children.length > 0 &&
        children.map((child, index) => (
          <TabPanel key={index} hidden={!expanded || selectedTab !== index}>
            {child}
          </TabPanel>
        ))}
    </>
  )
}
