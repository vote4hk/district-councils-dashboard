import React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

TabBar.propTypes = {
  children: PropTypes.node,
  titles: PropTypes.array.isRequired,
  selectedTab: PropTypes.number.isRequired,
  setSelectedTab: PropTypes.func.isRequired,
}

export default function TabBar(props) {
  const { titles, selectedTab, setSelectedTab } = props
  function handleChange(event, newValue) {
    setSelectedTab(newValue)
  }

  return (
    <>
      <Tabs value={selectedTab} onChange={handleChange} centered={true}>
        {titles.map((title, index) => (
          <Tab
            label={title}
            id={`scrollable-auto-tab-${index}`}
            key={index}
            aria-controls={`scrollable-auto-tabpanel-${index}`}
          />
        ))}
      </Tabs>
    </>
  )
}
