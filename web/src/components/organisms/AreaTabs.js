import React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'

const AreasTabs = styled(Tabs)`
  && {
  }
`

const AreasTab = styled(Tab)`
  && {
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
  const [selectedTab, setSelectedTab] = React.useState(false)
  const [expanded, setExpanded] = React.useState(false)
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
      <AreasTabs
        value={selectedTab}
        onChange={handleChange}
        variant="fullWidth"
      >
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