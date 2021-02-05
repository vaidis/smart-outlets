import React from 'react';
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import clsx from 'clsx';
import { MdPowerSettingsNew, MdSave, } from 'react-icons/md';
import { pink, lightGreen } from "@material-ui/core/colors";
import Switch from "react-switch";

import { setAppTitle } from '../app-actions'
import { getControl, setControlTitle, setControlPower } from './control-actions'
import PulseLoader from "react-spinners/PulseLoader";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  paper: {
    maxWidth: 500,
    margin: `${theme.spacing(1)} auto`,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '100%',
    paddingBottom: 20,
  },
  power: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20,
    lineHeight: 1,
  },
  icon: {
    marginRight: 10,
  },
  switch: {
    alignSelf: 'flex-end',
    marginLeft: 'auto',
  },
  timer: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20,
    lineHeight: 1,
  },
}));


const Control = () => {


  const dispatch = useDispatch();
  const api = useSelector((state) => state.api);
  const control = useSelector((state) => state.control);
  const [save, setSave] = React.useState(false);
  const classes = useStyles();
  const { path } = useParams();

  React.useEffect(() => {
    dispatch(setAppTitle("Control"))
    dispatch(getControl(path))
  }, [dispatch, path])


  return (
    <div>
      <Paper className={classes.paper}>
        {
          !api.loading && api.loaded
            ? (
              <form className={classes.root} noValidate autoComplete="off">
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                  <TextField
                    id='Name'
                    label='name'
                    variant="outlined"
                    defaultValue={control.name}  
                    onChange={ () => setSave(true)}
                    InputProps={{
                      readOnly: false,
                      endAdornment: (
                        <InputAdornment position='end'>
                          { save
                            ? <div>
                              <IconButton onClick={(e) => {
                                console.log(document.getElementById("Name").value);
                                dispatch(setControlTitle(document.getElementById("Name").value))
                                setSave(false)
                              }}>
                                <MdSave />
                              </IconButton>

                            </div>
                            : null
                          }
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>

                <Grid container direction="row" className={classes.power}>
                  <Grid item className={classes.label}>
                    <MdPowerSettingsNew className={classes.icon} />
                  </Grid>
                  <Grid item className={classes.label}>
                    <div>Power:</div>
                  </Grid>
                  <Grid item className={classes.switch} >
                    <Switch
                      onChange={() => dispatch(setControlPower(!control.power))}
                      checked={control.power}
                      offColor={pink[300]}
                      onColor={lightGreen[600]}
                    />
                  </Grid>
                </Grid>

              </form>
            ) : (<div>
              <PulseLoader loading={api.loading} size={15} margin={10} />
            </div>)}
      </Paper>
    </div>
  );
}

export default Control;