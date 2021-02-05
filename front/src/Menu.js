import React from 'react';

import clsx from 'clsx';
import Switch from '@material-ui/core/Switch';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { Link } from "react-router-dom";
import { MenuItem } from '@material-ui/core';
import { menuItems } from './menuItems'
import { makeStyles } from '@material-ui/core/styles';
import { userSetDark } from './user/user-actions'
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'flex-end',
  },
});

export default function Menu() {

  const id = useSelector((state) => state.user.id);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });


  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const dark = useSelector((state) => state.user.dark);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {
        menuItems.map((item, index) => {
          return (
            item.type === 'divider'
              ? <Divider key={index} />
              : <MenuItem
                value={value}
                button selected={window.location.pathname === item.path ? true : false}
                key={index}
              >
                <ListItem
                  disableGutters
                  button
                  to={item.path}
                  component={Link}
                >
                  <ListItemIcon><item.icon /></ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
              </MenuItem>
          )
        })
      }

    </div>
  );

  return (
    <div>

      { id !== 0 ? (
        <React.Fragment key={'left'}>

          <Button color="inherit" onClick={toggleDrawer('left', true)}>
            <MenuIcon />
          </Button>

          <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>

            <div className={classes.drawerHeader}>
              <h1>Smart Outlets</h1>
              <IconButton onClick={handleDrawerClose}>
              </IconButton>
            </div>

            <Divider />

            <ListItem>
              <ListItemIcon><Brightness4Icon /></ListItemIcon>
              <ListItemText primary={"Dark theme"} />
              <Switch
                onChange={() => dispatch(userSetDark(!dark))}
                checked={dark ? dark : true}
              />
            </ListItem>

            {list('left')}

          </Drawer>
        </React.Fragment>
      ) : null}

    </div>
  );
}