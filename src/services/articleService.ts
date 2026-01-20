import axiosInstance from '../api/axiosInstance';

export const getArticles = async (page = 1, perPage = 9, keyword = '') => {
  const response = await axiosInstance.get('/articles', {
    params: { page, per_page: perPage, keyword }
  });
  return response.data;
};

export const getArticleById = async (id: number | string) => {
  const response = await axiosInstance.get(`/articles/${id}`);
  return response.data;
};

export const getAdminArticles = async (page = 1, perPage = 12, keyword = '') => {
  const response = await axiosInstance.get('/admin/articles', {
    params: { page, per_page: perPage, keyword }
  });
  return response.data;
};

export const adminGetArticle = async (id: number | string) => {
  const response = await axiosInstance.get(`/admin/article/${id}`);
  return response.data;
};

export const adminAddArticle = async (data: FormData) => {
  const response = await axiosInstance.post('/admin/article/store', data);
  return response.data;
};

export const adminUpdateArticle = async (id: number | string, data: FormData) => {
  const response = await axiosInstance.post(`/admin/article/update/${id}`, data);
  return response.data;
};

export const adminDeleteArticle = async (id: number | string) => {
  const response = await axiosInstance.delete(`/admin/article/delete/${id}`);
  return response.data;
};