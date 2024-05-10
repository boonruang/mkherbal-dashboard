import { createStore, combineReducers,applyMiddleware, compose } from "redux";
import { enhanceReduxMiddleware } from "@kepler.gl/reducers";
import { customizedKeplerGlReducer } from "customizedKeplerGlReducer";

import appReducer from "./reducers";
import logger from 'redux-logger'
import {thunk} from 'redux-thunk'

const reducers = combineReducers({
  keplerGl: customizedKeplerGlReducer,
  app: appReducer
});

// const middlewares = enhanceReduxMiddleware([]);

// export const middlewares = enhanceReduxMiddleware([thunk, routerMiddleware(browserHistory)]);

const middlewares = enhanceReduxMiddleware([thunk]);

const enhancers = [applyMiddleware(...middlewares,logger)];

const initialState = {};

let composeEnhancers = compose;


if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    actionsDenylist: [
      '@@kepler.gl/MOUSE_MOVE',
      '@@kepler.gl/UPDATE_MAP',
      '@@kepler.gl/LAYER_HOVER'
    ]
  });
}

export default createStore(reducers, initialState, composeEnhancers(...enhancers));