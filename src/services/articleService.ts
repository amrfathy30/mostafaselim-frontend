import axiosInstance from '../api/axiosInstance';

export const getArticles = async () => {
  const response = await axiosInstance.get('/articles');
  return response.data;
};

