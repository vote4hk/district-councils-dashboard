import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import _ from 'lodash'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  }
}

export default function ScrollableTabsButtonAuto(props) {
  const [value, setValue] = React.useState(0)
  const { person } = props

  // Get all the me
  const allMeetings = _.flatten(
    person.councillors.map(c => c.meeting_attendances)
  )
  function handleChange(event, newValue) {
    setValue(newValue)
  }

  return (
    <>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="出席記錄" {...a11yProps(0)} />
          <Tab label="議題立場" {...a11yProps(1)} />
          <Tab label="選舉紀錄" {...a11yProps(2)} />
          <Tab label="聯絡資料" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">會議</TableCell>
              <TableCell align="right">性質</TableCell>
              <TableCell align="right">年份</TableCell>
              <TableCell align="right">與席</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allMeetings.map((m, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {m.meeting.meet_name}
                </TableCell>
                <TableCell align="right">{m.meeting.meet_type}</TableCell>
                <TableCell align="right">{m.meeting.meet_year}</TableCell>
                <TableCell align="right">
                  {m.attended}/{m.total}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabPanel>
      <TabPanel value={value} index={1}>
        稍後更新
      </TabPanel>
      <TabPanel value={value} index={2}>
        稍後更新
      </TabPanel>
      <TabPanel value={value} index={3}>
        稍後更新
      </TabPanel>
    </>
  )
}
