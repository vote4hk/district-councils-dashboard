import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import PeopleSearcher from '../../components/PeopleSearcher'
import AddressSearcher from '../../components/AddressSearcher'
import area from '../../data/area'
import district from '../../data/district'
import Button from '@material-ui/core/Button'

import * as AddressParser from 'hk-address-parser-lib'

const styles = theme => ({
})

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDistrict: null,
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

  renderDCCA = code => {
    if (!code) return null
    return <div>
      {Object.keys(district['2019'][code]).map(dcca => {
        return (
          <Button component={NavLink} to={`/district/2019/${dcca}`} key={district['2019'][code][dcca].code} color="secondary">{district['2019'][code][dcca].name}</Button>
        )
      })}
    </div>
  }

  render() {
    const { classes } = this.props
    const { autoCompleteList } = this.state

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
            {autoCompleteList.map((address, index) => (<div key={index}><p>{address.fullAddress()}</p></div>))}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            {/* TODO: Build a people.json for the autosuggest and profile */}
            {/* <PeopleSearcher
              handlePeopleSelected={this.handlePeopleSelected}
            /> */}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {
              area.map(a => <Button key={a.dccode} color="primary" onClick={() => this.setState({ selectedDistrict: a.dccode })}>{a.dname_chi}</Button>)
            }
            {this.renderDCCA(this.state.selectedDistrict)}
          </Paper>
        </Grid>
      </Grid>
        

      
      
    )
  }
}

export default withStyles(styles, { withTheme: true })(SearchPage)
