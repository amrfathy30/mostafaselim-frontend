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
export const getAdminBooks = async (page = 1, perPage = 12, keyword = '') => {
  const response = await axiosInstance.get('/admin/books', {
    params: { page, per_page: perPage, keyword }
  });
  return response.data;
};
export const adminGetBook = async (id: number | string) => {
    const response = await axiosInstance.get(`/admin/book/${id}`);
    return response.data;
};

export const adminAddBook = async (data: FormData) => {
  const response = await axiosInstance.post('/admin/book/store', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};


export const adminUpdateBook = async (id: number | string, data: FormData) => {
  data.append('_method', 'PUT');

  const response = await axiosInstance.post(`/admin/book/update/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};


export const adminDeleteBook = async (id: number | string) => {
    const response = await axiosInstance.delete(`/admin/book/delete/${id}`);
    return response.data;
};