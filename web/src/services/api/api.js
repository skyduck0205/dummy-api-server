import axios from 'axios';
import _get from 'lodash/get';
import ApiResponseError from './ApiResponseError';

axios.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error.response && error.response.data)
);

export async function listApis() {
  try {
    return await axios.get('/_ds/apis');
  } catch (error) {
    throw new ApiResponseError({
      message: _get(error, 'message', ''),
    });
  }
}
