import axiosInstance from '../api/axiosInstance';

export const adminGetBlogs = async () =>{
    const response = await axiosInstance.get('/admin/blogs');
    return response.data;
};
export const adminGetBlog = async (id: number | string) =>{
    const response = await axiosInstance.get(`/admin/blog/${id}`);
    return response.data;
};
export const adminAddBlog = async (data: any) => {
    const response = await axiosInstance.post('/admin/blog/store',data);
    return response.data;
};
export const adminUpdateBlog = async (id: number | string, data: any) => {
    const response = await axiosInstance.post(`/admin/blogs/update/${id}`, data);
    return response.data;
};
export const adminDeleteBlog = async (id: number | string) => {
    const response = await axiosInstance.delete(`/admin/blogs/delete/${id}`);
    return response.data;
};