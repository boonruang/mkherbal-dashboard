import {
  HTTP_FARMERGROUP_FAILED,
  HTTP_FARMERGROUP_FETCHING,
  HTTP_FARMERGROUP_SUCCESS,
  HTTP_FARMERGROUP_SELECTED,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateFarmergroupToSuccess = (payload) => ({
  type: HTTP_FARMERGROUP_SUCCESS,
  payload
});

const setStateFarmergroupToFetching = () => ({
  type: HTTP_FARMERGROUP_FETCHING
});

const setStateFarmergroupToFailed = () => ({
  type: HTTP_FARMERGROUP_FAILED
});

export const setStateFarmergroupToSelected = (payload) => ({
  type: HTTP_FARMERGROUP_SELECTED,
  payload
});

export const getFarmergroupById = (id) => {
  return (dispatch) => {
    dispatch(setStateFarmergroupToFetching());
    httpClient
      .get(`${server.FARMERGROUP_URL}/${id}`)
      .then((result) => {
        dispatch(setStateFarmergroupToSuccess(result.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setStateFarmergroupToFailed());
      });
  };
};

export const getFarmergroupByKeyword = (searchTerm) => {
  console.log('getFarmergroupByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.log('getFarmergroupByKeyword dispatch is called ',keyword)
    dispatch(setStateFarmergroupToFetching());
    if (keyword !== null && keyword !== '') {
      console.log('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.FARMERGROUP_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStateFarmergroupToSuccess(result.data));
          console.log('setStateFarmergroupToSuccess is called ',result.data)
        });
        } 
        else {
          doGetFarmergroups(dispatch);
        }
  };
};

export const deleteFarmergroup = (id) => {
  return async (dispatch) => {
    dispatch(setStateFarmergroupToFetching());
    await httpClient.delete(`${server.FARMERGROUP_URL}/${id}`);
    await doGetFarmergroups(dispatch);
  };
};

export const getFarmergroups = () => {
  return (dispatch) => {
    dispatch(setStateFarmergroupToFetching());
    doGetFarmergroups(dispatch);
  };
};

const doGetFarmergroups = (dispatch) => {
  httpClient
    .get(`${server.FARMERGROUP_URL}/list/all`)
    .then((result) => {
      dispatch(setStateFarmergroupToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateFarmergroupToFailed());
    });
};

