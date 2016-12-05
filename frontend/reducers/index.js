import { combineReducers } from 'redux'

import currentUser from "./currentUserReducer"
import user from "./userReducer"

export default combineReducers({
  currentUser,
  user
})
