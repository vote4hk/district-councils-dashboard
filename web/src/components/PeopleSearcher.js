import React from 'react'
import PropTypes from 'prop-types'
import deburr from 'lodash/deburr'
import Autosuggest from 'react-autosuggest'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import Popper from '@material-ui/core/Popper'
import { withStyles } from '@material-ui/core/styles'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'

const GET_PEOPLE = gql`
  query($nameRegex: String) {
    dc_people(
      where: {
        _or: [
          { name_zh: { _like: $nameRegex } }
          { name_en: { _like: $nameRegex } }
        ]
      }
      limit: 50
    ) {
      id
      name_zh
      name_en
    }
  }
`

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node)
          inputRef(node)
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  )
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {isHighlighted ? (
          <span>
            {suggestion.name_zh ? suggestion.name_zh : suggestion.name_en}
          </span>
        ) : (
          <strong>
            {suggestion.name_zh ? suggestion.name_zh : suggestion.name_en}
          </strong>
        )}
      </div>
    </MenuItem>
  )
}

function getSuggestionValue(suggestion) {
  return suggestion.name_zh ? suggestion.name_zh : suggestion.name_en
}

const styles = theme => ({
  root: {
    height: 250,
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    // left: 0,
    // right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
})

class PeopleSearcher extends React.Component {
  state = {
    single: '',
    popper: '',
    suggestions: [],
  }

  getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase()
    const inputLength = inputValue.length

    return inputLength === 0
      ? []
      : this.state.suggestions.filter(
          suggestion => suggestion.name && suggestion.name.includes(value)
        )
  }

  async componentDidMount() {
    const { data } = await this.props.client.query({
      query: GET_PEOPLE,
      variables: {
        nameRegex: '%',
      },
    })
    this.setState({ suggestions: data.dc_people })
  }

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    })
  }

  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    })
  }

  handleSuggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) => {
    this.props.handlePeopleSelected(suggestion)
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = async ({ value, reason }) => {
    if (true) {
      const { data } = await this.props.client.query({
        query: GET_PEOPLE,
        variables: {
          nameRegex: `%${value}%`,
        },
      })
      this.setState({ suggestions: data.dc_people })
    }
  }

  render() {
    const { classes } = this.props

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      onSuggestionSelected: this.handleSuggestionSelected,
      getSuggestionValue,
      renderSuggestion,
    }

    return (
      <div className={this.props.class}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            label: '揾人',
            placeholder: 'Please type a candidate name',
            value: this.state.popper,
            onChange: this.handleChange('popper'),
            inputRef: node => {
              this.popperNode = node
            },
            InputLabelProps: {
              shrink: true,
            },
          }}
          theme={{
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderSuggestionsContainer={options => (
            <Popper anchorEl={this.popperNode} open={Boolean(options.children)}>
              <Paper
                square
                {...options.containerProps}
                style={{
                  width: this.popperNode ? this.popperNode.clientWidth : null,
                }}
              >
                {options.children}
              </Paper>
            </Popper>
          )}
        />
      </div>
    )
  }
}

PeopleSearcher.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withApollo(withStyles(styles)(PeopleSearcher))
