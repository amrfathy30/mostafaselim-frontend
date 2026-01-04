import axiosInstance from '../api/axiosInstance';

export const getPublicAudios = async (page = 1, perPage = 4) => {
  const response = await axiosInstance.get('/audios', {
    params: { page, per_page: perPage }
  });
  return response.data;
};

export const adminGetAudios = async () => {
    const response = await axiosInstance.get('/admin/projects');
    return response.data;
};
export const adminGetAudio = async (id: number | string) => {
    const response = await axiosInstance.get(`/admin/project/${id}`);
    return response.data;
};
export const adminAddAudio = async (data: any) => {
    const response = await axiosInstance.post('/admin/project/store', data);
    return response.data;
};
export const adminUpdateAudio = async (id: number | string, data: any) => {
    const response = await axiosInstance.post(`/admin/project/update/${id}`, data);
    return response.data;
};
export const adminDeleteAudio = async (id: number | string) => {
    const response = await axiosInstance.delete(`/admin/project/delete/${id}`);
    return response.data;
};