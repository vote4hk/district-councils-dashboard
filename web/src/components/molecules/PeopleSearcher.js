import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'
import { Box, TextField } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
//import Avatar from '@material-ui/core/Avatar'
import { PeopleAvatar } from 'components/atoms/Avatar'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import _ from 'lodash'
import styled from 'styled-components'
import { getColorFromCamp } from 'utils/helper'

const GET_PEOPLE = gql`
  query($nameRegex: String) {
    dcd_candidates(
      where: {
        person: {
          _or: [
            { name_zh: { _like: $nameRegex } }
            { name_en: { _ilike: $nameRegex } }
          ]
        }
      }
      limit: 50
      order_by: { person_id: asc, year: desc }
      distinct_on: person_id
    ) {
      person {
        id
        uuid
        name_zh
        name_en
      }
      camp
      year
      constituency {
        code
        name_zh
        name_en
        district {
          dc_name_zh
          dc_name_en
        }
      }
    }
  }
`

const Container = styled(Box)`
  && {
    width: 100%;
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
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton color="primary" aria-label="Search">
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

const PeopleSearcher = props => {
  const { classes, handlePeopleSelected } = props
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState([])
  let debounced = null

  const onChange = (event, { newValue }) => {
    setValue(newValue)
  }

  const fetchUsers = async keyword => {
    const { data } = await props.client.query({
      query: GET_PEOPLE,
      variables: {
        nameRegex: `%${keyword}%`,
      },
    })
    data.dcd_candidates.sort((a, b) => b.year - a.year)
    return data.dcd_candidates
  }

  const onSuggestionsFetchRequested = ({ value }) => {
    if (debounced) {
      debounced.cancel()
    }
    debounced = _.debounce(() => {
      fetchUsers(value).then(result => {
        setSuggestions(result)
      })
    }, 500)
    debounced()
  }

  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  }

  const getSuggestionValue = suggestion => {
    return suggestion.name_zh ? suggestion.name_zh : suggestion.name_en
  }

  const renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const homeUrl = process.env.REACT_APP_HOST_URI
    const { person, camp, constituency } = suggestion
    const { uuid, name_zh, name_en } = person
    const district = constituency['district']

    const avatarPath = uuid
      ? `${homeUrl}/static/images/avatar/${uuid}.jpg`
      : `${homeUrl}/static/images/avatar/default.png`

    // keyword this is not accessible here. so define the style here
    const suggestionNameStyle = {
      float: 'left',
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
    const suggestionDistrictStyle = {
      marginLeft: '8px',
      fontWeight: 500,
      fontSize: '14px',
      color: '#777777',
      float: 'right',
      textAlign: 'right',
      lineHeight: '46px',
    }
    const selectedSuggestionDistrictStyle = {
      ...suggestionDistrictStyle,
      ...boldStyle,
    }

    return (
      <MenuItem selected={isHighlighted} component="div">
        <PeopleAvatar
          borderwidth={2}
          camp={getColorFromCamp(camp)}
          src={avatarPath}
          imgProps={{
            onError: e => {
              e.target.src = `${homeUrl}/static/images/avatar/default.png`
            },
          }}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '24px',
          }}
        />
        <div>
          <span
            style={
              isHighlighted ? suggestionNameStyle : selectedSuggestionNameStyle
            }
          >
            {name_zh ? name_zh : name_en}
          </span>
          <span
            style={
              isHighlighted
                ? suggestionDistrictStyle
                : selectedSuggestionDistrictStyle
            }
          >
            {district
              ? `${district['dc_name_zh']}｜${constituency['name_zh']}`
              : ''}
          </span>
        </div>
      </MenuItem>
    )
  }

  const renderSuggestionsContainer = options => (
    <Paper
      square
      {...options.containerProps}
      style={{
        width: '100%',
      }}
    >
      {options.children}
    </Paper>
  )

  const onSuggestionSelected = (evt, { suggestion }) => {
    handlePeopleSelected(suggestion.person)
  }

  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    classes,
    placeholder: '輸入候選人姓名...',
    value,
    onChange,
    InputLabelProps: {
      shrink: true,
    },
  }

  // Finally, render it!
  return (
    <Container>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderSuggestionsContainer={renderSuggestionsContainer}
        inputProps={inputProps}
        renderInputComponent={renderInputComponent}
        theme={{
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
          input: classes.suggestInput,
        }}
      />
    </Container>
  )
}

PeopleSearcher.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withApollo(withStyles(styles)(PeopleSearcher))
