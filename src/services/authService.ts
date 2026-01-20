import axiosInstance from '../api/axiosInstance';

export const adminLogin = async (data: any) => {
    const response = await axiosInstance.post('/auth-login', data);
    return response.data;
};
export const adminLogout = async () => {
    const response = await axiosInstance.delete('/admin/logout');
    return response.data;
};
export const getAdminProfile = async () => {
    const response = await axiosInstance.get('/admin/user');
    return response.data;
};
export const updateAdminProfile = async (data: FormData) => {
  const response = await axiosInstance.post(
    '/admin/user/update',
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

export const adminForgetPassword = async (data: any) => {
    const response = await axiosInstance.post('/forget-password', data);
    return response.data;
};
export const adminResetPassword = async (data: any) => {
    const response = await axiosInstance.post('/reset-password', data);
    return response.data;
};