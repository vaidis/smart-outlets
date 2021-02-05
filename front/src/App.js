import React from 'react';
import { useSelector } from "react-redux";

import { Route, Switch } from 'react-router-dom';
import RouteProtected from './RouteProtected';
import RouteRedirect from './RouteRedirect';
import UserLogin from './user/UserLogin'
import Dashboard from './dashboard/Dashboard'
import Control from './control/Control'
import Header from './Header'
import './App.css';

import Box from '@material-ui/core/Box';
import Alert from '@material-ui/core/Alert';
import UserLogout from './user/UserLogout';
import UserProfile from './user/UserProfile';
import CssBaseline from "@material-ui/core/CssBaseline";
import { grey, brown, cyan } from "@material-ui/core/colors";
import { MuiThemeProvider, createMuiTheme, makeStyles } from "@material-ui/core/styles";
import "@fontsource/open-sans-condensed"

const themeLight = createMuiTheme({
  typography: {
    h1: { fontFamily: 'Open Sans Condensed' },
    h2: { fontFamily: 'Open Sans Condensed' },
    h3: { fontFamily: 'Open Sans Condensed' },
    h4: { fontFamily: 'Open Sans Condensed' },
    h5: { fontFamily: 'Open Sans Condensed' },
    h6: { fontFamily: 'Open Sans Condensed' },
  },
  palette: {
    mode: 'light',
    background: { default: grey[200], },
    primary: { main: brown[400] },
    secondary: { main: cyan[400] },
  },
});

const themeDark = createMuiTheme({
  typography: {
    h1: { fontFamily: 'Open Sans Condensed' },
    h2: { fontFamily: 'Open Sans Condensed' },
    h3: { fontFamily: 'Open Sans Condensed' },
    h4: { fontFamily: 'Open Sans Condensed' },
    h5: { fontFamily: 'Open Sans Condensed' },
    h6: { fontFamily: 'Open Sans Condensed' },
  },
  palette: {
    mode: 'dark',
    primary: { main: brown[500] },
    secondary: { main: cyan[400] },
  }
});


function App() {

  const error = useSelector((state) => state.api.error);
  const dark = useSelector((state) => state.user.dark);

  return (
    <div className="App">
      <MuiThemeProvider theme={dark ? themeDark : themeLight}>
        <CssBaseline />
        <Header />
        <Box sx={{ padding: '20px' }}>

          {error.message
            ? <Alert variant="filled" severity="error">{error.message}</Alert>
            : null
          }

          <Switch>
            <Route path="/login" component={UserLogin} />
            <RouteProtected path="/logout" component={UserLogout} />
            <RouteProtected path="/getcontrol/:path" component={Control} />
            <RouteProtected path="/user" component={UserProfile} />
            <RouteProtected path="/" component={Dashboard} />
          </Switch>

        </Box>
      </MuiThemeProvider>
    </div>
  );
}

export default App;