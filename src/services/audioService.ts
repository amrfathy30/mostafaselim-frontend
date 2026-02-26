import axiosInstance from "../api/axiosInstance";

export const getAudios = async (page = 1, perPage = 9, keyword = "") => {
  const response = await axiosInstance.get("/audios", {
    params: { page, per_page: perPage, keyword },
  });
  return response.data;
};

export const getProjects = async (
  page: number = 1,
  perPage: number = 9,
  keyword: string = "",
) => {
  const { data } = await axiosInstance.get("/projects", {
    params: {
      page,
      per_page: perPage,
      keyword,
    },
  });

  return data;
};

export const getProjectAudio = async (id: number | string) => {
  const { data } = await axiosInstance.get(`/projects/${id}`);
  return data;
};

export const getAudioDetails = async (id: number | string) => {
  return await axiosInstance.get(`/audios/${id}`);
};

export const getAudioById = async (id: number | string) => {
  const response = await axiosInstance.get(`/audios/${id}`);
  return response.data;
};

export const adminGetAudios = async (keyword: string = "") => {
  const response = await axiosInstance.get("/admin/projects", {
    params: { keyword: keyword || undefined },
  });
  return response.data;
};

export const adminGetAudio = async (id: number | string) => {
  const response = await axiosInstance.get(`/admin/project/${id}`);
  return response.data;
};

export const adminAddAudio = async (data: FormData) => {
  const response = await axiosInstance.post("/admin/audio/store", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const adminUpdateAudio = async (id: number | string, data: FormData) => {
  const response = await axiosInstance.post(`/admin/audio/update/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const adminAddProject = async (data: FormData) => {
  const response = await axiosInstance.post("/admin/project/store", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const adminUpdateProject = async (
  id: number | string,
  data: FormData,
) => {
  const response = await axiosInstance.post(
    `/admin/project/update/${id}`,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return response.data;
};

export const adminDeleteAudio = async (id: number | string) => {
  const response = await axiosInstance.delete(`/admin/audio/delete/${id}`);
  return response.data;
};

export const adminDeleteProject = async (id: number | string) => {
  const response = await axiosInstance.delete(`/admin/project/delete/${id}`);
  return response.data;
};
