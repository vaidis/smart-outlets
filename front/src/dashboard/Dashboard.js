import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from './dashboard-actions'
import { setAppTitle } from '../app-actions'

import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { IoPower } from 'react-icons/io5';
import { makeStyles } from '@material-ui/core/styles';
import { VscSettings } from 'react-icons/vsc';
import { grey, cyan, red, green } from "@material-ui/core/colors";
import { Link as RouterLink } from 'react-router-dom';

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
  title: {
    fontSize: 14,
    color: grey[500],
    margin: 0,
  },
  settings: {
    height: 25,
  },
  triangleBottomright: {
    borderBottom: "70px solid rgba(250, 250, 250, 250)",
    borderLeft: "70px solid transparent"
  },
  icon: {
    color: grey[500],
    paddingRight: 10,
    lineHeight: 1.7,
  },
  label: {
    color: grey[500],
    paddingRight: 10,
  },
  contentLine: {
    padding: 5,
  }
}));

const Dashboard = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const dashboard = useSelector((state) => state.dashboard);
  const api = useSelector((state) => state.api);

  React.useEffect(() => {
    dispatch(setAppTitle("Dashboard"))
    let intervalId = setInterval(() => dispatch(getDashboard()), 2000);
    return () => clearInterval(intervalId)
  }, [dispatch]);

  return (
    <div>
      { dashboard
        ? (
          Object.keys(dashboard).map((key, val) => {

            const name = dashboard[key].name
            const power = dashboard[key].power
            const timer = dashboard[key].timer

            return (
              <Paper key={key} className={classes.paper}>

                <Grid
                  wrap="nowrap"
                  container
                  direction="row"
                  justifyContent="space-between"
                >

                  <Grid item >
                    <Typography className={classes.title} gutterBottom variant="h4">
                      {name}
                    </Typography>
                  </Grid>

                  <Grid item className={classes.settings}>
                    <Link
                      to={"/getcontrol/" + val}
                      component={RouterLink}
                      onClick={() => {
                        console.info("I'm a button.");
                      }}
                    >
                      <VscSettings size={30} color={cyan[600]} />
                    </Link>
                  </Grid>
                </Grid>


                <Grid container direction="row" className={classes.contentLine}>
                  <Grid item className={classes.icon}>
                    <IoPower />
                  </Grid>

                  <Grid item className={classes.label}>
                    <div>Power:</div>
                  </Grid>
                  {
                    power === true
                      ? <Typography styles={{color: green}}>ON</Typography>
                      : <Typography styles={{color: red}}>OFF</Typography>
                  }
                </Grid>

              </Paper>
            )
          })
        ) : (<div>Loading...</div>)
      }
    </div >
  )
}

export default Dashboard;