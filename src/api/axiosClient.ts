import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import _ from 'lodash';
import { getToken } from 'src/utils/utils';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/',
});

// Interceptors
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
    // Do something before request is sent
    const accessToken = getToken();
    config.headers['Content-Type'] = 'application/json';

    if (!_.isEmpty(accessToken)) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    // if(response.status === 401) {
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
