import axiosInstance from '../api/axiosInstance';

export const getBlogs = async (page = 1, perPage = 9, keyword = '') => {
    const response = await axiosInstance.get('/blogs', {
        params: { page, per_page: perPage, keyword }
    });
    return response.data;
};

export const getBlogDetails = async (id: number | string) => {
    const response = await axiosInstance.get(`/blogs/${id}`);
    return response.data;
};

export const getAdminBlogs = async (page = 1, perPage = 12, keyword = '') => {
    const response = await axiosInstance.get('/admin/blogs', {
        params: { page, per_page: perPage, keyword }
    });
    return response.data;
};

export const adminGetBlog = async (id: number | string) => {
    const response = await axiosInstance.get(`/admin/blog/${id}`);
    return response.data;
};

export const adminAddBlog = async (data: FormData) => {
    const response = await axiosInstance.post('/admin/blog/store', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

export const adminUpdateBlog = async (id: number | string, data: FormData) => {
    if (!data.has('_method')) {
        data.append('_method', 'PUT');
    }
    const response = await axiosInstance.post(`/admin/blog/update/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

export const adminDeleteBlog = async (id: number | string) => {
    const response = await axiosInstance.delete(`/admin/blog/delete/${id}`);
    return response.data;
};