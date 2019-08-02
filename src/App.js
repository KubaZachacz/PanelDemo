import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Toolbar } from '@material-ui/core';
import { orange, blue } from '@material-ui/core/colors';
// import { deepOrange } from '@material-ui/core/colors';
import { withRouter } from 'react-router-dom'
import Header from 'containers/Header/Header';
import MainPage from 'containers/MainPage/MainPage'
import AdminPage from 'containers/AdminPage/AdminPage'
import LoginPage from 'containers/LoginPage/LoginPage'
import { setLogIn } from 'store/actions/actions'
import { Switch, Route, Redirect } from "react-router-dom";
import axios from 'axios'
import cookie from 'react-cookies'
import './App.scss';


axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  alert(`Sumting went wong ${error}`)
  return Promise.reject(error);
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: orange[800]
    },
    secondary: blue,
    // type: 'dark'
  },
  // typography: {
  //   fontFamily: [
  //     '"Poiret One", cursive;',
  //   ].join(','),
  // },
});

const useStyles = makeStyles(theme => ({
  Paper: {
    minHeight: '100vh'
  }
}));

const authToken = cookie.load("x-access-token");

if (authToken) {
  axios.defaults.headers.common['x-access-token'] = authToken;
}


const App = withRouter(({ history, setLoginTrue, isLoggedIn }) => {
  const classes = useStyles();

  useEffect(() => {
    const lvlToken = cookie.load("user-lvl");
    if (lvlToken) {
      setLoginTrue(lvlToken)
      history.push('/')
    }
  }, [])

  function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isLoggedIn ? (
            <Component {...props} />
          ) : (
              <Redirect
                to="/login"
              />
            )
        }
      />
    );
  }

  return (

    <ThemeProvider theme={theme}>
      <div className="App">
        <Paper className={classes.Paper}>
          <Header />
          <Toolbar /> {/*Do nothing - just adds some space*/}
          <Switch>
            <PrivateRoute exact path="/"
              component={MainPage} />
            <PrivateRoute exact path="/admin"
              component={AdminPage} />
            <Route exact path="/login"
              component={LoginPage} />
          </Switch>
        </Paper>
      </div>
    </ThemeProvider >

  );
})
const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
  setLoginTrue: (lvl) => dispatch(setLogIn(true, lvl))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
