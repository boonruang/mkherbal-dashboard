import { combineReducers } from "redux";
import appReducer from "./app.reducer";
import loginReducer from "./login.reducer";


export default combineReducers({
  appReducer,
  loginReducer
})