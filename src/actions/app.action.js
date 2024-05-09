import {
  INIT,
  SHOW_SIDEBAR,
  SET_MAP_CONFIG,
  QUERY_SUCCESS,
  CLICK_BUTTON
} from '../constants'

const appInit = (payload) => ({
  type: INIT,
  payload,
})

export const showSidebar = (payload) => ({
  type: SHOW_SIDEBAR,
  payload
})
export const setMapConfig = () => ({
  type: SET_MAP_CONFIG,
})

export const querySuccess = () => ({
  type: QUERY_SUCCESS,
})

export const clickToTogglePerspective = () => ({
  type: CLICK_BUTTON,
})

export const getApp = () => {
  return (dispatch) => {
    dispatch(appInit())
  }
}
