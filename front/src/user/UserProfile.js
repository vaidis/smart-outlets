import React from 'react';
import { useSelector } from "react-redux";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom: 20,
    padding: 0,
    paddingBottom: 20,
    overflow: 'hidden',
  },
  paper: {
    maxWidth: 500,
    margin: `${theme.spacing(1)} auto`,
    padding: 20,
  },
}));


const UserProfile = () => {

  const classes = useStyles();
  const user = useSelector((state) => state.user);

  return (
    <Paper className={classes.paper}>
      <h2>User Profile</h2>

      <Grid container direction="column">

        <Grid container justifyContent="space-between" direction="row">
          <Grid item>
            <Typography>
              ID:
            </Typography>
          </Grid>

          <Grid item>
            <Typography>
              <code>{user.id}</code>
            </Typography>
          </Grid>
        </Grid>

        <Grid container justifyContent="space-between" direction="row">
          <Grid item>
            <Typography>
              Name:
          </Typography>
          </Grid>

          <Grid item>
            <Typography align="right">
              <code>{user.name}</code>
            </Typography>
          </Grid>
        </Grid>

        <Grid container justifyContent="space-between" direction="row">
          <Grid item>
            <Typography>
              Role:
          </Typography>
          </Grid>
          <Grid item>
            <Typography align="right">
              <code>{user.role}</code>
            </Typography>
          </Grid>
        </Grid>

        <Grid container justifyContent="space-between" direction="row">
          <Grid item>
            <Typography>
              Theme:
            </Typography>
          </Grid>
          <Grid item>
            <Typography align="right">
              <code>{user.dark === true ? "Dark" : "Light"}</code>
            </Typography>
          </Grid>
        </Grid>

      </Grid>
    </Paper>
  );
}

export default UserProfile;