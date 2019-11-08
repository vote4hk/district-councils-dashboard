import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import SwipeableViews from 'react-swipeable-views'

const StyledAppBar = styled(AppBar)`
  && {
    box-shadow: none;
    background: white;
    .MuiTabs-indicator {
      background: ${props => props.indicatorcolor || 'black'};
    }
    .MuiTab-wrapper {
      text-transform: capitalize;
    }
    border-bottom: 1px solid #e8e8e8;
  }
`

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
  const {
    titles,
    children,
    buttonLayout,
    indicatorcolor,
    tabnumber = 0,
    variant,
  } = props
  const [selectedTab, setSelectedTab] = React.useState(tabnumber)
  function handleChange(event, newValue) {
    setSelectedTab(newValue)
  }
  function handleChangeIndex(newValue) {
    setSelectedTab(newValue)
  }

  const shouldCenter = buttonLayout === 'centered' ? true : false

  return (
    <>
      <StyledAppBar position="static" indicatorcolor={indicatorcolor}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          centered={shouldCenter}
          variant={variant || 'scrollable'} // 'centered', 'scrollable', 'fullWidth'
          scrollButtons="auto"
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
      </StyledAppBar>
      <SwipeableViews index={selectedTab} onChangeIndex={handleChangeIndex}>
        {// TODO: support single tab
        children &&
          children.length > 0 &&
          children
            .filter(child => child)
            .map((child, index) => <TabPanel key={index}>{child}</TabPanel>)}
      </SwipeableViews>
    </>
  )
}
