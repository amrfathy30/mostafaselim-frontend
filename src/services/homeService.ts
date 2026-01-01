import axiosInstance from '../api/axiosInstance';

export const getHomeData = async () => {
  const response = await axiosInstance.get('/home-info');
  return response.data;
};