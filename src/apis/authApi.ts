import axiosClient from './axiosClient';

class AuthAPI {
  HandleAuthentication = async (
    url: string,
    data?: any,
    methob?: 'get' | 'post' | 'put' | 'delete',
  ) => {
    return await axiosClient(`/auth${url}`, {
      method: methob ?? 'get',
      data,
    });
  };
}

const authenticationAPI = new AuthAPI();
export default authenticationAPI;
