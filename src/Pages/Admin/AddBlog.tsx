import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBlog: React.FC = () => {
  const navigate = useNavigate();
  const [blogInfo, setBlogInfo] = useState({
    publisherName: '',
    postType: '',
    year: '',
  });
  const [postTitle, setPostTitle] = useState('');
  const [postDetails, setPostDetails] = useState('');

  const handlePublish = () => {
    console.log('Publishing blog:', { blogInfo, postTitle, postDetails });
    navigate('/admin/blog');
  };

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <button
          onClick={() => navigate('/admin/blog')}
          className="text-[#2B2B2B] hover:text-primary transition-colors"
        >
          عودة
        </button>
        <h1 className="text-[24px] font-bold text-textPrimary">أضف مدونة</h1>
      </div>

      <div className="space-y-6">
        {/* Publisher Info Section */}
        <div className="bg-[#F3F4F6] rounded-[12px] p-6">
          <h2 className="text-[18px] font-bold text-[#2B2B2B] text-center mb-6">معلومات الناشر</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="اسم الناشر"
              value={blogInfo.publisherName}
              onChange={(e) => setBlogInfo({ ...blogInfo, publisherName: e.target.value })}
              className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
            />
            <input
              type="text"
              placeholder="نوع المنشور"
              value={blogInfo.postType}
              onChange={(e) => setBlogInfo({ ...blogInfo, postType: e.target.value })}
              className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
            />
            <input
              type="text"
              placeholder="العام"
              value={blogInfo.year}
              onChange={(e) => setBlogInfo({ ...blogInfo, year: e.target.value })}
              className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
            />
            <button className="px-4 py-3 bg-[#3A5F7D] text-white rounded-lg hover:bg-[#3A5F7D]/90 transition-colors">
              ارفع صورة غلاف المنشور
            </button>
          </div>
        </div>

        {/* Post Content Section */}
        <div className="bg-[#F3F4F6] rounded-[12px] p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <button className="bg-[#3A5F7D] text-white px-4 py-2 rounded-lg text-[14px] hover:bg-[#3A5F7D]/90 transition-colors">
                أضف فيديو
              </button>
              <button className="bg-[#3A5F7D] text-white px-4 py-2 rounded-lg text-[14px] hover:bg-[#3A5F7D]/90 transition-colors">
                أضف صورة
              </button>
            </div>
            <h2 className="text-[18px] font-bold text-[#2B2B2B]">محتوي المنشور</h2>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="عنوان المنشور"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
            />
            <textarea
              placeholder="تفاصيل المنشور"
              value={postDetails}
              onChange={(e) => setPostDetails(e.target.value)}
              rows={12}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary resize-none"
            />
          </div>
        </div>

        {/* Publish Button */}
        <div className="flex justify-center">
          <button
            onClick={handlePublish}
            className="bg-primary text-white px-12 py-3 rounded-lg text-[16px] hover:bg-primary/90 transition-colors"
          >
            نشر المنشور
          </button>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
