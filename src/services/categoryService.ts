import axiosInstance from '../api/axiosInstance';

export const adminGetCategories = async () => {
  const response = await axiosInstance.get('/admin/category/get');
  return response.data;
};

export const adminAddCategory = async (data: any) => {
  const response = await axiosInstance.post('/admin/category/add', data);
  return response.data;
};

export const adminUpdateCategory = async (id: number | string, data: any) => {
  const response = await axiosInstance.post(`/admin/category/update/${id}`, data);
  return response.data;
};

export const adminDeleteCategory = async (id: number | string) => {
  const response = await axiosInstance.delete(`/admin/category/delete/${id}`);
  return response.data;
};