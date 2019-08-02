import React from 'react';
import { TextField, MenuItem, Tooltip, InputBase, Paper, IconButton, Box, Divider } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { PersonAdd } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import deburr from 'lodash/deburr';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  inputBar: {
    marginLeft: 8,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
  container: {
    // width: '100%'
    flex: 1,
    position: 'relative',
    textAlign: 'left'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 9,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  sectionTitle: {
    display: 'inline-block',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),

  }
}));

const emptySuggestionsList = [
  {
    title: 'Imię i nazwisko',
    suggestions: []
  },
  {
    title: 'Numer telefonu',
    suggestions: []
  },
  {
    title: 'Adres e-mail',
    suggestions: []
  }
];

const INPUT_LENGTH_TO_SEARCH = 2;

const URL_CLIENTS_SEARCH = 'http://127.0.0.1:3000/_api/clients/search/';

// \/ ACTUAL COMPONENT \/ :)

const SearchBar = ({ className, addCustomer, onSearch, isNoUser }) => {

  const classes = useStyles();

  const [value, setValue] = React.useState(''); // input filed value
  const [anchorRef, setAnchorRef] = React.useState(''); //input field ref 

  const [suggestionObject, setSuggestionObject] = React.useState(null); //list filled by axios

  const [suggestionsList, setsuggestionsList] = React.useState(emptySuggestionsList); //list filled by axios
  const [stateSuggestions, setStateSuggestions] = React.useState([]); //list filled by autosuggest

  const handleSuggestionsFetchRequested = ({ value }) => {
    setStateSuggestions(getSuggestions(value));
  };

  const handleSuggestionsClearRequested = () => {
    setStateSuggestions([]);
  };

  const handleChange = (event, { newValue }) => {
    if (newValue.length === INPUT_LENGTH_TO_SEARCH) {
      // HTTP REQUEST
      axios.get(URL_CLIENTS_SEARCH + newValue)
        .then(res => {
          const newSuggiestionsList = [...emptySuggestionsList]
          newSuggiestionsList[0].suggestions = [...res.data.NameList];
          newSuggiestionsList[1].suggestions = [...res.data.PhoneList];
          newSuggiestionsList[2].suggestions = [...res.data.EmailList];

        })
    }
    setValue(newValue)
  };

  function getSuggestionValue(suggestion) {
    return suggestion.Searched;
  }

  const onSuggestionSelected = (event, { suggestion, suggestionValue }) => {
    setSuggestionObject(suggestion);
    if (suggestion.isNoResult === true) addCustomer(value)
    else onSearch(suggestion.UID)
  }

  function renderInputComponent(inputProps) {
    const { classes, ...other } = inputProps;
    return (
      <InputBase
        fullWidth
        className={classes.inputBar}
        inputRef={ref => setAnchorRef(ref)}
        {...other}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            console.log(suggestionObject)
            if (suggestionObject.UID) onSearch(value);
            event.preventDefault();
          }
        }}
      />
    );
  }

  function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.Searched, query);
    const parts = parse(suggestion.Searched, matches);
    const helperTextStyle = { fontWeight: 300, fontSize: 14, fontStyle: 'italic' }
    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {suggestion.isNoResult ? <span style={helperTextStyle} > Dodaj: </span> : null}
          {suggestion.isNoResult ? suggestion.Searched : parts.map(part => (
            <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
              {part.text}
            </span>
          ))}
          {suggestion.Description ? <span style={helperTextStyle} > {suggestion.Description}</span> : null}
        </div>
      </MenuItem>
    );
  }

  function renderSectionTitle(section) {
    return (
      <strong className={classes.sectionTitle}>{section.title}</strong>
    );
  }

  function getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    let outputSuggiestions = []

    if (inputLength > INPUT_LENGTH_TO_SEARCH) {
      outputSuggiestions = suggestionsList.map(section => {
        return {
          title: section.title,
          suggestions: section.suggestions.filter(suggestion => suggestion.Searched.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
        };
      }).filter(section => section.suggestions.length > 0);
      if (outputSuggiestions.length === 0 && !isNoUser) outputSuggiestions.push({ title: "Nie zanleziono w bazie", suggestions: [{ Searched: value, isNoResult: true }] })
    }
    return outputSuggiestions
  }

  //     const keep =
  //       count < 5 && suggestion.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1; // checks if phraze is anywhere

  //     if (keep) {
  //       count += 1;
  //     }
  //     return keep;

  function getSectionSuggestions(section) {
    return section.suggestions;
  }

  const autosuggestProps = {
    renderInputComponent,
    suggestions: stateSuggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion,
    renderSectionTitle,
    getSectionSuggestions,
    onSuggestionSelected,
    multiSection: true
  };

  const addButoon = isNoUser ? null : (
    <>
      <Divider className={classes.divider} />
      <Tooltip title="Dodaj klienta">
        <IconButton onClick={() => addCustomer(value)}>
          <PersonAdd />
        </IconButton>
      </Tooltip>
    </>
  )

  return (
    <Box p={2}>
      <Paper className={`${classes.root} ${className}`}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            id: 'autosuggest-search-bar',
            placeholder: "Wyszukaj klienta",
            value: value,
            onChange: handleChange,
            // onSearch: (() => onSearch(state.single))
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} style={{ zIndex: 99 }} square>
              {options.children}
            </Paper>
          )}
        />
        <Tooltip title="Wyszukaj">
          <IconButton onClick={() => onSearch(value)} className={classes.iconButton} aria-label="Search">
            <SearchIcon />
          </IconButton>
        </Tooltip>
        {addButoon}
      </Paper>
    </Box>
  )
}

export default SearchBar;
