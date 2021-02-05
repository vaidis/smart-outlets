import React from 'react';
import { useDispatch, useSelector } from "react-redux";

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import UserLogoutButton from './user/UserLogoutButton'
import { makeStyles } from '@material-ui/core/styles';
import { VscColorMode } from 'react-icons/vsc';

import Menu from './Menu'
import { userSetDark } from './user/user-actions'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {

  const title = useSelector((state) => state.app.title);
  const dark = useSelector((state) => state.user.dark);
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Menu />

          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>

          <Button
            color="inherit"
            onClick={() => dispatch(userSetDark(!dark))}
          >
            <VscColorMode size={24} color={'white'} />
          </Button>

          <UserLogoutButton />

        </Toolbar>
      </AppBar>
    </div>
  );
}