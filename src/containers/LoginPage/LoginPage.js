import React from 'react';
import { connect } from 'react-redux'
import { Paper, TextField, Button, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { setLogIn } from 'store/actions/actions'
import axios from 'axios';
import * as URL from 'assets/urls.js'
import cookie from 'react-cookies'
import { withRouter  } from "react-router-dom";
// import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

//import './LoginPage.scss';
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    // width: '100%', // Fix IE 11 issue.
    padding: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginPage = withRouter(({ history , setLoginTrue }) => {
  const classes = useStyles();

  const [loginForm, setLoginForm] = React.useState({ Login: '', Password: '' });

  const submitHandler = (e) => {
    e.preventDefault()
    // httpGetAsync(URL.loginTest)
    axios.post(URL.login, loginForm, {
      withCredentials: true,
      headers: { 'Access-Control-Allow-Origin': 'http://localhost:8000' }
    })
      .then(res => {
        if (res) {
          if (res.data.auth) {
            cookie.save(res.data.CookieName, res.data.Cookie, { maxAge: res.data.ExpirationDate })
            //TODO: wykasować 2 \/
            cookie.save('user-lvl', res.data.UserLvl || 2, { maxAge: res.data.ExpirationDate })
            axios.defaults.headers.common['x-access-token'] = res.data.Cookie;
            setLoginTrue(res.data.UserLvl || 2)
            history.push('/')
          }
        }
      })
      .catch(function (error) {
        console.log(error)
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <form className={classes.form} noValidate method="GET" action={URL.loginTest}>
          <Typography>Zaloguj się</Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={loginForm.Login}
            onChange={(e) => setLoginForm({ ...loginForm, Login: e.target.value })}
            id="login"
            label="login"
            name="login"
            autoComplete="login"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={loginForm.Password}
            onChange={(e) => setLoginForm({ ...loginForm, Password: e.target.value })}
            name="password"
            label="hasło"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitHandler}
          // type="submit"
          >
            Zaloguj
        </Button>
        </form>
      </Paper>
    </Container>
  )
});

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  setLoginTrue: (lvl) => dispatch(setLogIn(true, lvl))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);
