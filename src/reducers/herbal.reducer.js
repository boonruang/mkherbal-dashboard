import {
  HTTP_HERBAL_FAILED,
  HTTP_HERBAL_FETCHING,
  HTTP_HERBAL_SUCCESS,
  HTTP_HERBAL_SELECTED_SUCCESS,
  HTTP_HERBAL_SELECTED_FAILED,
  HTTP_HERBAL_SELECTED_FETCHING,
  SET_PLANTING_SELECTION,
  SET_AMPHOE_SELECTION,  
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
  isSelectedFetching: false,
  isSelectedError: false,
  selectedResult: null,
  plantingSelected: 'soil',  
  amphoeSelected: '01'  
};

const herbalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_HERBAL_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_HERBAL_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false };
    case HTTP_HERBAL_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };   
    case HTTP_HERBAL_SELECTED_SUCCESS:
      return { ...state, selectedResult: payload.result, isSelectedError: false, isSelectedFetching : false };            
    case HTTP_HERBAL_SELECTED_FAILED:
      return { ...state, selectedResult: null, isSelectedError: true, isSelectedFetching : false };            
    case HTTP_HERBAL_SELECTED_FETCHING:
      return { ...state, selectedResult: null, isSelectedError: false , isSelectedFetching : true };
    case SET_PLANTING_SELECTION:
      return { ...state, plantingSelected: payload }              
    case SET_AMPHOE_SELECTION:
      return { ...state, amphoeSelected: payload }              
    default:
      return state;
  }
};

export default herbalReducer
