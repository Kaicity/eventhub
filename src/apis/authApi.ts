import {appInfo} from '../constants/appInfos';
import axiosClient from './axiosClient';

class AuthApi {
  HandleAuthentication = async (
    url: string,
    data?: any,
    methob?: 'get' | 'post' | 'put' | 'delete',
  ) => {
    return await axiosClient(`${appInfo.BASE_URL}/auth${url}`, {
      method: methob ?? 'get',
      data,
    });
  };
}

const authenticationAPI = new AuthApi();
export default authenticationAPI;
