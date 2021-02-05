import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { userLogoutRequest } from './user-actions'

const UserLogout = () => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.id);
  dispatch(userLogoutRequest());
  return (
    <div>
      LOGOUT
    </div>
  );
}

export default UserLogout;