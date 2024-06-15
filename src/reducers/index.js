import { combineReducers } from "redux";
import appReducer from "./app.reducer";
import loginReducer from "./login.reducer";
import marketplaceReducer from "./marketplace.reducer";
import farmergroupReducer from "./farmergroup.reducer";
import herbalReducer from "./herbal.reducer";
import geosoilReducer from "./geosoil.reducer";
import geosaltReducer from "./geosalt.reducer";
import herbalrecommendedReducer from "./herbalrecommended.reducer";
import herbalselectedReducer from "./herbalselected.reducer";
import herbalpriceReducer from "./herbalprice.reducer";
import herbalpriceyearReducer from "./herbalpriceyear.reducer";

export default combineReducers({
  appReducer,
  loginReducer,
  marketplaceReducer,
  farmergroupReducer,
  herbalReducer,
  geosoilReducer,
  geosaltReducer,
  herbalrecommendedReducer,
  herbalselectedReducer,
  herbalpriceReducer,
  herbalpriceyearReducer,
})