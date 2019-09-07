import React from 'react'
import PropTypes from 'prop-types'
import deburr from 'lodash/deburr'
import Autosuggest from 'react-autosuggest'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import Avatar from '@material-ui/core/Avatar'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'

const GET_PEOPLE = gql`
  query($nameRegex: String) {
    dcd_people(
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
        disableUnderline={true}
        {...other}
      />
    </>
  )
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  // todo: use ENV_VAR
  const homeUrl = 'https://cswbrian.github.io/district-councils-dashboard/'
  const { id, name_zh, name_en } = suggestion
  const avatarPath = id
    ? `${homeUrl}/static/images/avatar/${id}.jpg`
    : `${homeUrl}/static/images/avatar/default.png`

  // keyword this is not accessible here. so define the style here
  const suggestionNameStyle = {
    marginLeft: '20px',
    lineHeight: '45px',
  }
  const boldStyle = {
    fontWeight: '800',
  }
  const selectedSuggestionNameStyle = {
    ...suggestionNameStyle,
    ...boldStyle,
  }

  return (
    <MenuItem selected={isHighlighted} component="div">
      <Avatar
        src={avatarPath}
        imgProps={{
          onError: e => {
            e.target.src = `${homeUrl}/static/images/avatar/default.png`
          },
        }}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: 0,
        }}
      />
      <span
        style={
          isHighlighted ? suggestionNameStyle : selectedSuggestionNameStyle
        }
      >
        {name_zh ? name_zh : name_en}
      </span>
    </MenuItem>
  )
}

function getSuggestionValue(suggestion) {
  return suggestion.name_zh ? suggestion.name_zh : suggestion.name_en
}

const styles = theme => ({
  root: {
    height: 100,
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
      <div className={classes.root}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            placeholder: '尋找議員...',
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

PeopleSearcher.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withApollo(withStyles(styles)(PeopleSearcher))
