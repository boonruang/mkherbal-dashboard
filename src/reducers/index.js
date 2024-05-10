import { combineReducers } from "redux";
import appReducer from "./app.reducer";
import loginReducer from "./login.reducer";
import marketplaceReducer from "./marketplace.reducer";

export default combineReducers({
  appReducer,
  loginReducer,
  marketplaceReducer
})