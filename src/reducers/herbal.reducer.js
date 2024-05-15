import {
  HTTP_HERBAL_FAILED,
  HTTP_HERBAL_FETCHING,
  HTTP_HERBAL_SUCCESS,
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

const herbalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_HERBAL_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_HERBAL_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false };
    case HTTP_HERBAL_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };   
    default:
      return state;
  }
};

export default herbalReducer
