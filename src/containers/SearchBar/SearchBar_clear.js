import React from 'react';
import { Tooltip, InputBase, Paper, IconButton, Box, Divider } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { PersonAdd } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

//import './SearchBar.scss';
const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
}));



const SearchBar = ({ className, addCustomer, onSearch }) => {
  const classes = useStyles();

  const [value, setValue] = React.useState('');
  const onChagneHandler = ({ target }) => {
    setValue(target.value)
  }



  return (
    <Box p={2} className={className}>
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Wyszukaj klienta"
          inputProps={{ 'aria-label': 'Use search bar' }}
          onChange={onChagneHandler}

          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              onSearch(value);
              event.preventDefault();
            }
          }}
        />


        <Tooltip title="Wyszukaj">
          <IconButton onClick={() => onSearch(value)} className={classes.iconButton} aria-label="Search">
            <SearchIcon />
          </IconButton>
        </Tooltip>
        <Divider className={classes.divider} />
        <Tooltip title="Dodaj klienta">
          <IconButton onClick={() => addCustomer(value)}>
            <PersonAdd />
          </IconButton>
        </Tooltip>
      </Paper>
    </Box>
  )
}

export default SearchBar;
