import React from 'react'
import PropTypes from 'prop-types'
import deburr from 'lodash/deburr'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import Popper from '@material-ui/core/Popper'
import { withStyles } from '@material-ui/core/styles'
import { fetchData } from '../utils/httpClient'

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
  const matches = match(suggestion.name, query)
  const parts = parse(suggestion.name, matches)

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) =>
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          ),
        )}
      </div>
    </MenuItem>
  )
}



function getSuggestionValue(suggestion) {
  return suggestion.name
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
  }
})

class PeopleSearcher extends React.Component {
  state = {
    single: '',
    popper: '',
    suggestions: [],
    rawSuggestions: []
  }

   getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase()
    const inputLength = inputValue.length
  
    console.log(this.state.rawSuggestions);
    return inputLength === 0 ? [] : this.state.rawSuggestions.filter(suggestion => suggestion.name && suggestion.name.includes(value))
  }

  async componentDidMount() {
    const query = `
    {
      dc_people {
        name_zh
      }
    }
    `
    const fetched_data = await fetchData(query)
    this.setState({rawSuggestions: fetched_data.data.dc_people.map(i => {
      return {
        name: i.name_zh ? i.name_zh : i.name_en
      }
    })})
  }


  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    })
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

  handleSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    this.props.handlePeopleSelected(suggestion)
  }

  render() {
    const { classes } = this.props
    
    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
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
                style={{ width: this.popperNode ? this.popperNode.clientWidth : null }}
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

export default withStyles(styles)(PeopleSearcher)