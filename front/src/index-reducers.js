import { combineReducers } from 'redux'

import api from './api/api-reducers'
import app from './app-reducers'
import user from './user/user-reducers'
import control from './control/control-reducers'
import dashboard from './dashboard/dashboard-reducers'

const IndexReducers = combineReducers({
  api,
  app,
  user,
  control,
  dashboard,
})

export default IndexReducers;
