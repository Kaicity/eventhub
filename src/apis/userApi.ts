import axiosClient from './axiosClient';

class UserAPI {
  HandleUser = async (
    url: string,
    data?: any,
    methob?: 'get' | 'post' | 'put' | 'delete',
  ) => {
    return await axiosClient(`/user${url}`, {
      method: methob ?? 'get',
      data,
    });
  };
}

const userAPI = new UserAPI();
export default userAPI;
