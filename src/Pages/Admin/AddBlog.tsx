import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminAddBlog, adminUpdateBlog, adminGetBlog } from '../../services/blogService';
import { adminGetCategories } from '../../services/categoryService';

const AddBlog: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [blogInfo, setBlogInfo] = useState({
    publisherName: '',
    categoryId: '', 
    year: '',
  });
  const [postTitle, setPostTitle] = useState('');
  const [postDetails, setPostDetails] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const catResponse = await adminGetCategories();
        const cats = catResponse.data || [];
        setCategories(Array.isArray(cats) ? cats : []);

        if (isEditMode) {
          const blogRes = await adminGetBlog(id!);
          const blog = blogRes.data;
          
          setPostTitle(blog.blog_title || '');
          setPostDetails(blog.blog_content || '');

          const matchedCat = cats.find((c: any) => 
            c.category_title === blog.blog_classification || c.category_id === blog.category_id
          );

          setBlogInfo({
  publisherName: blog.blog_author || 'دكتور مصطفى سليم', 
  categoryId: matchedCat ? String(matchedCat.category_id) : String(blog.category_id || ''),
  year: blog.blog_date || '',
});

          if (blog.blog_image_cover) {
            setImagePreview(blog.blog_image_cover);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadInitialData();
  }, [id, isEditMode]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePublish = async () => {
    if (!postTitle.trim()) {
      alert('يجب إدخال عنوان المنشور');
      return;
    }
    
    if (postDetails.trim().length < 20) {
      alert('يجب أن يكون محتوى المنشور 20 حرف على الأقل');
      return;
    }
    
    if (!blogInfo.categoryId) {
      alert('يجب اختيار نوع المنشور');
      return;
    }

    if (!isEditMode && !selectedFile) {
      alert('يجب رفع صورة غلاف المنشور');
      return;
    }

    setLoading(true);
    
    try {
      const formData = new FormData();
      
      formData.append('title', postTitle.trim());
      formData.append('content', postDetails.trim());
      formData.append('publisher', blogInfo.publisherName.trim() || 'دكتور مصطفى سليم');
      formData.append('category_id', blogInfo.categoryId); 
      formData.append('date', blogInfo.year || '2026');
      
      if (selectedFile) {
        formData.append('image_cover', selectedFile);
        formData.append('image_content', selectedFile);
      }

      if (isEditMode) {
        await adminUpdateBlog(id!, formData);
      } else {
        await adminAddBlog(formData);
      }
      
      navigate('/admin/blog');
    } catch (error: any) {
      console.error('Error saving blog:', error);
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const errorMessages = Object.values(errors).flat().join('\n');
        alert(`حدث خطأ في البيانات:\n${errorMessages}`);
      } else {
        const errorMsg = error.response?.data?.message || 'حدث خطأ أثناء الحفظ';
        alert(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 w-full font-expo overflow-y-auto" dir="rtl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-[24px] font-extrabold text-[#3A5F7D]">
          {isEditMode ? 'تعديل مدونة' : 'أضف مدونة'}
        </h1>
        <button onClick={() => navigate('/admin/blog')} className="text-[#3A5F7D] text-xl hover:text-primary transition-colors cursor-pointer hover:underline">
          عودة
        </button>
      </div>

      <div className="space-y-6 max-w-5xl">
        <div className="bg-[#F3F4F6] rounded-[12px] p-6 border border-gray-100 shadow-sm">
          <h2 className="text-[20px] font-bold text-[#3A5F7D] text-right mb-6">معلومات الناشر</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="اسم الناشر"
              value={blogInfo.publisherName}
              onChange={(e) => setBlogInfo({ ...blogInfo, publisherName: e.target.value })}
              className="px-4 py-3 bg-white border border-gray-200 rounded-md text-right outline-none text-black font-bold focus:border-[#3A5F7D]"
            />
            
              <select
              value={blogInfo.categoryId}
              onChange={(e) => setBlogInfo({ ...blogInfo, categoryId: e.target.value })}
              className="px-4 py-3 bg-white border border-gray-200 rounded-md text-right outline-none focus:border-primary cursor-pointer font-bold text-black"
            >
              <option value="">اختر نوع المنشور</option>
              {categories.map((cat) => (
                <option 
                  key={cat.category_id} 
                  value={String(cat.category_id)}
                >
                  {cat.category_title}
                </option>
              ))}
            </select>
            
            <input
              type="text"
              placeholder="العام"
              value={blogInfo.year}
              onChange={(e) => setBlogInfo({ ...blogInfo, year: e.target.value })}
              className="px-4 py-3 bg-white border border-gray-200 rounded-md text-right outline-none text-black font-bold focus:border-[#3A5F7D]"
            />

            <div className="relative">
              <input type="file" id="cover" className="hidden" onChange={handleFileChange} accept="image/*" />
              <label htmlFor="cover" className="block px-4 py-3 bg-[#3A5F7D] text-white rounded-md text-center cursor-pointer hover:bg-[#2d4a62] font-bold transition-all shadow-sm">
                {selectedFile ? selectedFile.name : isEditMode ? 'تغيير الصورة (اختياري)' : 'ارفع صورة غلاف المنشور'}
              </label>
            </div>
          </div>
          {imagePreview && (
            <div className="mt-6 flex justify-center">
              <img src={imagePreview} className="h-40 w-auto rounded-xl shadow-lg border-4 border-white object-cover" alt="preview" />
            </div>
          )}
        </div>

        <div className="bg-[#F3F4F6] rounded-[12px] p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[18px] font-bold text-[#2B2B2B]">محتوي المنشور</h2>
            <div className="flex items-center gap-2">
              <button className="bg-[#007FFF] text-white px-4 py-2 rounded-md text-[14px] font-bold shadow-sm cursor-pointer hover:bg-primary">أضف فيديو</button>
              <button className="bg-[#007FFF] text-white px-4 py-2 rounded-md text-[14px] font-bold shadow-sm cursor-pointer hover:bg-primary">أضف صورة</button>
            </div>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="عنوان المنشور"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md text-right outline-none focus:border-primary font-bold text-black"
            />
            <textarea
              placeholder="تفاصيل المنشور"
              value={postDetails}
              onChange={(e) => setPostDetails(e.target.value)}
              rows={10}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md text-right outline-none focus:border-primary resize-none text-black"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handlePublish}
            disabled={loading}
            className="bg-[#007FFF] cursor-pointer text-white px-20 py-4 rounded-xl font-bold hover:bg-[#2d4a62] transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'جاري المعالجة...' : isEditMode ? 'تحديث المنشور' : 'نشر المنشور'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;