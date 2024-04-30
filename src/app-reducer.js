import {createAction, handleActions} from 'redux-actions';
import { ActionTypes } from '@kepler.gl/actions';

// CONSTANTS
export const INIT = 'INIT';
export const SHOW_SIDEBAR = 'SHOW_SIDEBAR';

// ACTIONS
export const appInit = createAction(INIT);
export const showSidebar = createAction(SHOW_SIDEBAR);
export const updateMap = createAction(ActionTypes.UPDATE_MAP);

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
    }) 
  },
  initialState
);

export default appReducer;
