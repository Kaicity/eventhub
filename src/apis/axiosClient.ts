import axios from 'axios';
import queryString from 'query-string';
import {appInfo} from '../constants/appInfos';

const axiosClient = axios.create({
  baseURL: appInfo.BASE_URL,
  paramsSerializer: params => queryString.stringify(params),
});

axios.interceptors.request.use(async (config: any) => {
  config.headers = {
    Authorization: '',
    Accept: 'application/json',
    ...config.headers,
  };

  config.data;

  return config;
});

axios.interceptors.response.use(
  res => {
    if (res.data && res.status === 200) {
      return res.data;
    }
    throw new Error('error');
  },
  error => {
    console.log(`Error api ${JSON.stringify(error)}`);
    throw new Error(error.response);
  },
);

export default axiosClient;
