import axiosInstance from '../api/axiosInstance';

export const getSetting = async () => {
    const response = await axiosInstance.get('/setting');
    return response.data; 
};

export const updateSetting = async (formData: FormData) => {
    const response = await axiosInstance.post('/admin/update/site-setting', formData);
    return response.data;
};