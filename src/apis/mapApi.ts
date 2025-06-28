import axiosAccess from './axiosAccess';

class MapAPI {
  private HERE_API_KEY = process.env.NEXT_PUBLIC_HERE_API_KEY;

  HandleMaps = async (
    url: string,
    params?: any,
    data?: any,
    methob?: 'get' | 'post' | 'put' | 'delete',
  ) => {
    return await axiosAccess(url, {
      method: methob ?? 'get',
      params: {
        ...params,
        lang: 'vi-VI',
        apiKey: this.HERE_API_KEY,
      },
      data,
    });
  };
}

const mapAPI = new MapAPI();
export default mapAPI;
