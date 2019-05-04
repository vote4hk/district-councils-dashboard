import React from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import { withStyles } from '@material-ui/core/styles';
import * as AddressParser from 'hk-address-parser-lib';

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

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
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

const styles = theme => ({
  root: {
    display: 'block',
    // height: 250,
    flexGrow: 1,
    position: 'absolute',
    width: '100%',
    backgroundColor: '#fff',
    padding: '10px'
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

class IntegrationAutosuggest extends React.Component {
  state = {
    value: '',
    suggestions: [],
  };

  getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : this.state.suggestions.filter(suggestion => {
          const keep =
            count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

          if (keep) {
            count += 1;
          }

          return keep;
        });
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    // console.log('fetched');
    // this.setState({
    //   suggestions: this.getSuggestions(value),
    // });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleAddressSelected(address) {
    const coordinate = address.coordinate();
    this.props.onAutoSuggestClicked(coordinate)
  }

  async onAddressFieldChanged(event, { newValue }) {
    const isMouseClick = event.nativeEvent instanceof MouseEvent;
    if (isMouseClick) {
      this.setState({
        value: newValue
      })

      let foundAddress = null;
      try {
        foundAddress = this.state.addresses.filter( address => address.fullAddress(AddressParser.Address.LANG_ZH) === newValue)[0];
      } catch (error) {
      }

      if (foundAddress) {
        this.handleAddressSelected(foundAddress);
      }
    } else {
      this.setState({
        value: newValue
      })
      const records = await AddressParser.parse(newValue);

      this.setState({
        suggestions: records.filter((_, index) => index < 10).map(record => ({ label: record.fullAddress(AddressParser.Address.LANG_ZH) })),
        addresses: records,
      })
    }

  }
  render() {
    const { classes } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
    };

    return (

      <div className={classes.root}>
        <div className={classes.autoSuggestDiv}>
          <Autosuggest
            {...autosuggestProps}
            inputProps={{
              classes,
              label: 'Label',
              placeholder: 'With Popper',
              value: this.state.value,
              onChange: this.onAddressFieldChanged.bind(this),
              inputRef: node => {
                this.popperNode = node;
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
      </div>
    );
  }
}

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntegrationAutosuggest);