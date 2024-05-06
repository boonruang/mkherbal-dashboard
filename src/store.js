import { createStore, combineReducers,applyMiddleware, compose } from "redux";
import keplerGlReducer, { enhanceReduxMiddleware, uiStateUpdaters, visStateUpdaters  } from "@kepler.gl/reducers";

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
    HIDE_AND_SHOW_MAP_LEGEND: (state, action) => ({
      ...state,
      uiState: {
        ...state.uiState,
        mapControls: {
          ...uiStateUpdaters.DEFAULT_MAP_CONTROLS,
          mapLegend: {        
              show: false
          }
        }
      }
    })
  })  
  .plugin({
    HIDE_AND_SHOW_SIDE_PANEL: (state, action) => ({
      ...state,
      uiState: {
        ...state.uiState,
        readOnly: !state.uiState.readOnly
      }
    })
  })
  .plugin({
    UPDATE_VIS_STATE: (state, action) => ({
      ...state,
      keplerGl: {
        ...state.keplerGl,
        // 'soilmk' is the id of the keplerGl instance
        land: {
          ...state.keplerGl.land,
          visState: visStateUpdaters.updateVisDataUpdater(state.keplerGl.land.visState, {
            datasets: action.payload
          })
        }
      }
    })
  .plugin({
    SET_FILTER: (state, action) => state    
  })
  });  

const reducers = combineReducers({
  // keplerKlc: keplerGlReducer,
  keplerGl: customizedKeplerGlReducer,
  app: appReducer
});

// const middlewares = enhanceReduxMiddleware([]);

// export const middlewares = enhanceReduxMiddleware([thunk, routerMiddleware(browserHistory)]);

const middlewares = enhanceReduxMiddleware([]);


// const enhancers = [applyMiddleware(...middlewares)];

const enhancers = [applyMiddleware(...middlewares,logger)];

const initialState = {};

let composeEnhancers = compose;

// export default configureStore({
//   reducer: reducers,
//   preloadedState : initialState,
//   middleware: () => new Tuple(logger, ...middlewares)
// })


if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    actionsBlacklist: [
      '@@kepler.gl/MOUSE_MOVE',
      '@@kepler.gl/UPDATE_MAP',
      '@@kepler.gl/LAYER_HOVER'
    ]
  });
}

export default createStore(reducers, initialState, composeEnhancers(...enhancers));