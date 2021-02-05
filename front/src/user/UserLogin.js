import React from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { userLoginRequest } from './user-actions'
import { setApiErrorClear } from '../api/api-actions'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const UserLogin = () => {

  const uid = useSelector((state) => state.user.uid);


  const dispatch = useDispatch();
  const error = useSelector((state) => state.api.error);

  const [user, setUser] = React.useState("admin");
  const [pass, setPass] = React.useState("1234");

  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { user: user, pass: pass }
    dispatch(setApiErrorClear());
    dispatch(userLoginRequest(payload));
  }
    ;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h3">
          Sign in
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            error={error.field === "name" ? true : false}
            helperText={error.field === "name" ? error.message : false}
            margin="normal"
            required
            fullWidth
            id="user"
            label="Username"
            name="user"
            autoComplete="user"
            autoFocus
            onChange={(e) => setUser(e.target.value)}
            value={user}
            color="secondary"
          />
          <TextField
            error={error.field === "pass" ? true : false}
            helperText={error.field === "pass" ? error.message : false}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            color="secondary"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            color="secondary"
          >
            Sign In
          </Button>
        </form>

      </div>
    </Container >
  );
}

export default UserLogin;