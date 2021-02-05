import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { MdExitToApp } from 'react-icons/md';
import Button from '@material-ui/core/Button';
import { userLogoutRequest } from './user-actions'

const UserLogout = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.id);
  return (
    <div>
      { id !== 0 ? (
        <Button
          color="inherit"
          onClick={() => dispatch(userLogoutRequest())}
        >
          <MdExitToApp size={24} color={'white'}/>
        </Button>
      ):null
      }
    </div>
  );
}

export default UserLogout;