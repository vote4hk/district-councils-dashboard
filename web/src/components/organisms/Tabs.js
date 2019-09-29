import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import TabBar from 'components/molecules/TabBar'

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
  titles: PropTypes.array.isRequired,
}

export default function ScrollableTabs(props) {
  const [selectedTab, setSelectedTab] = React.useState(0)
  const { titles, children } = props

  return (
    <>
      <TabBar
        titles={titles}
        setSelectedTab={setSelectedTab}
        selectedTab={selectedTab}
      />
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
