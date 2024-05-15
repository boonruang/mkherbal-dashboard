import {
  HTTP_HERBAL_FAILED,
  HTTP_HERBAL_FETCHING,
  HTTP_HERBAL_SUCCESS,
  HTTP_HERBAL_SELECTED,
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
  selectedResult: null,
};

const herbalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_HERBAL_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_HERBAL_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false };
    case HTTP_HERBAL_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case HTTP_HERBAL_SELECTED:
      return { ...state, selectedResult: payload, isFetching: false, isError: false };      
    default:
      return state;
  }
};

export default herbalReducer
