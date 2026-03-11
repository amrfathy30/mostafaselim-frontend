import axiosInstance from '../api/axiosInstance';

export const getAdminSubscribers = async (page = 1, perPage = 12, keyword = '') => {
    const response = await axiosInstance.get('/admin/subscribes', {
        params: { page, per_page: perPage, keyword }
    });
    return response.data;
};

export const adminAddSubscriber = async (data: any) => {
    const response = await axiosInstance.post('/admin/subscribe/store', data);
    return response.data;
};

export const adminUpdateSubscriber = async (id: number | string, data: any) => {
    const response = await axiosInstance.post(`/admin/subscribe/update/${id}`, {
        ...data,
        _method: 'PUT'
    });
    return response.data;
};

export const adminDeleteSubscriber = async (id: number | string) => {
    const response = await axiosInstance.delete(`/admin/subscribe/delete/${id}`);
    return response.data;
};
