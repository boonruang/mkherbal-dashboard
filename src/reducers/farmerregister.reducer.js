import {
  HTTP_FARMERREGISTER_FAILED,
  HTTP_FARMERREGISTER_FETCHING,
  HTTP_FARMERREGISTER_SUCCESS,
  HTTP_FARMERREGISTER_SELECTED_SUCCESS,
  HTTP_FARMERREGISTER_SELECTED_FAILED,
  HTTP_FARMERREGISTER_SELECTED_FETCHING,
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
  isSelectedFetching: false,
  isSelectedError: false,
  selectedResult: null,
};

const farmerregisterReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_FARMERREGISTER_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_FARMERREGISTER_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false };
    case HTTP_FARMERREGISTER_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case HTTP_FARMERREGISTER_SELECTED_SUCCESS:
      return { ...state, selectedResult: payload.result, isSelectedError: false, isSelectedFetching : false };            
    case HTTP_FARMERREGISTER_SELECTED_FAILED:
      return { ...state, selectedResult: null, isSelectedError: true, isSelectedFetching : false };            
    case HTTP_FARMERREGISTER_SELECTED_FETCHING:
      return { ...state, selectedResult: null, isSelectedError: false , isSelectedFetching : true };         
    default:
      return state;
  }
};

export default farmerregisterReducer
