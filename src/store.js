import { combineReducers } from "redux";
import keplerGlReducer, { enhanceReduxMiddleware, uiStateUpdaters  } from "@kepler.gl/reducers";

// import { taskMiddleware } from "react-palm/tasks";
import appReducer from "./app-reducer";
import { Tuple, configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger'

const customizedKeplerGlReducer = keplerGlReducer
  .initialState({
      uiState: {
        activeSidePanel: null,  
        currentModal: null,      
        readOnly: true,    
        mapControls: {
          ...uiStateUpdaters.DEFAULT_MAP_CONTROLS,
          mapLegend: {
            show: true,
            active: true
          },        
      }
    }
  })
  .plugin({
    HIDE_AND_SHOW_SIDE_PANEL: (state, action) => ({
      ...state,
      uiState: {
        ...state.uiState,
        readOnly: !state.uiState.readOnly
      }
    })
  });

const reducers = combineReducers({
  keplerKlc: keplerGlReducer,
  keplerGl: customizedKeplerGlReducer,
  app: appReducer
});

const middlewares = enhanceReduxMiddleware([]);

const initialState = {};

export default configureStore({
  reducer: reducers,
  preloadedState : initialState,
  middleware: () => new Tuple(logger, ...middlewares)
})
