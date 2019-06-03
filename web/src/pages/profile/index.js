import React, { Component } from 'react'
import { withTheme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import candidates from '../../data/candidates'

class ProfilePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
     
    }
  }

  render() {
    const { match: { params } } = this.props
    const showCase = candidates.filter(candidate => candidate.name_chi === params.name )
    return (
      // TODO: UI design
      <Paper>
        <Card>
          <CardHeader
            avatar={
              // TODO: Add candi_number to candidate.json
              <Avatar 
              src={`/static/images/avatar/2015/${showCase[showCase.length-1].cacode}_0${showCase[showCase.length-1].candi_number}.jpg`}
              >
              </Avatar>
            }
            title={showCase[0].name_chi}
            subheader={`${showCase[showCase.length-1].age}歲 (${showCase[showCase.length-1].year})`}
          />
          <CardContent>
          </CardContent>
    </Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Year</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Distict</TableCell>
            <TableCell>DCCA</TableCell>
            <TableCell>Camp</TableCell>
            <TableCell>political_affiliation</TableCell>
            <TableCell align="right">votes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {showCase.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.year}
              </TableCell>
              <TableCell align="right">{row.age}</TableCell>
              <TableCell align="right">{row.district_name_chi}</TableCell>
              <TableCell align="right">{row.CANAME_chi}</TableCell>
              <TableCell align="right">{row.camp}</TableCell>
              <TableCell align="right">{row.political_affiliation}</TableCell>
              <TableCell align="right">{`${row.votes} (${row.percentage}%)`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    )
  }
}

export default ProfilePage
