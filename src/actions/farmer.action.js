import {
  HTTP_FARMER_FAILED,
  HTTP_FARMER_FETCHING,
  HTTP_FARMER_SUCCESS,
  HTTP_FARMER_SELECTED_SUCCESS,
  HTTP_FARMER_SELECTED_FAILED,
  HTTP_FARMER_SELECTED_FETCHING,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateFarmerToSuccess = (payload) => ({
  type: HTTP_FARMER_SUCCESS,
  payload
});

const setStateFarmerToFetching = () => ({
  type: HTTP_FARMER_FETCHING
});

const setStateFarmerToFailed = () => ({
  type: HTTP_FARMER_FAILED
});


export const setStateFarmerSelectedToFetching = () => ({
  type: HTTP_FARMER_SELECTED_FETCHING
});

export const setStateFarmerSelectedToSuccess = (payload) => ({
  type: HTTP_FARMER_SELECTED_SUCCESS,
  payload
});

const setStateFarmerSelectedToFailed = () => ({
  type: HTTP_FARMER_SELECTED_FAILED
});

export const getFarmerById = (id) => {
  return (dispatch) => {
    dispatch(setStateFarmerSelectedToFetching());
    httpClient
      .get(`${server.FARMER_URL}/select/${id}`)
      .then((result) => {
        dispatch(setStateFarmerSelectedToSuccess(result.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setStateFarmerSelectedToFailed());
      });
  };
};


export const getFarmerByKeyword = (searchTerm) => {
  console.log('getFarmerByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.log('getFarmerByKeyword dispatch is called ',keyword)
    dispatch(setStateFarmerToFetching());
    if (keyword !== null && keyword !== '') {
      console.log('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.FARMER_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStateFarmerToSuccess(result.data));
          console.log('setStateFarmerToSuccess is called ',result.data)
        });
        } 
        else {
          doGetFarmers(dispatch);
        }
  };
};

export const deleteFarmer = (id) => {
  return async (dispatch) => {
    dispatch(setStateFarmerToFetching());
    await httpClient.delete(`${server.FARMER_URL}/${id}`);
    await doGetFarmers(dispatch);
  };
};

export const getFarmers = () => {
  return (dispatch) => {
    dispatch(setStateFarmerToFetching());
    doGetFarmers(dispatch);
  };
};

const doGetFarmers = (dispatch) => {
  httpClient
    .get(`${server.FARMER_URL}/list`)
    .then((result) => {
      dispatch(setStateFarmerToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateFarmerToFailed());
    });
};

export const addFarmer = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.post(server.FARMER_URL, formData)
      console.log('addFarmer formData successfully: ', result)
      navigate('/farmers')
    } catch (error) {
      // failed
      console.log('addFarmer formData Error: ', error.toString())
    }
  }
}
