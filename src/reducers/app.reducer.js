import {createAction, handleActions} from 'redux-actions';
import { ActionTypes } from '@kepler.gl/actions';
import KeplerGlSchema from '@kepler.gl/schemas';
import { visStateUpdaters, mapStateUpdaters } from '@kepler.gl/reducers';

import {
  SHOW_SIDEBAR,
  SET_MAP_CONFIG,
  QUERY_SUCCESS,
  CLICK_BUTTON,
  INIT
} from '../constants'

const initialState = {
  appName: 'herbhuk_thunk',
  loaded: false,
  sidebar: false
};

const appReducer= (state = initialState, { type, payload }) => {
  switch (type) {
    case INIT:
      return {
        ...state,
        loaded: true
        }    
    case SHOW_SIDEBAR:
      return {
        ...state,
        sidebar: payload
        }
    case SET_MAP_CONFIG:
      return {
        ...state,
        mapConfig: KeplerGlSchema.getConfigToSave(payload)
        }
    case QUERY_SUCCESS:
      return {
        ...state,
        test: payload,
        }
    case CLICK_BUTTON:
      return {
        ...state,
        keplerGl: {
          ...state.keplerGl,
          salt: {
             ...state.keplerGl.salt,
             mapState: mapStateUpdaters.togglePerspectiveUpdater(
             state.keplerGl.salt.mapState
             )
          }
        }
      }
    default:
      return state
  }
}

export default appReducer
