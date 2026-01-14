import React, { useState } from 'react';

const Podcasts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSegment, setNewSegment] = useState({
    title: '',
    details: '',
    project: '',
  });

  const projects = [
    {
      id: 1,
      name: 'يحكي ان',
      type: 'نقد',
      segments: 12,
      date: '12/2/2025',
      speaker: 'مصطفي سليم',
    },
    {
      id: 2,
      name: 'يحكي ان',
      type: 'نقد',
      segments: 12,
      date: '12/2/2025',
      speaker: 'مصطفي سليم',
    },
    {
      id: 3,
      name: 'يحكي ان',
      type: 'نقد',
      segments: 12,
      date: '12/2/2025',
      speaker: 'مصطفي سليم',
    },
  ];

  const audioSegments = [
    {
      id: 1,
      title: 'الأسد والبهيمتي.. المسكوت عنه بين أطروحتين',
      description: 'تقدم الحلقة مراجعة نقدية لمزاعم المؤرخ الأدبي نجيب البهيمتي انتحال العلامة ناصر الدين الأسد',
      duration: '12:30',
      currentTime: '0:00',
    },
    {
      id: 2,
      title: 'الأسد والبهيمتي.. المسكوت عنه بين أطروحتين',
      description: 'تقدم الحلقة مراجعة نقدية لمزاعم المؤرخ الأدبي نجيب البهيمتي انتحال العلامة ناصر الدين الأسد',
      duration: '12:30',
      currentTime: '0:00',
    },
    {
      id: 3,
      title: 'الأسد والبهيمتي.. المسكوت عنه بين أطروحتين',
      description: 'تقدم الحلقة مراجعة نقدية لمزاعم المؤرخ الأدبي نجيب البهيمتي انتحال العلامة ناصر الدين الأسد',
      duration: '12:30',
      currentTime: '0:00',
    },
    {
      id: 4,
      title: 'الأسد والبهيمتي.. المسكوت عنه بين أطروحتين',
      description: 'تقدم الحلقة مراجعة نقدية لمزاعم المؤرخ الأدبي نجيب البهيمتي انتحال العلامة ناصر الدين الأسد',
      duration: '12:30',
      currentTime: '0:00',
    },
  ];

  const handlePublishSegment = () => {
    console.log('Publishing segment:', newSegment);
    setShowAddModal(false);
    setNewSegment({ title: '', details: '', project: '' });
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-[32px] font-bold text-primary">المسموعات</h1>
      </div>

      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-[#6B7280] text-[16px]">عدد المسموعات : 22</p>
          </div>

          {/* Search and Add */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full md:w-auto">
            {/* Search Box */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في المسموعات التي تريدها"
                className="px-4 py-3 border border-gray-300 rounded-lg text-right w-full md:w-[280px] outline-none focus:border-primary"
              />
              <button className="bg-primary text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors">
                <SearchIcon />
                <span>بحث</span>
              </button>
            </div>

            {/* Add Button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#007FFF] text-white px-6 py-3 rounded-lg hover:bg-[#007FFF]/90 transition-colors"
            >
              إضافة كتاب
            </button>
          </div>
        </div>

        {/* Main Content - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Projects List - Right Side */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-[18px] font-bold text-[#2B2B2B] text-right">المشاريع</h2>
            
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-[12px] p-4 border border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-[#6B7280]">{project.segments} مقطع</span>
                    <span className="text-[12px] text-[#6B7280]">النوع : {project.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-[10px]">يحكي ان</span>
                    </div>
                    <span className="text-[14px] font-bold text-[#2B2B2B]">{project.name}</span>
                  </div>
                </div>
                <div className="text-right text-[12px] text-[#6B7280]">
                  <p>تاريخ النشر : {project.date}</p>
                  <p>المتحدث : {project.speaker}</p>
                </div>
              </div>
            ))}

            <button className="w-full bg-[#3A5F7D] text-white py-3 rounded-lg hover:bg-[#3A5F7D]/90 transition-colors">
              إضافة مشروع
            </button>
          </div>

          {/* Audio Segments - Left Side */}
          <div className="lg:col-span-2 space-y-4">
            {/* Project Header */}
            <div className="bg-white rounded-[12px] p-4 border border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button className="bg-primary text-white px-4 py-2 rounded-lg text-[14px] hover:bg-primary/90 transition-colors">
                  تعديل المشروع
                </button>
                <button className="bg-[#F97316] text-white px-4 py-2 rounded-lg text-[14px] hover:bg-[#F97316]/90 transition-colors">
                  حذف المشروع
                </button>
              </div>
              <span className="text-[18px] font-bold text-[#2B2B2B]">يحكي أن</span>
            </div>

            {/* Audio Segments List */}
            {audioSegments.map((segment) => (
              <div key={segment.id} className="bg-white rounded-[12px] p-4 border border-gray-200">
                <div className="flex items-start justify-between">
                  {/* Left - Buttons and Time */}
                  <div className="flex flex-col items-start gap-2">
                    <div className="text-[14px] text-[#6B7280]">
                      {segment.currentTime}/{segment.duration}
                    </div>
                    <button className="bg-primary text-white px-4 py-2 rounded-lg text-[12px] hover:bg-primary/90 transition-colors">
                      تعديل المقطع
                    </button>
                    <button className="bg-[#F97316] text-white px-4 py-2 rounded-lg text-[12px] hover:bg-[#F97316]/90 transition-colors">
                      حذف المقطع
                    </button>
                  </div>

                  {/* Right - Content */}
                  <div className="text-right flex-1 mr-4">
                    <h3 className="text-[16px] font-bold text-[#2B2B2B] mb-2">{segment.title}</h3>
                    <p className="text-[14px] text-[#6B7280]">{segment.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Segment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[12px] p-6 w-full max-w-[500px] mx-4">
            <h2 className="text-[20px] font-bold text-primary text-center mb-6">إضافة مقطع</h2>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="عنوان المقطع"
                value={newSegment.title}
                onChange={(e) => setNewSegment({ ...newSegment, title: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
              />
              
              <textarea
                placeholder="تفاصيل المقطع"
                value={newSegment.details}
                onChange={(e) => setNewSegment({ ...newSegment, details: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary resize-none"
              />
              
              <div className="relative">
                <select
                  value={newSegment.project}
                  onChange={(e) => setNewSegment({ ...newSegment, project: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary appearance-none"
                >
                  <option value="">مشروع المقطع</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.name}>{project.name}</option>
                  ))}
                </select>
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              <button className="w-full px-6 py-3 bg-[#3A5F7D] text-white rounded-lg hover:bg-[#3A5F7D]/90 transition-colors">
                ارفع المقطع
              </button>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={handlePublishSegment}
                className="bg-primary text-white px-12 py-3 rounded-lg text-[16px] hover:bg-primary/90 transition-colors"
              >
                نشر المقطع
              </button>
            </div>

            {/* Close button */}
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 left-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2"/>
    <path d="M14 14l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default Podcasts;
