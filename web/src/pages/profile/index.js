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
import moment from 'moment'
import gql from "graphql-tag";
import { Query } from "react-apollo";


const GET_PEOPLE_PROFILE = gql`
query ($id: uuid!) {
  dc_people( 
    where: { 
      id: { _eq: $id}
    }
  ) {
    name_en
    name_zh
    estimated_yob
    gender
    elections {
      cacode
      year
      constituency {
        name
        expected_population
        deviation_percentage
      }
      political_affiliation {
        name_zh
      }
    }
  }
}
`;


class ProfilePage extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  async componentDidMount() {
  }

  render() {
    const { match: { params: { id } } } = this.props
    return (
      <Query query={GET_PEOPLE_PROFILE} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error! ${error}`;
          const person = data.dc_people[0];
          return (
            <Paper>
              <Card>
                <CardHeader
                  // avatar={
                  //   // TODO: Add candi_number to candidate.json
                  //   <Avatar
                  //     src={`/static/images/avatar/2015/${showCase[showCase.length - 1].cacode}_0${showCase[showCase.length - 1].candi_number}.jpg`}
                  //   >
                  //   </Avatar>
                  // }
                  title={person.name_zh ? person.name_zh : person.name_en}
                  subheader={`${moment().year() - person.estimated_yob}歲`}
                />
                <CardContent>
                </CardContent>
              </Card>
              {/* <Table>
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
              </Table> */}
            </Paper>
          );
        }}
      </Query>
      // TODO: UI design

    )
  }
}

export default ProfilePage
