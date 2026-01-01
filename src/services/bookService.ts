import axiosInstance from '../api/axiosInstance';

export const getBooks = async (page = 1, perPage = 9, keyword = '') => {
  const response = await axiosInstance.get('/books', {
    params: { page, per_page: perPage, keyword }
  });
  return response.data;
};

export const getBookById = async (id: number | string) => {
  const response = await axiosInstance.get(`/books/${id}`);
  return response.data;
};

export const adminAddBook = async (data: any) => {
  const response = await axiosInstance.post('/admin/book/add', data);
  return response.data;
};

export const adminUpdateBook = async (id: number | string, data: any) => {
  const response = await axiosInstance.post(`/admin/book/update/${id}`, data);
  return response.data;
};

export const adminDeleteBook = async (id: number | string) => {
  const response = await axiosInstance.delete(`/admin/book/delete/${id}`);
  return response.data;
};