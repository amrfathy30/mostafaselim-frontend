import axiosInstance from '../api/axiosInstance';

export const getHomeData = async () => {
  const response = await axiosInstance.get('/home-info');
  return response.data;
};
export const getSettingsData = async () => {
  const response = await axiosInstance.get('/setting');
  return response.data;
};

export const subscribe = async (data: any) => {
  const response = await axiosInstance.post('/subscribe', data);
  return response.data;
};