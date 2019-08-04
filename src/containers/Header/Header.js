import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, AppBar, Typography, IconButton, Container, Slide, useScrollTrigger } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import MobileMenu from 'components/Header/MobileMenu/MobileMenu'
import DesktopMenu from 'components/Header/DesktopMenu/DesktopMenu'
import UserSubmenu from 'components/Header/UserSubmenu/UserSubmenu'
import { setLogIn } from 'store/actions/actions'
import { Link } from "react-router-dom";
import cookie from 'react-cookies'

import logoImg from 'assets/logo_placeholder.svg';

const useStyles = makeStyles(theme => ({
  header: {
    paddingRight: '0 !important'
  },
  grow: {
    flexGrow: 1
  },
  logo: {
    float: 'left',
    height: 50,
    verticalAlign: 'middle',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: "center",
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined, threshold: 40 });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const mobileMenuId = 'primary-search-account-menu-mobile';
const submenuId = 'primary-search-account-menu';

const Header = ({ setLoginFalse, isLoggedIn, ...props }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isSubmenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  }

  function handleSubmenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  const handleLogout = () => {
    console.log("logout")
    cookie.remove("user-lvl");
    cookie.remove("x-access-token");
    setLoginFalse();
  }
  
  const username = 'Wersja demo'

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar
          color="primary"
          className={classes.header}
        >
          <Container maxWidth="lg">
            <Toolbar>
              <Typography edge="start" className={classes.grow}>
                <Link to="/">
                  <img src={logoImg} alt='' className={classes.logo} />
                </Link>
              </Typography>

              {isLoggedIn ? <><div className={classes.sectionDesktop}>
                <DesktopMenu username={username}
                  handleProfileMenuOpen={handleProfileMenuOpen}
                  onLogout={handleLogout}
                />
              </div>
                <div className={classes.sectionMobile}>
                  <IconButton
                    aria-label="Show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                </div></> : null}

            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <MobileMenu
        username={username}
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        mobileMenuId={mobileMenuId}
        isMobileMenuOpen={isMobileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
        handleProfileMenuOpen={handleProfileMenuOpen}
        onLogout={handleLogout}
      />
      <UserSubmenu
        anchorEl={anchorEl} submenuId={submenuId} isSubmenuOpen={isSubmenuOpen} handleSubmenuClose={handleSubmenuClose}
      />
    </>
  )
};

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
  setLoginFalse: (lvl) => dispatch(setLogIn(false, null))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
