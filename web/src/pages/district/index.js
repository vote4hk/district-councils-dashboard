import React, { Component } from 'react'
import { withTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import district from '../../data/district'

class DistrictPage extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { match: { params } } = this.props
    const { year, code } = params
    const districtCode = code.substring(0, 1)
    const dcca = code !== districtCode ? code : null
    const data = district[year][districtCode][dcca]
    return (
      // TODO: UI design
      <Grid container spacing={24}>
        <Grid item xs={9}>
          This is the map
        </Grid>
        <Grid item xs={3}>
        <Card>
              <CardHeader
                title={`${data.code} ${data.name}`}
                subheader={year}
              />
              <CardContent>
              </CardContent>
            </Card>
        </Grid>
        <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
                  主要屋邨 / 地區：
                </Typography>
                <List>
                  {
                    data.mainArea.map((area, index) => <ListItem alignItems="flex-start" key={index}>
                      <ListItemText
                        primary={`${Object.keys(area)[0]}. ${area[Object.keys(area)[0]]}`}
                      />
                    </ListItem>)

                  }
                </List>
        </Grid>
        <Grid item xs={12}>
          <Paper>
                <Typography variant="subtitle1" gutterBottom>
                  估計人口： {data.expectedPopulation}
                </Typography>

                
                
          </Paper>
        </Grid>
        {/* <Grid item xs={6}>
          <Paper>
            <List>
              {
                data.boundaries.map((boundary, index) => <ListItem alignItems="flex-start" key={index}>
                  <ListItemText
                    primary={`${Object.keys(boundary)[0]} ${boundary[Object.keys(boundary)[0]]}`}
                  />
                </ListItem>)

              }
            </List>
          </Paper>
        </Grid> */}
      </Grid>
    )
  }
}

export default DistrictPage
