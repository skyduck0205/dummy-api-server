import axios from 'axios';
import _get from 'lodash/get';
import ApiResponseError from './ApiResponseError';

axios.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error.response && error.response.data)
);

export async function getConfig() {
  try {
    return await axios.get('/_ds/config');
  } catch (error) {
    throw new ApiResponseError({
      message: _get(error, 'message', ''),
    });
  }
}

export async function updateConfig(config) {
  try {
    return await axios.patch('/_ds/config', config);
  } catch (error) {
    throw new ApiResponseError({
      message: _get(error, 'message', ''),
    });
  }
}

export async function listAPIs() {
  try {
    return await axios.get('/_ds/apis');
  } catch (error) {
    throw new ApiResponseError({
      message: _get(error, 'message', ''),
    });
  }
}

export async function createAPI(data) {
  try {
    return await axios.post('/_ds/apis', data);
  } catch (error) {
    throw new ApiResponseError({
      message: _get(error, 'message', ''),
    });
  }
}

export async function updateAPI(apiID, data) {
  try {
    return await axios.patch(`/_ds/apis/${apiID}`, data);
  } catch (error) {
    throw new ApiResponseError({
      message: _get(error, 'message', ''),
    });
  }
}

export async function deleteAPI(apiID) {
  try {
    return await axios.delete(`/_ds/apis/${apiID}`);
  } catch (error) {
    throw new ApiResponseError({
      message: _get(error, 'message', ''),
    });
  }
}
