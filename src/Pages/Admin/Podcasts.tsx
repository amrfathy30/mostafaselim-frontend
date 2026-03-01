import React, { useState, useEffect } from "react";
import AdminPageHeader from "../components/page-header";
import DeleteModal from "./DeleteModal";
import {
  adminGetAudios,
  adminGetAudio,
  adminAddAudio,
  adminUpdateAudio,
  adminDeleteAudio,
  adminDeleteProject,
  adminAddProject,
  adminUpdateProject,
} from "../../services/audioService";
import toast from "react-hot-toast";
import Pagination from "../../Components/Pagination";
import { EyeIcon } from "../../icons/work-icons";

interface Project {
  project_id: number;
  project_title: string;
  project_image_cover: string;
  category: string;
  audios_count: number;
}

interface PaginationData {
  total: number;
  current_page: number;
  last_page: number;
  per_page: number;
}

const Podcasts: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [audioSegments, setAudioSegments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeKeyword, setActiveKeyword] = useState("");
  const [startSearch, setStartSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [showAudioModal, setShowAudioModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);

  const [audioFormData, setAudioFormData] = useState({
    title: "",
    details: "",
    project_id: "",
    file: null as File | null,
  });

  const [projectFormData, setProjectFormData] = useState({
    title: "",
    image: null as File | null,
  });

  const [deleteModalConfig, setDeleteModalConfig] = useState({
    isOpen: false,
    id: 0,
    title: "",
    type: "" as "مقطع" | "مشروع",
  });

  const loadProjects = async (page: number, keyword: string = "") => {
    setLoading(true);
    try {
      const response = await adminGetAudios(keyword);
      const fetchedProjects = response.data || [];
      setProjects(fetchedProjects);
      setPagination(fetchedProjects.pagination || null);
      setError(null);

      setActiveKeyword(keyword);

      if (fetchedProjects.length > 0 && !selectedProject) {
        handleSelectProject(fetchedProjects[0].project_id);
      }
    } catch (error) {
      console.error(error);
      setPagination(null);
      setError("لا يوجد بودكاست");
    } finally {
      setLoading(false);
      setStartSearch(false);
    }
  };

  useEffect(() => {
    loadProjects(currentPage, searchQuery);
  }, [startSearch]);

  useEffect(() => {
    if (searchQuery === "") {
      setCurrentPage(1);
      loadProjects(1);
    }
  }, [searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleSelectProject = async (id: number) => {
    try {
      const response = await adminGetAudio(id);
      setSelectedProject(response.data);
      setAudioSegments(response.data.project_audio || []);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredAudios = audioSegments.filter(
    (segment) =>
      (segment.audio_title || "")
        .toLowerCase()
        .includes(activeKeyword.toLowerCase()) ||
      (segment.audio_details || "")
        .toLowerCase()
        .includes(activeKeyword.toLowerCase()),
  );

  const openAddProject = () => {
    setIsEditMode(false);
    setProjectFormData({ title: "", image: null });
    setShowProjectModal(true);
  };

  const openEditProject = () => {
    if (!selectedProject) return;
    setIsEditMode(true);
    setCurrentId(selectedProject.project_id);
    setProjectFormData({ title: selectedProject.project_title, image: null });
    setShowProjectModal(true);
  };

  const openAddAudio = () => {
    setIsEditMode(false);
    setCurrentId(null);
    setAudioFormData({
      title: "",
      details: "",
      project_id: selectedProject?.project_id.toString() || "",
      file: null,
    });
    setShowAudioModal(true);
  };

  const openEditAudio = (segment: any) => {
    setIsEditMode(true);
    setCurrentId(segment.audio_id || segment.id);
    setAudioFormData({
      title: segment.audio_title || segment.title,
      details: segment.audio_details || segment.details,
      project_id: selectedProject?.project_id.toString() || "",
      file: null,
    });
    setShowAudioModal(true);
  };

  const handleSubmitProject = async () => {
    const data = new FormData();
    data.append("title", projectFormData.title);
    data.append("category_id", "6");
    if (projectFormData.image)
      data.append("image_cover", projectFormData.image);

    if (!projectFormData.title) {
      toast.error("برجاء ادخال عنوان المشروع");
      return;
    }

    if (!isEditMode && !projectFormData.image) {
      toast.error("برجاء رفع صورة المشروع أولاً");
      return;
    }

    setSubmitLoading(true);
    try {
      if (isEditMode && currentId) {
        data.append("_method", "PUT");
        await adminUpdateProject(currentId, data);
      } else {
        await adminAddProject(data);
      }
      setShowProjectModal(false);
      loadProjects(currentPage, searchQuery);
    } catch (error: any) {
      console.error(error);
      const errors = error?.response?.data?.errors;

      if (errors) {
        Object.keys(errors).forEach((field) => {
          if (errors[field]?.length) {
            toast.error(errors[field][0]);
          }
        });
      } else if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("حدث خطأ أثناء حفظ المشروع");
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleSubmitAudio = async () => {
    if (!isEditMode && !audioFormData.file) {
      toast.error("برجاء رفع الملف الصوتي أولاً");
      return;
    }

    if (!isEditMode && !audioFormData.details) {
      toast.error("برجاء ادخل تفاصيل المشروع");
      return;
    }

    if (!isEditMode && !audioFormData.title) {
      toast.error("برجاء ادخال عنوان المشروع");
      return;
    }
    const data = new FormData();
    data.append("title", audioFormData.title);
    data.append("details", audioFormData.details);
    data.append("project_id", audioFormData.project_id);
    if (audioFormData.file) data.append("content", audioFormData.file);

    setSubmitLoading(true);
    try {
      if (isEditMode && currentId) {
        data.append("_method", "PUT");
        await adminUpdateAudio(currentId, data);
      } else {
        await adminAddAudio(data);
      }
      setShowAudioModal(false);
      if (selectedProject) handleSelectProject(selectedProject.project_id);
      loadProjects(currentPage, searchQuery);
    } catch (error: any) {
      const errors = error?.response?.data?.errors;

      if (errors) {
        Object.keys(errors).forEach((field) => {
          if (errors[field]?.length) {
            toast.error(errors[field][0]);
          }
        });
      } else if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("حدث خطأ أثناء حفظ المشروع");
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (deleteModalConfig.type === "مقطع") {
        await adminDeleteAudio(deleteModalConfig.id);

        if (selectedProject) {
          const updatedProjectResponse = await adminGetAudio(
            selectedProject.project_id,
          );
          const updatedProject = updatedProjectResponse?.data;

          if (updatedProject) {
            setSelectedProject(updatedProject);
            setAudioSegments(updatedProject.project_audio || []);

            setProjects((prevProjects) =>
              prevProjects.map((p) =>
                p.project_id === updatedProject.project_id
                  ? {
                    ...p,
                    audios_count: updatedProject.project_audio?.length || 0,
                  }
                  : p,
              ),
            );
          }
        }
      } else {
        await adminDeleteProject(deleteModalConfig.id);

        const response = await adminGetAudios(searchQuery);
        const fetchedProjects = response?.data || [];

        if (Array.isArray(fetchedProjects)) {
          setProjects(fetchedProjects);
          setPagination((response as any).pagination || null);

          if (fetchedProjects.length > 0) {
            handleSelectProject(fetchedProjects[0].project_id);
          } else {
            setSelectedProject(null);
            setAudioSegments([]);
          }
        }
      }

      setDeleteModalConfig({ ...deleteModalConfig, isOpen: false });
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء الحذف");
    }
  };
  return (
    <div className="font-expo min-h-screen" dir="rtl">
      <AdminPageHeader
        total={projects.length}
        title="المسموعات"
        titleSingle="مقطع"
        type="audio"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setStartSearch={setStartSearch}
        btnLoading={loading && startSearch}
        onSearchClick={() => loadProjects(1, searchQuery)}
        onAddClick={openAddAudio}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:px-4">
        <div className="lg:col-span-4 flex flex-col bg-white rounded-[15px] border border-gray-100 shadow-sm overflow-hidden h-[80vh]">
          <h2 className="text-[22px] font-bold text-[#1E4D74] p-5 text-center border-b border-gray-50">
            المشاريع
          </h2>
          <div
            className="flex-1 overflow-y-auto ltr-container"
            dir="ltr"
            style={{ scrollbarGutter: "stable" }}
          >
            <div dir="rtl" className="flex flex-col">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <div
                    key={project.project_id}
                    onClick={() => handleSelectProject(project.project_id)}
                    className={`p-5 border-b border-gray-100 transition-all cursor-pointer hover:bg-gray-50  ${selectedProject?.project_id === project.project_id
                      ? "bg-[#E5E7EB]"
                      : "bg-white"
                      }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex gap-3">
                        <div className="w-14 h-14 rounded-lg bg-[#007BFF] flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                          <img
                            src={project.project_image_cover}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-right">
                          <h3 className="font-bold text-[#1E4D74]">
                            {project.project_title}
                          </h3>
                        </div>
                      </div>
                      <div className="text-center text-[#1E4D74] text-[14px] font-medium leading-tight pr-5">
                        {project.audios_count} <br /> مقطع
                      </div>
                    </div>
                    <div className="text-[#1E4D74] text-[16px] font-medium space-y-1 text-center md:text-right md:pr-16">
                      <p> التصنيف : {project?.category}</p>
                      <p>تاريخ النشر : 12/2/2025</p>
                      <p>المتحدث : د/ مصطفي سليم</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-gray-400">
                  لا توجد مشاريع تطابق البحث
                </div>
              )}
            </div>
          </div>
          <div className="p-4 bg-white border-t border-gray-50">
            <button
              onClick={openAddProject}
              className="w-full bg-[#007BFF] cursor-pointer text-white py-3 rounded font-bold hover:bg-primary transition-all shadow-sm"
            >
              إضافة مشروع
            </button>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          {selectedProject && (
            <div className="bg-white rounded-[15px] p-6 border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
              <h3 className="text-base font-bold text-[#1E4D74]">
                {selectedProject.project_title}
              </h3>
              <div className="flex flex-col md:flex-row gap-3">
                <button
                  onClick={openEditProject}
                  className="bg-[#007BFF] cursor-pointer text-white px-6 py-2 rounded-[5px] text-[15px] font-bold hover:bg-primary"
                >
                  تعديل المشروع
                </button>
                <button
                  onClick={() =>
                    setDeleteModalConfig({
                      isOpen: true,
                      id: selectedProject.project_id,
                      title: selectedProject.project_title,
                      type: "مشروع",
                    })
                  }
                  className="bg-red-700 cursor-pointer text-white px-6 py-2 rounded-[5px] text-[15px] font-bold hover:bg-red-500"
                >
                  حذف المشروع
                </button>
              </div>
            </div>
          )}

          <div className="bg-white rounded-[15px] border border-gray-100 shadow-sm overflow-hidden">
            {filteredAudios.length > 0 ? (
              filteredAudios.map((segment, index) => (
                <div
                  key={segment.audio_id}
                  className={`p-6 px-8 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-8 transition-all ${index % 2 === 0 ? "bg-[#FFFFFF]" : "bg-[#F9F9F9]"
                    } ${index !== filteredAudios.length - 1 ? "border-b border-gray-100" : ""}`}
                >
                  <div className="flex-1 text-right">
                    <h4 className="text-base font-bold text-[#1E4D74] mb-1">
                      {segment.audio_title}
                    </h4>
                    <p className="text-[#6B7280] text-base leading-relaxed line-clamp-2 font-medium">
                      {segment.audio_details}
                    </p>
                    <div className="flex items-center gap-[6px] mb-3">
                      <EyeIcon className="w-[18px] h-[18px] text-[#4D4D4D]" />
                      <span className="text-[#4D4D4D] text-[14px] leading-none">
                        {segment.audio_views > 999
                          ? (segment.audio_views / 1000).toFixed(1) + "k"
                          : segment.audio_views || "0"}
                      </span>
                    </div>
                    <p className="text-[#4B5563] text-[14px]">التصنيف : {segment?.audio_classification}</p>
                  </div>
                  <div className="flex flex-col gap-3 min-w-[140px] items-center">
                    <span className="text-[#9CA3AF] text-[16px] font-bold tabular-nums">
                      {segment?.duration}
                    </span>
                    <div className="flex flex-col gap-2 w-full">
                      <button
                        onClick={() => openEditAudio(segment)}
                        className="bg-[#007BFF] cursor-pointer text-white py-2 rounded-[5px] text-[15px] font-bold hover:bg-primary"
                      >
                        تعديل المقطع
                      </button>
                      <button
                        onClick={() =>
                          setDeleteModalConfig({
                            isOpen: true,
                            id: segment.audio_id,
                            title: segment.audio_title,
                            type: "مقطع",
                          })
                        }
                        className="bg-red-700 cursor-pointer text-white py-2 rounded-[5px] text-[15px] font-bold hover:bg-red-500"
                      >
                        حذف المقطع
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-gray-50">
                <p className="text-gray-400">لا توجد مقاطع حالياً</p>
                <button
                  onClick={openAddAudio}
                  className="mt-4 text-blue-600 cursor-pointer font-bold underline"
                >
                  إضافة مقطع جديد
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showProjectModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-[150] p-4">
          <div className="bg-white rounded-[25px] p-10 w-full max-w-lg shadow-2xl relative">
            <h2 className="text-2xl font-bold text-[#1E4D74] text-center mb-4">
              {isEditMode ? "تعديل مشروع" : "إضافة مشروع"}
            </h2>
            <div className="space-y-6">
              <input
                type="text"
                placeholder="عنوان المشروع"
                value={projectFormData.title}
                onChange={(e) =>
                  setProjectFormData({
                    ...projectFormData,
                    title: e.target.value,
                  })
                }
                className="w-full px-6 py-4 bg-[#F3F4F6] border-none rounded-[15px] text-right outline-none text-[#1E4D74] font-bold"
              />
              <div className="relative">
                <input
                  type="file"
                  onChange={(e) =>
                    setProjectFormData({
                      ...projectFormData,
                      image: e.target.files?.[0] || null,
                    })
                  }
                  className="hidden"
                  id="proj-img-up"
                  accept="image/*"
                />
                <label
                  htmlFor="proj-img-up"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#4A6D8C] hover:bg-[#2d4a62] text-white rounded-[15px] cursor-pointer hover:bg-opacity-90 font-bold"
                >
                  {projectFormData.image
                    ? projectFormData.image.name
                    : "ارفع غلاف المشروع"}
                </label>
              </div>
              <button
                onClick={handleSubmitProject}
                disabled={submitLoading}
                className="w-full bg-[#007BFF] hover:bg-primary cursor-pointer text-white py-4 rounded-[15px] font-bold shadow-lg text-base"
              >
                {submitLoading
                  ? "جاري الحفظ..."
                  : isEditMode
                    ? "حفظ التعديلات"
                    : "إنشاء المشروع"}
              </button>
            </div>
            <button
              onClick={() => setShowProjectModal(false)}
              className="absolute top-6 left-6 cursor-pointer hover:text-red-500 text-gray-400 text-2xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {showAudioModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-[150] p-4">
          <div className="bg-white rounded-[25px] p-10 w-full max-w-lg shadow-2xl relative">
            <h2 className="text-2xl font-bold text-[#1E4D74] text-center mb-4">
              {isEditMode ? "تعديل مقطع" : "إضافة مقطع"}
            </h2>
            <div className="space-y-6">
              <input
                type="text"
                placeholder="عنوان المقطع"
                value={audioFormData.title}
                onChange={(e) =>
                  setAudioFormData({ ...audioFormData, title: e.target.value })
                }
                className="w-full px-6 py-4 bg-[#F3F4F6] border-none rounded-[15px] text-right outline-none text-[#1E4D74] font-bold"
              />
              <textarea
                placeholder="تفاصيل المقطع"
                value={audioFormData.details}
                onChange={(e) =>
                  setAudioFormData({
                    ...audioFormData,
                    details: e.target.value,
                  })
                }
                rows={4}
                className="w-full px-6 py-4 bg-[#F3F4F6] border-none rounded-[15px] text-right outline-none resize-none text-[#1E4D74] font-medium"
              />
              <select
                value={audioFormData.project_id}
                onChange={(e) =>
                  setAudioFormData({
                    ...audioFormData,
                    project_id: e.target.value,
                  })
                }
                className="w-full px-6 py-4 bg-[#F3F4F6] border-none rounded-[15px] text-right outline-none appearance-none font-bold text-[#1E4D74]"
              >
                <option value="">مشروع المقطع</option>
                {projects.map((p) => (
                  <option key={p.project_id} value={p.project_id}>
                    {p.project_title}
                  </option>
                ))}
              </select>
              <div className="relative">
                <input
                  type="file"
                  onChange={(e) =>
                    setAudioFormData({
                      ...audioFormData,
                      file: e.target.files?.[0] || null,
                    })
                  }
                  className="hidden"
                  id="aud-file-up"
                  accept="audio/*"
                />
                <label
                  htmlFor="aud-file-up"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-primary hover:bg-[#2d4a62] text-white rounded-[15px] cursor-pointer font-bold"
                >
                  {audioFormData.file ? audioFormData.file.name : "ارفع المقطع"}
                </label>
              </div>
              <button
                onClick={handleSubmitAudio}
                disabled={submitLoading}
                className="w-full bg-[#007BFF] hover:bg-primary cursor-pointer text-white py-4 rounded-[15px] font-bold shadow-lg text-base"
              >
                {submitLoading
                  ? "جاري الحفظ..."
                  : isEditMode
                    ? "حفظ التعديلات"
                    : "نشر المقطع"}
              </button>
            </div>
            <button
              onClick={() => setShowAudioModal(false)}
              className="absolute top-6 left-6 cursor-pointer hover:text-red-500 text-gray-400 text-2xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {!loading &&
        filteredAudios.length > 0 &&
        pagination?.last_page &&
        pagination.last_page > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={pagination.last_page}
            onPageChange={handlePageChange}
          />
        )}

      <DeleteModal
        isOpen={deleteModalConfig.isOpen}
        onClose={() =>
          setDeleteModalConfig({ ...deleteModalConfig, isOpen: false })
        }
        onConfirm={handleDelete}
        itemTitle={deleteModalConfig.title}
        itemType={deleteModalConfig.type}
      />
    </div>
  );
};

export default Podcasts;
