import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component="div"
      role="tabpanel"
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <>{children}</>
    </Typography>
  )
}

ScrollableTabs.propTypes = {
  children: PropTypes.node,
  titles: PropTypes.array,
  buttonLayout: PropTypes.oneOf(['left', 'centered']),
}

ScrollableTabs.defaultProps = {
  buttonLayout: 'left',
}

export default function ScrollableTabs(props) {
  const [selectedTab, setSelectedTab] = React.useState(0)
  const { titles, children, buttonLayout } = props
  function handleChange(event, newValue) {
    setSelectedTab(newValue)
  }

  const shouldCenter = buttonLayout === 'centered' ? true : false

  return (
    <>
      <AppBar position="static">
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          centered={shouldCenter}
          color="primary"
        >
          {titles.map((title, index) => (
            <Tab
              label={title}
              id={`scrollable-auto-tab-${index}`}
              key={index}
              aria-controls={`scrollable-auto-tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </AppBar>
      {// TODO: support single tab
      children &&
        children.length > 0 &&
        children.map((child, index) => (
          <TabPanel key={index} hidden={selectedTab !== index}>
            {child}
          </TabPanel>
        ))}
    </>
  )
}
