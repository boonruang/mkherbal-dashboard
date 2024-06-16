import {
  HTTP_FARMER_FAILED,
  HTTP_FARMER_FETCHING,
  HTTP_FARMER_SUCCESS,
  HTTP_FARMER_SELECTED_SUCCESS,
  HTTP_FARMER_SELECTED_FAILED,
  HTTP_FARMER_SELECTED_FETCHING,
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
  isSelectedFetching: false,
  isSelectedError: false,
  selectedResult: null,
};

const farmerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_FARMER_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_FARMER_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false };
    case HTTP_FARMER_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case HTTP_FARMER_SELECTED_SUCCESS:
      return { ...state, selectedResult: payload.result, isSelectedError: false, isSelectedFetching : false };            
    case HTTP_FARMER_SELECTED_FAILED:
      return { ...state, selectedResult: null, isSelectedError: true, isSelectedFetching : false };            
    case HTTP_FARMER_SELECTED_FETCHING:
      return { ...state, selectedResult: null, isSelectedError: false , isSelectedFetching : true };         
    default:
      return state;
  }
};

export default farmerReducer
