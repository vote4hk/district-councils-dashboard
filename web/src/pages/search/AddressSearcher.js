import React from 'react'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment'
import * as AddressParser from 'hk-address-parser-lib'
import { getAllFeaturesFromPoint } from 'utils/features'
import _ from 'lodash'

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps

  return (
    <>
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
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton className={classes.searchButton} aria-label="Search">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...other}
      />
    </>
  )
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query)
  const parts = parse(suggestion.label, matches)

  return (
    <MenuItem selected={isHighlighted} component="div">
      {parts.map((part, index) =>
        part.highlight ? (
          <span key={String(index)} style={{ fontWeight: 500 }}>
            {part.text}
          </span>
        ) : (
          <strong key={String(index)} style={{ fontWeight: 300 }}>
            {part.text}
          </strong>
        )
      )}
    </MenuItem>
  )
}

function getSuggestionValue(suggestion) {
  return suggestion.label
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
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
  suggestInput: {
    height: '60px',
    borderRadius: '4px',
    boxShadow: '0 2px 16px 0 rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    padding: '10px 20px',
  },
  input: {
    textDecoration: 'none',
  },
  searchButton: {
    color: '#ffd731',
  },
})

class IntegrationAutosuggest extends React.Component {
  state = {
    value: '',
    suggestions: [],
  }

  debounced = null

  async getSuggestions(value) {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    if (inputLength > 0) {
      const records = await AddressParser.parse(inputValue)
      const result = records
        .filter((_, index) => index < 10)
        .map(record => ({
          coordinate: record.coordinate(),
          label: record.fullAddress(AddressParser.Address.LANG_ZH),
        }))

      return result
    }

    return []
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    if (this.debounced) {
      this.debounced.cancel()
    }
    this.debounced = _.debounce(() => {
      this.getSuggestions(value).then(result => {
        this.setState({
          suggestions: result,
        })
      })
    }, 300)
    this.debounced()
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
    const constituency = getAllFeaturesFromPoint(suggestion.coordinate)
    // TODO: better to use action to dispatch this event
    this.props.handleAddressSelected(constituency)

    this.setState({
      value: '',
    })
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
      <div className={classes.root}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            placeholder: '尋找選區...',
            value: this.state.value,
            onChange: this.handleChange('value'),
            InputLabelProps: {
              shrink: true,
            },
          }}
          theme={{
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
            input: classes.suggestInput,
          }}
          renderSuggestionsContainer={options => (
            <Paper
              square
              {...options.containerProps}
              style={{
                width: '100%',
              }}
            >
              {options.children}
            </Paper>
          )}
        />
      </div>
    )
  }
}

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(IntegrationAutosuggest)
