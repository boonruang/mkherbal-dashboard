import {createAction, handleActions} from 'redux-actions';
import { ActionTypes } from '@kepler.gl/actions';
import KeplerGlSchema from '@kepler.gl/schemas';
import { visStateUpdaters } from '@kepler.gl/reducers';

// CONSTANTS
export const INIT = 'INIT';
export const SHOW_SIDEBAR = 'SHOW_SIDEBAR';
export const SET_MAP_CONFIG = 'SET_MAP_CONFIG';
export const QUERY_SUCCESS = 'QUERY_SUCCESS';

// ACTIONS
export const appInit = createAction(INIT);
export const showSidebar = createAction(SHOW_SIDEBAR);
export const updateMap = createAction(ActionTypes.UPDATE_MAP);
export const setMapConfig = createAction(SET_MAP_CONFIG);
export const updateVisData = createAction(ActionTypes.UPDATE_VIS_DATA);
export const querySuccess = createAction(QUERY_SUCCESS);

// INITIAL_STATE
const initialState = {
  appName: 'MkHerbals',
  loaded: false,
  sidebar: null
};

// REDUCER
const appReducer = handleActions(
  {
    [INIT]: (state, action) => ({
      ...state,
      loaded: true
    }),

    [SHOW_SIDEBAR]: (state, action) => ({
      ...state,
      sidebar: action.payload
    }),
    // listen on kepler.gl map update action to store a copy of viewport in app state
    [ActionTypes.UPDATE_MAP] : (state, action) => ({
        ...state,
        viewport: action.payload
    }),
    [SET_MAP_CONFIG]: (state, action) => ({
      ...state,
      mapConfig: KeplerGlSchema.getConfigToSave(action.payload)
    }),     
    [ActionTypes.UPDATE_VIS_DATA]: (state, action) => ({
      ...state,
      visState: action.payload
    }),
    [QUERY_SUCCESS]: (state, action) => ({
      ...state,
      keplerGl: {
        ...state.keplerGl,
        // 'soilmk1' is the id of the keplerGl instance
        soilmk1: {
          ...state.keplerGl.soilmk1,
          visState: visStateUpdaters.updateVisDataUpdater(state.keplerGl.soilmk1.visState, {
            datasets: action.payload
          })
        }
      }
    })          
  },
  initialState
);

export default appReducer;
