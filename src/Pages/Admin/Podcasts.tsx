import React, { useState, useEffect } from 'react';
import AdminPageHeader from '../components/page-header';
import DeleteModal from './DeleteModal'; 
import { 
  adminGetAudios, 
  adminGetAudio, 
  adminAddAudio, 
  adminUpdateAudio, 
  adminDeleteAudio,
  adminDeleteProject 
} from '../../services/audioService'; 

interface Project {
  project_id: number;
  project_title: string;
  project_image_cover: string;
  audios_count: number;
}

const Podcasts: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [audioSegments, setAudioSegments] = useState<any[]>([]); 
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false); 
  const [searchQuery, setSearchQuery] = useState('');
  const [startSearch, setStartSearch] = useState(false);

  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentAudioId, setCurrentAudioId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    details: '', 
    project_id: '',
    file: null as File | null
  });

  const [deleteModalConfig, setDeleteModalConfig] = useState({
    isOpen: false,
    id: 0,
    title: '',
    type: '' 
  });

  useEffect(() => { loadProjects(); }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const response = await adminGetAudios();
      setProjects(response.data);
      if (response.data.length > 0 && !selectedProject) {
        handleSelectProject(response.data[0].project_id);
      }
    } catch (error) { console.error(error); } 
    finally { setLoading(false); }
  };

  const handleSelectProject = async (id: number) => {
    try {
      const response = await adminGetAudio(id);
      setSelectedProject(response.data);
      setAudioSegments(response.data.project_audio || []); 
    } catch (error) { console.error(error); }
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setCurrentAudioId(null);
    setFormData({ 
      title: '', 
      details: '', 
      project_id: selectedProject?.project_id.toString() || '', 
      file: null 
    });
    setShowAddEditModal(true);
  };

  const openEditModal = (segment: any) => {
    setIsEditMode(true);
    setCurrentAudioId(segment.id || segment.audio_id); 
    setFormData({
      title: segment.title || segment.audio_title || '',
      details: segment.details || segment.audio_details || segment.description || '',
      project_id: selectedProject?.project_id.toString() || '',
      file: null
    });
    setShowAddEditModal(true);
  };

  const handleSubmit = async () => {
    if (!isEditMode && !formData.file) {
        return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('details', formData.details); 
    data.append('project_id', formData.project_id);
    
    if (formData.file) {
        data.append('content', formData.file); 
    }

    setSubmitLoading(true);
    try {
      if (isEditMode && currentAudioId) {
        data.append('_method', 'PUT');
        await adminUpdateAudio(currentAudioId, data);
      } else {
        await adminAddAudio(data);
      }
      setShowAddEditModal(false);
      if (selectedProject) handleSelectProject(selectedProject.project_id);
      loadProjects();
    } catch (error: any) {
      console.error("Error submitting form:", error);
    } finally {
        setSubmitLoading(false);
    }
  };

  const confirmDelete = (id: number, title: string, type: 'مقطع' | 'مشروع') => {
    setDeleteModalConfig({ isOpen: true, id, title, type });
  };

  const handleDelete = async () => {
    try {
      if (deleteModalConfig.type === 'مقطع') {
        await adminDeleteAudio(deleteModalConfig.id);
        if (selectedProject) handleSelectProject(selectedProject.project_id);
      } else if (deleteModalConfig.type === 'مشروع') {
        await adminDeleteProject(deleteModalConfig.id);
        setSelectedProject(null);
        setAudioSegments([]);
      }
      setDeleteModalConfig({ ...deleteModalConfig, isOpen: false });
      loadProjects(); 
    } catch (error) { console.error(error); }
  };

  return (
    <div className="p-2 font-expo rtl" dir="rtl">
      <AdminPageHeader 
        total={projects.length} 
        title="المسموعات" 
        titleSingle="مقطع" 
        type="audio"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setStartSearch={setStartSearch}
        btnLoading={loading}
        onClick={openAddModal} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">المشاريع</h2>
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pl-2">
            {projects.map((project) => (
              <div 
                key={project.project_id}
                onClick={() => handleSelectProject(project.project_id)}
                className={`bg-white rounded-2xl p-4 border transition-all cursor-pointer hover:shadow-md ${selectedProject?.project_id === project.project_id ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-100'}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-gray-50 text-gray-500 text-xs px-2 py-1 rounded-lg border border-gray-100">{project.audios_count} مقطع</span>
                    <span className="text-gray-400 text-xs">النوع : نقد</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-800">{project.project_title}</span>
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden">
                       <img src={project.project_image_cover} alt="" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
                <div className="text-right text-xs text-gray-400 space-y-1 pr-12">
                  <p>تاريخ النشر : 12/2/2025</p>
                  <p>المتحدث : مصطفي سليم</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full bg-[#1E4D74] text-white py-4 rounded-xl font-bold mt-4 hover:bg-opacity-90 shadow-lg transition-all">
            إضافة مشروع
          </button>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 flex items-center justify-between shadow-sm">
             <div className="flex gap-3">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-blue-700">تعديل المشروع</button>
                <button onClick={() => confirmDelete(selectedProject?.project_id || 0, selectedProject?.project_title || '', 'مشروع')} className="bg-orange-500 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-orange-600">
                  حذف المشروع
                </button>
             </div>
             <h3 className="text-xl font-bold text-gray-800">{selectedProject?.project_title || 'اختر مشروعاً'}</h3>
          </div>

          <div className="space-y-4">
            {audioSegments.length > 0 ? audioSegments.map((segment) => (
              <div key={segment.id || segment.audio_id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex flex-col items-center gap-3 min-w-[120px]">
                    <span className="text-gray-400 font-medium tabular-nums">0:00/12:30</span>
                    <button onClick={() => openEditModal(segment)} className="w-full bg-blue-600 text-white py-2 rounded-xl text-xs font-bold hover:bg-blue-700">تعديل المقطع</button>
                    <button onClick={() => confirmDelete(segment.id || segment.audio_id, segment.title || segment.audio_title, 'مقطع')} className="w-full bg-red-500 text-white py-2 rounded-xl text-xs font-bold hover:bg-red-600">حذف المقطع</button>
                  </div>
                  <div className="flex-1 text-right">
                    <h4 className="text-lg font-bold text-gray-800 mb-2">{segment.title || segment.audio_title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{segment.details || segment.audio_details || segment.description}</p>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-400">لا توجد مقاطع صوتية لهذا المشروع حالياً</p>
                <button onClick={openAddModal} className="mt-4 text-blue-600 font-bold underline">إضافة أول مقطع</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showAddEditModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[110] p-4">
          <div className="bg-white rounded-[32px] p-10 w-full max-w-xl shadow-2xl relative">
            <h2 className="text-2xl font-bold text-[#1E4D74] text-center mb-8">{isEditMode ? 'تعديل مقطع' : 'إضافة مقطع'}</h2>
            <div className="space-y-5">
              <input type="text" placeholder="عنوان المقطع" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-right outline-none focus:ring-2 focus:ring-blue-500/20" />
              <textarea placeholder="تفاصيل المقطع" value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })} rows={4} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-right outline-none focus:ring-2 focus:ring-blue-500/20 resize-none" />
              <div className="relative">
                <select value={formData.project_id} onChange={(e) => setFormData({ ...formData, project_id: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-right outline-none appearance-none focus:ring-2 focus:ring-blue-500/20">
                  <option value="">مشروع المقطع</option>
                  {projects.map((p) => <option key={p.project_id} value={p.project_id}>{p.project_title}</option>)}
                </select>
                <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
              <div className="relative group">
                <input type="file" onChange={(e) => setFormData({...formData, file: e.target.files ? e.target.files[0] : null})} className="hidden" id="audio-upload" accept="audio/*" />
                <label htmlFor="audio-upload" className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#4A6D8C] text-white rounded-2xl cursor-pointer hover:bg-opacity-90 font-bold">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  {formData.file ? formData.file.name : 'ارفع المقطع'}
                </label>
              </div>
              
              <button 
                onClick={handleSubmit} 
                disabled={submitLoading}
                className={`w-full text-white py-5 rounded-2xl font-bold text-lg mt-4 shadow-lg transition-all flex items-center justify-center gap-2 ${submitLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {submitLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    جاري التحميل...
                  </>
                ) : (
                  isEditMode ? 'حفظ التعديلات' : 'نشر المقطع'
                )}
              </button>
            </div>
            <button onClick={() => setShowAddEditModal(false)} className="absolute top-6 left-6 text-gray-300 hover:text-gray-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
      )}

      <DeleteModal isOpen={deleteModalConfig.isOpen} onClose={() => setDeleteModalConfig({ ...deleteModalConfig, isOpen: false })} onConfirm={handleDelete} itemTitle={deleteModalConfig.title} itemType={deleteModalConfig.type} />
    </div>
  );
};

export default Podcasts;
