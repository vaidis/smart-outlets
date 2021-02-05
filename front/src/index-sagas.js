import { all } from 'redux-saga/effects';

import { 
  userLoginWatcher,
  userLogoutWatcher,
  userSetDarkWatcher } from './user/user-sagas'

import { getDashboardWatcher } from './dashboard/dashboard-sagas'

import {
  getControlWatcher,
  setControTitlelWatcher,
  setControPowerlWatcher } from './control/control-sagas'

export default function* IndexSaga() {
  yield all([
    userLoginWatcher(),
    userLogoutWatcher(),
    userSetDarkWatcher(),
    getDashboardWatcher(),
    getControlWatcher(),
    setControTitlelWatcher(),
    setControPowerlWatcher(),
  ]);
}