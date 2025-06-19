import axios from 'axios';
import queryString from 'query-string';
import {appInfo} from '../constants/appInfos';

const axiosAccess = axios.create({
  baseURL: appInfo.BASE_URL,
  paramsSerializer: params => queryString.stringify(params),
});

axiosAccess.interceptors.request.use(async (config: any) => {
  config.headers = {
    Accept: 'application/json',
    ...config.headers,
  };

  config.data;

  return config;
});

axiosAccess.interceptors.response.use(
  res => {
    if (res.data && res.status === 200) {
      return res.data;
    }
    throw res;
  },
  error => {
    console.log(`Error api ${JSON.stringify(error?.response?.data)}`);
    throw error.response?.data || {message: 'Unknown error', status: 500};
  },
);

export default axiosAccess;
