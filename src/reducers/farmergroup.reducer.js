import {
  HTTP_FARMERGROUP_FAILED,
  HTTP_FARMERGROUP_FETCHING,
  HTTP_FARMERGROUP_SUCCESS,
  HTTP_FARMERGROUP_SELECTED,
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
  selectedResult: null,
};

const farmReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_FARMERGROUP_FETCHING:
      return { ...state, result: null, selectedResult: null, isFetching: true, isError: false };
    case HTTP_FARMERGROUP_SUCCESS:
      return { ...state, result: payload.result, selectedResult: null, isFetching: false, isError: false };
    case HTTP_FARMERGROUP_FAILED:
      return { ...state, result: null, selectedResult: null, isFetching: false, isError: true };
    case HTTP_FARMERGROUP_SELECTED:
      return { ...state, selectedResult: payload, isFetching: false, isError: false };      
    default:
      return state;
  }
};

export default farmReducer
