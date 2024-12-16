import {
  HTTP_ENTREPRENEURTHAITRADITIONALMEDICAL_FAILED,
  HTTP_ENTREPRENEURTHAITRADITIONALMEDICAL_FETCHING,
  HTTP_ENTREPRENEURTHAITRADITIONALMEDICAL_SUCCESS,
  HTTP_ENTREPRENEURTHAITRADITIONALMEDICAL_SELECTED_SUCCESS,
  HTTP_ENTREPRENEURTHAITRADITIONALMEDICAL_SELECTED_FAILED,
  HTTP_ENTREPRENEURTHAITRADITIONALMEDICAL_SELECTED_FETCHING,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateEntrepreneurthaitraditionalmedicalToSuccess = (payload) => ({
  type: HTTP_ENTREPRENEURTHAITRADITIONALMEDICAL_SUCCESS,
  payload
});

const setStateEntrepreneurthaitraditionalmedicalToFetching = () => ({
  type: HTTP_ENTREPRENEURTHAITRADITIONALMEDICAL_FETCHING
});

const setStateEntrepreneurthaitraditionalmedicalToFailed = () => ({
  type: HTTP_ENTREPRENEURTHAITRADITIONALMEDICAL_FAILED
});


export const setStateEntrepreneurthaitraditionalmedicalSelectedToFetching = () => ({
  type: HTTP_ENTREPRENEURTHAITRADITIONALMEDICAL_SELECTED_FETCHING
});

export const setStateEntrepreneurthaitraditionalmedicalSelectedToSuccess = (payload) => ({
  type: HTTP_ENTREPRENEURTHAITRADITIONALMEDICAL_SELECTED_SUCCESS,
  payload
});

const setStateEntrepreneurthaitraditionalmedicalSelectedToFailed = () => ({
  type: HTTP_ENTREPRENEURTHAITRADITIONALMEDICAL_SELECTED_FAILED
});

export const getEntrepreneurthaitraditionalmedicalById = (id) => {
  return (dispatch) => {
    dispatch(setStateEntrepreneurthaitraditionalmedicalSelectedToFetching());
    httpClient
      .get(`${server.ENTREPRENEURTHAITRADITIONALMEDICAL_URL}/select/${id}`)
      .then((result) => {
        dispatch(setStateEntrepreneurthaitraditionalmedicalSelectedToSuccess(result.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setStateEntrepreneurthaitraditionalmedicalSelectedToFailed());
      });
  };
};


export const getEntrepreneurthaitraditionalmedicalByKeyword = (searchTerm) => {
  console.log('getEntrepreneurthaitraditionalmedicalByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.log('getEntrepreneurthaitraditionalmedicalByKeyword dispatch is called ',keyword)
    dispatch(setStateEntrepreneurthaitraditionalmedicalToFetching());
    if (keyword !== null && keyword !== '') {
      console.log('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.ENTREPRENEURTHAITRADITIONALMEDICAL_URL}/province/${keyword}`)
        .then((result) => {
          dispatch(setStateEntrepreneurthaitraditionalmedicalToSuccess(result.data));
          console.log('setStateEntrepreneurthaitraditionalmedicalToSuccess is called ',result.data)
        });
        } 
        else {
          doGetEntrepreneurthaitraditionalmedicals(dispatch);
        }
  };
};

export const deleteEntrepreneurthaitraditionalmedical = (id) => {
  return async (dispatch) => {
    dispatch(setStateEntrepreneurthaitraditionalmedicalToFetching());
    await httpClient.delete(`${server.ENTREPRENEURTHAITRADITIONALMEDICAL_URL}/${id}`);
    await doGetEntrepreneurthaitraditionalmedicals(dispatch);
  };
};

export const getEntrepreneurthaitraditionalmedicals = () => {
  return (dispatch) => {
    dispatch(setStateEntrepreneurthaitraditionalmedicalToFetching());
    doGetEntrepreneurthaitraditionalmedicals(dispatch);
  };
};

const doGetEntrepreneurthaitraditionalmedicals = (dispatch) => {
  httpClient
    .get(`${server.ENTREPRENEURTHAITRADITIONALMEDICAL_URL}/list`)
    .then((result) => {
      dispatch(setStateEntrepreneurthaitraditionalmedicalToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateEntrepreneurthaitraditionalmedicalToFailed());
    });
};