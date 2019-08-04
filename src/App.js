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
// import AdminPage from 'containers/AdminPage/AdminPage'
// import LoginPage from 'containers/LoginPage/LoginPage'
import { setLogIn } from 'store/actions/actions'
import { Switch, Route, Redirect } from "react-router-dom";
import axios from 'axios'
import axiosMockups from 'assets/axiosMockups';
import './App.scss';

axiosMockups();

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
});

const useStyles = makeStyles(theme => ({
  Paper: {
    minHeight: '100vh'
  }
}));


const App = withRouter(({ history, setLoginTrue, isLoggedIn }) => {
  const classes = useStyles();

  return (

    <ThemeProvider theme={theme}>
      <div className="App">
        <Paper className={classes.Paper}>
          <Header />
          <Toolbar /> {/*Do nothing - just adds some space*/}
          <Switch>
            <Route exact path="/"
              component={MainPage} />
            {/* <PrivateRoute exact path="/admin"
              component={AdminPage} />
            <Route exact path="/login"
              component={LoginPage} /> */}
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
