import {
  HTTP_HERBAL_FAILED,
  HTTP_HERBAL_FETCHING,
  HTTP_HERBAL_SUCCESS,
  HTTP_HERBAL_SELECTED,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateHerbalToSuccess = (payload) => ({
  type: HTTP_HERBAL_SUCCESS,
  payload
});

const setStateHerbalToFetching = () => ({
  type: HTTP_HERBAL_FETCHING
});

const setStateHerbalToFailed = () => ({
  type: HTTP_HERBAL_FAILED
});

export const setStateHerbalToSelected = (payload) => ({
  type: HTTP_HERBAL_SELECTED,
  payload
});

export const getHerbalById = (id) => {
  return (dispatch) => {
    dispatch(setStateHerbalToFetching());
    httpClient
      .get(`${server.HERBAL_URL}/${id}`)
      .then((result) => {
        dispatch(setStateHerbalToSuccess(result.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setStateHerbalToFailed());
      });
  };
};

export const getHerbalByKeyword = (searchTerm) => {
  console.log('getHerbalByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.log('getHerbalByKeyword dispatch is called ',keyword)
    dispatch(setStateHerbalToFetching());
    if (keyword !== null && keyword !== '') {
      console.log('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.HERBAL_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStateHerbalToSuccess(result.data));
          console.log('setStateHerbalToSuccess is called ',result.data)
        });
        } 
        else {
          doGetHerbals(dispatch);
        }
  };
};

export const deleteHerbal = (id) => {
  return async (dispatch) => {
    dispatch(setStateHerbalToFetching());
    await httpClient.delete(`${server.HERBAL_URL}/${id}`);
    await doGetHerbals(dispatch);
  };
};

export const getHerbals = () => {
  return (dispatch) => {
    dispatch(setStateHerbalToFetching());
    doGetHerbals(dispatch);
  };
};

const doGetHerbals = (dispatch) => {
  httpClient
    .get(`${server.HERBAL_URL}/list`)
    .then((result) => {
      dispatch(setStateHerbalToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateHerbalToFailed());
    });
};

