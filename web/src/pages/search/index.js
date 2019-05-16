import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import PeopleSearcher from '../../components/PeopleSearcher'
import AddressSearcher from '../../components/AddressSearcher'

import * as AddressParser from 'hk-address-parser-lib'

const styles = theme => ({
})

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoCompleteList: []
    }
  }

  async componentDidMount() {

  }

  async onAddressFieldChanged(evt) {
    const { value } = evt.target;
    const records = await AddressParser.parse(value);
    this.setState({
      autoCompleteList: records,
    })
  }

  handlePeopleSelected = result => {
    this.props.history.push(`profile/${result.name}`)
  }

  render() {
    const { classes } = this.props
    const { autoCompleteList } = this.state;
    return (
      <Grid container spacing={24}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
          {/* TODO: Change the following input to AddressSearcher component, similar to PeopleSearcher */}
            <Input
              defaultValue="Search Address"
              inputProps={{
                'aria-label': 'Description',
              }}
              onChange={this.onAddressFieldChanged.bind(this)}
            />
            { autoCompleteList.map( (address, index) => (<div key={index}><p>{address.fullAddress()}</p></div>))}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
          {/* TODO: Build a people.json for the autosuggest and profile */}
            <PeopleSearcher
            handlePeopleSelected={this.handlePeopleSelected}
            />
          </Paper>
        </Grid>
      </Grid>
        

      
      
    )
  }
}

export default withStyles(styles, { withTheme: true })(SearchPage)
